import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "atsas-secret-key-2010";

// DIRECT CREDENTIALS (As requested)
const USER_EMAIL = 'sales@atsasci.com';
const USER_PASS = '$Almantahir17';
const SMTP_HOST = 'smtp.office365.com';
const SMTP_PORT = 587;

export async function POST(req) {
  try {
    // 1. Authenticate
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });
    }

    // 2. Parse request
    const { to, subject, body, customerName } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // 3. Create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false, // TLS
      auth: {
        user: USER_EMAIL,
        pass: USER_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    // 4. Design Email Content
    const BRAND_COLOR = '#C6A664';
    const DARK_GREY = '#1C1C1C';
    const LOGO_URL = 'https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/jwt/41q/xm8/WhatsApp_Image_2026-03-02_at_3.00.47_AM-removebg-preview.png';

    const htmlContent = `
      <div style="background-color: #f4f4f4; padding: 20px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <tr>
            <td align="center" style="padding: 40px 0 20px 0; background-color: ${DARK_GREY};">
              <img src="${LOGO_URL}" alt="ATSAS Logo" width="150" style="display: block;" />
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h1 style="margin: 0 0 20px 0; font-size: 24px; color: ${DARK_GREY};">Hello ${customerName || 'there'},</h1>
              <div style="font-size: 16px; color: #444; line-height: 1.6; white-space: pre-wrap;">
${body}
              </div>
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="margin: 0; color: #888; font-size: 14px;">Best Regards,</p>
                <p style="margin: 5px 0 0 0; color: ${BRAND_COLOR}; font-weight: bold; font-size: 16px;">ATSAS Sales Team</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; background-color: #fafafa; border-top: 1px solid #eeeeee; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #999999;">
                © ${new Date().getFullYear()} ATSAS Ltd. All rights reserved.
              </p>
              <div style="margin-top: 10px;">
                <a href="https://atsasci.com" style="color: ${BRAND_COLOR}; text-decoration: none; font-size: 12px;">Website</a> | 
                <a href="https://atsasci.com/contact" style="color: ${BRAND_COLOR}; text-decoration: none; font-size: 12px;">Support</a>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;

    // 5. Send Mail
    await transporter.sendMail({
      from: `"ATSAS Sales" <${USER_EMAIL}>`,
      to,
      replyTo: USER_EMAIL,
      subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    console.error("REPLY ERROR:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to send reply", 
      details: error.message 
    }, { status: 500 });
  }
}
