import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import twilio from "twilio";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // 1. Validate Input
    if (!email || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Twilio WhatsApp Configuration
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    
    // Sends WhatsApp to the owner (+234 8079379510)
    const whatsappPromise = client.messages.create({
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`, // Usually 'whatsapp:+14155238886' for sandbox
      to: `whatsapp:+2348079379510`,
      body: `🚀 New Web Inquiry\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`
    });

    // 3. Nodemailer Configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // chidiokwu795@gmail.com
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
    });

    // Send confirmation email TO the customer
    const mailOptions = {
      from: `"Steve O'Bizz Store" <${process.env.EMAIL_USER}>`,
      to: email, // The customer's email from the form
      subject: `We received your inquiry, ${name}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #1e3a8a; padding: 20px; border-radius: 10px;">
          <h2 style="color: #1e3a8a;">Hello ${name},</h2>
          <p>Thank you for reaching out to <strong>Steve O'Bizz Store</strong>. We have received your message and our team will get back to you shortly.</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Your Message:</strong></p>
            <p style="font-style: italic; color: #4b5563;">"${message}"</p>
          </div>
          <p>If you need immediate assistance, feel free to call us at +234 803 304 8352.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9ca3af;">Steve O'Bizz Store - No 69 Obafemi Awolowo Way, Ikeja Lagos.</p>
        </div>
      `,
    };

    // Execute both tasks
    await Promise.all([whatsappPromise, transporter.sendMail(mailOptions)]);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Deployment Error:", error.message);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}