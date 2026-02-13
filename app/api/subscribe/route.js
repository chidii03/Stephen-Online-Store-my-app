import nodemailer from 'nodemailer';
import db from '@/app/lib/db';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // --- 1. Save subscriber to Turso database ---
    // Assumes a table "subscribers" exists with columns:
    // email TEXT PRIMARY KEY, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    await db.execute({
      sql: 'INSERT OR IGNORE INTO subscribers (email) VALUES (?)',
      args: [email],
    });

    // --- 2. Send welcome email ---
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Steve Obizz Store Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Steve-Obizz-Store!',
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
                <img src="https://images.unsplash.com/photo-1677530410699-f692c94cf806?w=600&amp;auto=format&amp;fit=crop&amp;q=60&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RhdGlvbmVyeSUyMHVpJTIwaW1hZ2VzJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D" alt="Premium stationery" style="width: 100%; max-width: 500px; border-radius: 10px;">
              </div>
              <p style="font-size: 16px; line-height: 1.6;">
                As a valued member, you can look forward to receiving carefully curated content, exclusive offers, and first access to our latest product launches—directly in your inbox. Our goal is to enrich your experience, bringing you not only premium stationery but also creative inspiration that elevates your day-to-day.
              </p>
              <div style="margin-top: 20px; text-align: center;">
                <img src="https://media.istockphoto.com/id/2167050759/photo/matching-colors-of-pen-scalpel-screwdriver-pencil-sharpener-and-3m-post-it-sticky-notes-a.jpg?s=612x612&w=0&k=20&c=z-FfG2r56YsiFLxDuWJYPgXbEWhYek7-qWUL5A6VLF8=" alt="Office supplies" style="width: 100%; max-width: 500px; border-radius: 10px;">
              </div>
              <p style="font-size: 16px; line-height: 1.6;">
                Your welcome email has been sent to ${email}.
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                With each communication, we aim to bring you closer to products that embody the highest standards of quality, craftsmanship, and innovation. Whether you are seeking practical solutions, elegant designs, or unique gifts, we’re committed to ensuring that your time with us is nothing short of exceptional.
              </p>
              <div style="margin-top: 20px; text-align: center;">
                <a href="https://steveobizzstore.vercel.app" style="display: inline-block; background-color: #4b70f5; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Shop Now</a>
              </div>
              <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #666;">
                <p>Warm regards,<br>The Steve-Obizz-Store Team</p>
                <p>No 69 Obafemi Awolowo Way, Ikeja, Lagos, Nigeria</p>
                <p>+234 803 304 8352<br>${process.env.EMAIL_USER}</p>
              </footer>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);

    return new Response(
      JSON.stringify({
        message: 'Subscription successful! Welcome email sent.',
        email,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('❌ Subscribe API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process subscription' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}