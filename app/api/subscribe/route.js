import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import db from "@/lib/db"; 

export async function POST(request) {
  // 1. CORS Check (Optional but good for security)
  const origin = request.headers.get('origin');
  if (origin && !origin.includes('steveobizzstore.vercel.app') && !origin.includes('localhost')) {
    // You can uncomment this in production to be strict
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 2. Database: Save to Turso
    // We try to insert. If it fails because the email exists, we just catch it and move on.
    try {
      await db.execute({
        sql: "INSERT INTO subscribers (email) VALUES (?)",
        args: [email]
      });
      console.log(`New subscriber added to DB: ${email}`);
    } catch (dbError) {
      // If error message contains "UNIQUE" or similar, it means user already exists.
      // We proceed anyway so they get the Welcome email again (or you can return here).
      console.log(`Subscriber likely already exists or DB error: ${dbError.message}`);
    }

    // 3. Nodemailer: Configure Transporter (Port 465 for Stability)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Email Template: Welcome Message
    const mailOptions = {
      from: `"Steve Obizz Store Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Steve-Obizz-Store! ✨',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px; margin: 0;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
              <h2 style="text-align: center; color: #4b70f5;">Welcome to Steve-Obizz-Store!</h2>
              <p style="font-size: 16px; line-height: 1.6;">Dear New Customer,</p>
              <p style="font-size: 16px; line-height: 1.6;">
                We are genuinely delighted to welcome you to the Steve-Obizz-Store. Your subscription marks the beginning of an exciting journey, and we couldn't be more thrilled to have you join us.
              </p>
              <div style="margin-top: 20px; text-align: center;">
                <img src="https://images.unsplash.com/photo-1677530410699-f692c94cf806?w=600" style="max-width: 100%; border-radius: 10px;" alt="Stationery Collection">
              </div>
              <p style="font-size: 16px; line-height: 1.6;">
                As a valued member, you can look forward to receiving carefully curated content, exclusive offers, and first access to our latest product launches—directly in your inbox.
              </p>
              <div style="margin-top: 20px; text-align: center;">
                 <img src="https://media.istockphoto.com/id/2167050759/photo/matching-colors-of-pen-scalpel-screwdriver-pencil-sharpener-and-3m-post-it-sticky-notes-a.jpg?s=612x612&w=0&k=20&c=z-FfG2r56YsiFLxDuWJYPgXbEWhYek7-qWUL5A6VLF8=" style="max-width: 100%; border-radius: 10px;" alt="Tools">
              </div>
              <p style="font-size: 16px; line-height: 1.6;">
                Your welcome email has been sent to ${email}.
              </p>
              <div style="margin-top: 20px; text-align: center;">
                <a href="https://steveobizzstore.vercel.app" style="display: inline-block; background-color: #4b70f5; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Shop Now</a>
              </div>
              <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #666;">
                <p>Warm regards,<br>The Steve-Obizz-Store Team</p>
                <p>No 69 Obafemi Awolowo Way, Ikeja, Lagos, Nigeria</p>
                <p>+234 803 304 8352</p>
              </footer>
            </div>
          </body>
        </html>
      `,
    };

    // 5. Send Email
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Subscription successful! Welcome email sent.' 
    }, { status: 200 });

  } catch (error) {
    console.error('Subscribe Route Error:', error);
    return NextResponse.json({ error: 'Error processing subscription' }, { status: 500 });
  }
}