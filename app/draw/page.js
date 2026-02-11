"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Square, Circle, Eraser, Undo, Redo, Trash2, Download, Palette } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function DrawPage() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#1c1917");
  const [lineWidth, setLineWidth] = useState(3);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  const colors = [
    "#1c1917", "#8b5a2b", "#c6a664", "#dc2626", "#2563eb", "#16a34a", "#ffffff"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Draw jacket outline
    drawJacketOutline(ctx, rect.width, rect.height);
    saveToHistory();
  }, []);

  const drawJacketOutline = (ctx, width, height) => {
    ctx.strokeStyle = "#d6d3d1";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    // Simple jacket silhouette
    ctx.beginPath();
    const centerX = width / 2;
    const topY = height * 0.15;
    const bottomY = height * 0.85;
    const shoulderWidth = width * 0.6;
    const waistWidth = width * 0.5;

    // Shoulders
    ctx.moveTo(centerX - shoulderWidth / 2, topY);
    ctx.lineTo(centerX + shoulderWidth / 2, topY);
    
    // Right side
    ctx.lineTo(centerX + waistWidth / 2, bottomY);
    
    // Bottom
    ctx.lineTo(centerX - waistWidth / 2, bottomY);
    
    // Left side
    ctx.lineTo(centerX - shoulderWidth / 2, topY);
    
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(canvas.toDataURL());
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left || e.touches?.[0]?.clientX - rect.left;
    const y = e.clientY - rect.top || e.touches?.[0]?.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left || e.touches?.[0]?.clientX - rect.left;
    const y = e.clientY - rect.top || e.touches?.[0]?.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = lineWidth;

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const undo = () => {
    if (historyStep > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = history[historyStep - 1];
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      setHistoryStep(historyStep - 1);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = history[historyStep + 1];
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      setHistoryStep(historyStep + 1);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawJacketOutline(ctx, rect.width, rect.height);
    saveToHistory();
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `jacket-design-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-dark-grey mb-4">
              Sketch Your <span className="text-gradient-gold font-normal">Vision</span>
            </h1>
            <p className="text-lg text-mid-grey max-w-2xl mx-auto">
              Draw your jacket design idea in under 2 minutes. No design skills required.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-luxury p-6">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-beige">
                {/* Tools */}
                <div className="flex items-center space-x-2">
                  <ToolButton
                    icon={<Pencil className="w-4 h-4" />}
                    active={tool === "pencil"}
                    onClick={() => setTool("pencil")}
                    label="Pencil"
                  />
                  <ToolButton
                    icon={<Eraser className="w-4 h-4" />}
                    active={tool === "eraser"}
                    onClick={() => setTool("eraser")}
                    label="Eraser"
                  />
                  <div className="w-px h-8 bg-beige mx-2" />
                  <ToolButton
                    icon={<Undo className="w-4 h-4" />}
                    onClick={undo}
                    disabled={historyStep <= 0}
                    label="Undo"
                  />
                  <ToolButton
                    icon={<Redo className="w-4 h-4" />}
                    onClick={redo}
                    disabled={historyStep >= history.length - 1}
                    label="Redo"
                  />
                  <ToolButton
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={clearCanvas}
                    label="Clear"
                  />
                </div>

                {/* Colors */}
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-mid-grey" />
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all",
                        color === c ? "border-gold scale-110" : "border-light-grey hover:scale-105"
                      )}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>

                {/* Line Width */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-mid-grey">Size:</span>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(Number(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-sm font-medium text-dark-grey w-8">{lineWidth}px</span>
                </div>
              </div>

              {/* Canvas */}
              <div className="relative bg-cream rounded-lg overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full cursor-crosshair touch-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-beige">
                <p className="text-sm text-mid-grey">
                  Your design will be attached to your order
                </p>
                <div className="flex space-x-4">
                  <Button variant="secondary" onClick={downloadImage}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="primary">
                    Save & Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ToolButton({ icon, active, onClick, disabled, label }) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "p-2 rounded-lg transition-all",
        active && "bg-gold text-white",
        !active && !disabled && "bg-cream text-dark-grey hover:bg-beige",
        disabled && "opacity-30 cursor-not-allowed"
      )}
      title={label}
    >
      {icon}
    </motion.button>
  );
}
