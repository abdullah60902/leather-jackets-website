const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');
const path = require('path');
const pdfParse = require('pdf-parse');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const app = express();
const PORT = 4000;

// Server IP for Docker containers
const SERVER_IP = '188.166.241.174';
const REMBG_URL = `http://${SERVER_IP}:5000/api/remove`;
const GOTENBERG_URL = `http://${SERVER_IP}:3000/forms/libreoffice/convert`;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Multer config - store files in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// ==========================================
// ENDPOINT 1: Remove Background from Image
// ==========================================
app.post('/remove-bg', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    console.log(`[BG Remover] Processing: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)}KB)`);

    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    const response = await axios.post(REMBG_URL, formData, {
      headers: formData.getHeaders(),
      responseType: 'arraybuffer',
      timeout: 120000 // 2 min timeout for large images
    });

    const outputName = `nobg_${path.parse(req.file.originalname).name}.png`;

    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${outputName}"`,
      'Content-Length': response.data.length
    });

    console.log(`[BG Remover] Success: ${outputName}`);
    res.send(Buffer.from(response.data));

  } catch (error) {
    console.error('[BG Remover] Error:', error.message);
    res.status(500).json({
      error: 'Background removal failed',
      details: error.response?.data?.toString() || error.message
    });
  }
});

// ==========================================
// ENDPOINT 2: Word to PDF (via Gotenberg)
// ==========================================
app.post('/word-to-pdf', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No document file uploaded' });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    if (!['.doc', '.docx', '.odt', '.rtf'].includes(ext)) {
      return res.status(400).json({ error: 'Please upload a Word document (.doc, .docx, .odt, .rtf)' });
    }

    console.log(`[Word→PDF] Processing: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)}KB)`);

    const formData = new FormData();
    formData.append('files', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    const response = await axios.post(GOTENBERG_URL, formData, {
      headers: formData.getHeaders(),
      responseType: 'arraybuffer',
      timeout: 120000
    });

    const outputName = `${path.parse(req.file.originalname).name}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${outputName}"`,
      'Content-Length': response.data.length
    });

    console.log(`[Word→PDF] Success: ${outputName}`);
    res.send(Buffer.from(response.data));

  } catch (error) {
    console.error('[Word→PDF] Error:', error.message);
    res.status(500).json({
      error: 'Word to PDF conversion failed',
      details: error.response?.data?.toString() || error.message
    });
  }
});

// ==========================================
// ENDPOINT 3: PDF to Word
// ==========================================
app.post('/pdf-to-word', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    if (ext !== '.pdf') {
      return res.status(400).json({ error: 'Please upload a PDF file (.pdf)' });
    }

    console.log(`[PDF→Word] Processing: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)}KB)`);

    // Parse PDF text
    const pdfData = await pdfParse(req.file.buffer);
    const pages = pdfData.text.split(/\f/); // Split by form feed (page breaks)

    // Build Word document from extracted text
    const docSections = [];
    
    pages.forEach((pageText, index) => {
      const lines = pageText.split('\n').filter(line => line.trim());
      const paragraphs = lines.map((line, lineIndex) => {
        // First line of first page = title
        if (index === 0 && lineIndex === 0) {
          return new Paragraph({
            children: [new TextRun({ text: line.trim(), bold: true, size: 32, font: 'Arial' })],
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 }
          });
        }
        return new Paragraph({
          children: [new TextRun({ text: line.trim(), size: 24, font: 'Arial' })],
          spacing: { after: 100 }
        });
      });

      docSections.push({
        properties: index > 0 ? { page: { pageBreakBefore: true } } : {},
        children: paragraphs
      });
    });

    const doc = new Document({
      sections: docSections.length > 0 ? docSections : [{
        children: [new Paragraph({ children: [new TextRun({ text: 'No text content found in PDF', size: 24 })] })]
      }]
    });

    const buffer = await Packer.toBuffer(doc);
    const outputName = `${path.parse(req.file.originalname).name}.docx`;

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${outputName}"`,
      'Content-Length': buffer.length
    });

    console.log(`[PDF→Word] Success: ${outputName} (${pdfData.numpages} pages extracted)`);
    res.send(buffer);

  } catch (error) {
    console.error('[PDF→Word] Error:', error.message);
    res.status(500).json({
      error: 'PDF to Word conversion failed',
      details: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', tools: ['remove-bg', 'word-to-pdf', 'pdf-to-word'] });
});

app.listen(PORT, () => {
  console.log(`\n🚀 PDF Toolkit Server running at http://localhost:${PORT}`);
  console.log(`📡 RemBG endpoint: ${REMBG_URL}`);
  console.log(`📡 Gotenberg endpoint: ${GOTENBERG_URL}\n`);
});
