import nodemailer from 'nodemailer';

// In-memory storage for subscribers (replace with a database in production)
let subscribers = [];
let isSending = false;

export async function POST(req) {
  if (req.method === 'POST') {
    const origin = req.headers.get('origin');
    if (origin === 'https://stephen-online-store-my-app.vercel.app') {
      // Basic CORS check (optional in Next.js)
    }
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    // Add subscriber if not already subscribed
    if (!subscribers.includes(email)) {
      subscribers.push(email);
    }

 const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   secure: false, // Use false for 587
   auth: {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASS,
   },
   tls: {
     // This helps if your network is being extra strict
     rejectUnauthorized: false 
   }
 });

    const mailOptions = {
      from: 'Steve Obizz Store Team <' + process.env.EMAIL_USER + '>',
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
                <img src="https://images.unsplash.com/photo-1677530410699-f692c94cf806?w=600&amp;auto=format&amp;fit=crop&amp;q=60&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RhdGlvbmVyeSUyMHVpJTIwaW1hZ2VzJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D">
              </div>
              <p style="font-size: 16px; line-height: 1.6;">
                As a valued member, you can look forward to receiving carefully curated content, exclusive offers, and first access to our latest product launches—directly in your inbox. Our goal is to enrich your experience, bringing you not only premium stationery but also creative inspiration that elevates your day-to-day.
                <div>
                  <img src="https://media.istockphoto.com/id/2167050759/photo/matching-colors-of-pen-scalpel-screwdriver-pencil-sharpener-and-3m-post-it-sticky-notes-a.jpg?s=612x612&w=0&k=20&c=z-FfG2r56YsiFLxDuWJYPgXbEWhYek7-qWUL5A6VLF8=">
                </div>
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                Your welcome email has been sent to ${email}.
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                With each communication, we aim to bring you closer to products that embody the highest standards of quality, craftsmanship, and innovation. Whether you are seeking practical solutions, elegant designs, or unique gifts, we’re committed to ensuring that your time with us is nothing short of exceptional.
              </p>
              <div style="margin-top: 20px; text-align: center;">
                <a href="https://stephen-online-store-my-app.vercel.app" style="display: inline-block; background-color: #4b70f5; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Shop Now</a>
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

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent: ', info.response);

    // Start sending follow-up emails if not already running
    if (!isSending) {
      isSending = true;
      setInterval(async () => {
        for (const subscriber of subscribers) {
          const followUpMailOptions = {
            from: 'Steve Obizz Store Team <' + process.env.EMAIL_USER + '>',
            to: subscriber,
            subject: 'Exclusive Update from Steve-Obizz-Store!',
            html: `
              <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px; margin: 0;">
                  <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #4b70f5; text-align: center;">Exclusive Update from Steve-Obizz-Store!</h2>
                    <p style="font-size: 16px; line-height: 1.6;">Dear Valued Customer,</p>
                    <p style="font-size: 16px; line-height: 1.6;">
                      We hope you're enjoying your journey with Steve-Obizz-Store! As a token of our appreciation, here’s an exclusive update sent on ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}.
                    </p>
                    <div style="margin-top: 20px; text-align: center;">
                      <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80" alt="Premium Stationery 1" style="width: 100%; max-width: 500px; border-radius: 10px; margin-bottom: 15px;">
                      <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80" alt="Premium Stationery 2" style="width: 100%; max-width: 500px; border-radius: 10px; margin-bottom: 15px;">
                      <img src="https://images.unsplash.com/photo-1506544777-64cfbe1142ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80" alt="Premium Stationery 3" style="width: 100%; max-width: 500px; border-radius: 10px;">
                    </div>
                    <p style="font-size: 16px; line-height: 1.6;">
                      Discover our latest artisanal paper collection and enjoy special offers crafted just for you. Stay inspired!
                    </p>
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
          try {
            await transporter.sendMail(followUpMailOptions);
            console.log(`Follow-up email sent to ${subscriber}`);
          } catch (error) {
            console.error(`Error sending follow-up to ${subscriber}:`, error);
          }
        }
      }, 7 * 24 * 60 * 60 * 1000); 
    }

    return new Response(JSON.stringify({ message: 'Subscription successful! Welcome email sent.', email }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Error sending email' }), { status: 500 });
  }
}