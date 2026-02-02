import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import twilio from "twilio";
import db from "@/lib/db"; 

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // 1. Validate Input
    if (!email || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Save to Turso Database (Backup record)
    try {
      await db.execute({
        sql: "INSERT INTO contacts (name, email, phone, message, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)",
        args: [name, email, phone || "", message]
      });
    } catch (dbError) {
      console.error("DB Save Failed (Non-fatal):", dbError);
      // We continue executing because we still want to send the email/whatsapp
    }

    // 3. Twilio WhatsApp Logic
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    
    // Fix: Handle the 'whatsapp:' prefix logic
    const fromNumber = process.env.TWILIO_PHONE_NUMBER.startsWith('whatsapp:') 
      ? process.env.TWILIO_PHONE_NUMBER 
      : `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`;

    const whatsappPromise = client.messages.create({
      from: fromNumber,
      to: `whatsapp:+2348079379510`,
      body: `🚀 New Web Inquiry\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`
    });

    // 4. Nodemailer Logic (Using Port 465 for stability)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Steve O'Bizz Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your inquiry, ${name}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #1e3a8a; padding: 20px; border-radius: 10px;">
          <h2 style="color: #1e3a8a;">Hello ${name},</h2>
          <p>Thank you for reaching out to <strong>Steve O'Bizz Store</strong>.</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p style="font-style: italic; color: #4b5563;">"${message}"</p>
          </div>
          <p>If you need immediate assistance, call us at +234 803 304 8352.</p>
        </div>
      `,
    };

    // Execute both tasks simultaneously
    await Promise.all([whatsappPromise, transporter.sendMail(mailOptions)]);

    return NextResponse.json({ message: "Success" }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}