import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { saveSubmission } from '@/lib/github-db';

export async function POST(req) {
  try {
    const { firstName, lastName, email, phone, company, quantity, categories, message } = await req.json();

    // HARDCODED CREDENTIALS (As requested to resolve environment variable issues)
    // DIRECT CREDENTIALS (As requested)
    const USER_EMAIL = 'sales@atsasci.com';
    const USER_PASS = '$Almantahir17';
    const SMTP_HOST = 'smtp.office365.com';
    const SMTP_PORT = 587;

    // 1. Create ONE transporter instance
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false, // TLS (Port 587)
      auth: {
        user: USER_EMAIL,
        pass: USER_PASS,
      },
      tls: {
        ciphers: 'SSLv3', // Required for Office 365
        rejectUnauthorized: false
      }
    });

    // --- Shared Email Styles & Logo ---
    const BRAND_COLOR = '#C6A664'; // Gold
    const DARK_GREY = '#1C1C1C';
    const LOGO_URL = 'https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/jwt/41q/xm8/WhatsApp_Image_2026-03-02_at_3.00.47_AM-removebg-preview.png';

    // Common Email Wrapper (Header + Footer)
    const emailHeader = `
      <div style="background-color: #f4f4f4; padding: 20px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <tr>
            <td align="center" style="padding: 40px 0 20px 0; background-color: ${DARK_GREY};">
              <img src="${LOGO_URL}" alt="ATSAS Logo" width="150" style="display: block; filter: brightness(100%);" />
            </td>
          </tr>
    `;

    const emailFooter = (customer = false) => `
          <tr>
            <td style="padding: 30px; background-color: #fafafa; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; font-size: 14px; color: #666666; text-align: center;">
                ${customer ? 'We appreciate your business!' : 'Contact Customer Support for any queries.'}
              </p>
              ${customer ? `
              <div style="text-align: center; margin-top: 15px; font-size: 12px;">
                <a href="https://atsasci.com/privacy" style="color: ${BRAND_COLOR}; text-decoration: none;">Privacy Policy</a> | 
                <a href="https://atsasci.com/contact" style="color: ${BRAND_COLOR}; text-decoration: none;">Customer Support</a>
              </div>
              ` : ''}
              <p style="margin-top: 20px; font-size: 12px; color: #999999; text-align: center;">
                © ${new Date().getFullYear()} ATSAS Ltd. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </div>
    `;

    const inquiryDetails = `
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 25px; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333; width: 30%;">Customer Name:</td>
          <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; color: #666;">${firstName} ${lastName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Email:</td>
          <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; color: #666;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Phone:</td>
          <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; color: #666;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Quantity:</td>
          <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; color: #666;">${quantity} items</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Company:</td>
          <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; color: #666;">${company || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 10px solid transparent; font-weight: bold; color: #333;">Categories:</td>
          <td style="padding: 10px; border-bottom: 10px solid transparent; color: #666;">
            ${categories && categories.length > 0 
              ? categories.map(c => `<span style="display: inline-block; background: #f0f0f0; padding: 2px 8px; border-radius: 4px; margin: 2px; font-size: 12px;">${c}</span>`).join('') 
              : 'None selected'}
          </td>
        </tr>
      </table>
      <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; border-left: 4px solid ${BRAND_COLOR};">
        <p style="margin: 0 0 10px 0; font-weight: bold; color: #333;">Message:</p>
        <p style="margin: 0; color: #666; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
      </div>
    `;

    // 1) Admin Notification Email (Notification to sales)
    const adminMailOptions = {
      from: `"ATSAS Order Alert" <${USER_EMAIL}>`,
      to: USER_EMAIL,
      replyTo: email,
      subject: "New Order Inquiry Received!",
      html: `
        ${emailHeader}
        <tr>
          <td style="padding: 40px 30px;">
            <h1 style="margin: 0 0 20px 0; font-size: 24px; color: ${DARK_GREY}; text-align: center;">New Order Received!</h1>
            <p style="font-size: 16px; color: #666; line-height: 1.5;">Hello Admin,</p>
            <p style="font-size: 16px; color: #666; line-height: 1.5;">A new order inquiry has been placed on your website. Here are the details:</p>
            ${inquiryDetails}
          </td>
        </tr>
        ${emailFooter()}
      `,
    };

    // 2) User Confirmation Email (Receipt to user)
    const userMailOptions = {
      from: `"ATSAS Sales" <${USER_EMAIL}>`,
      to: email,
      subject: "Your Order Inquiry Has Been Received!",
      html: `
        ${emailHeader}
        <tr>
          <td style="padding: 40px 30px;">
            <h1 style="margin: 0 0 20px 0; font-size: 24px; color: ${DARK_GREY}; text-align: center;">Order Received!</h1>
            <p style="font-size: 16px; color: #666; line-height: 1.5;">Hello ${firstName},</p>
            <p style="font-size: 16px; color: #666; line-height: 1.5;">Thank you for your order inquiry! We have received it and our sales team will process it and reach out within 24 hours.</p>
            
            <div style="margin: 30px 0; padding: 20px; border: 1px dashed ${BRAND_COLOR}; border-radius: 8px; text-align: center;">
              <p style="margin: 0; font-weight: bold; color: ${BRAND_COLOR}; text-transform: uppercase; letter-spacing: 1px;">Inquiry Summary</p>
            </div>

            ${inquiryDetails}
            
            <p style="margin-top: 30px; font-size: 16px; color: #666; line-height: 1.5;">If you have any immediate questions, feel free to reply to this email or call us at <strong>07375792237</strong>.</p>
          </td>
        </tr>
        ${emailFooter(true)}
      `,
    };

    // 4. Send both emails
    console.log('Sending professional HTML emails...');
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);
    console.log('Emails sent successfully!');

    // 5. Save to GitHub Database
    await saveSubmission({ firstName, lastName, email, phone, company, quantity, categories: categories || [], message });

    return NextResponse.json({ 
      success: true, 
      message: 'Both emails sent successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error('SERVER ERROR:', error);
    
    let errorMessage = error.message;
    // Check for common Office 365 issues
    if (errorMessage.includes('SmtpClientAuthentication is disabled')) {
      errorMessage = 'SMTP Authentication is disabled for your Office 365 account. Please enable it in the Microsoft Admin Center.';
    } else if (errorMessage.includes('Authentication unsuccessful')) {
      errorMessage = 'Invalid password or Username. If you have MFA (Two-Factor) ON, you MUST use an APP PASSWORD.';
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send message', 
      details: errorMessage 
    }, { status: 500 });
  }
}
