// // src/app/api/contact/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { name, email, phone, company, subject, message } = body;

//     // Validate required fields
//     if (!name || !email || !phone || !subject || !message) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Create transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     // Email to store owner
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: 'stephenokwu@yahoo.com',
//       subject: `New Contact Form: ${subject}`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <style>
//               body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//               .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//               .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
//               .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
//               .field { margin-bottom: 15px; }
//               .label { font-weight: bold; color: #667eea; }
//               .value { margin-top: 5px; padding: 10px; background: white; border-radius: 5px; border-left: 4px solid #667eea; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <div class="header">
//                 <h1>New Contact Form Submission</h1>
//                 <p>Steve O'Bizz Store</p>
//               </div>
//               <div class="content">
//                 <div class="field">
//                   <div class="label">Subject:</div>
//                   <div class="value">${subject}</div>
//                 </div>
//                 <div class="field">
//                   <div class="label">From:</div>
//                   <div class="value">${name} (${email})</div>
//                 </div>
//                 <div class="field">
//                   <div class="label">Phone:</div>
//                   <div class="value">${phone}</div>
//                 </div>
//                 ${company ? `
//                 <div class="field">
//                   <div class="label">Company:</div>
//                   <div class="value">${company}</div>
//                 </div>
//                 ` : ''}
//                 <div class="field">
//                   <div class="label">Message:</div>
//                   <div class="value">${message.replace(/\n/g, '<br>')}</div>
//                 </div>
//                 <div class="field">
//                   <div class="label">Received:</div>
//                   <div class="value">${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}</div>
//                 </div>
//               </div>
//             </div>
//           </body>
//         </html>
//       `,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     // Optional: Send auto-reply to customer
//     const autoReplyOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Thank you for contacting Steve O\'Bizz Store',
//       html: `
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <style>
//               body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//               .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//               .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
//               .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
//               .contact-info { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #667eea; }
//               .highlight { color: #667eea; font-weight: bold; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <div class="header">
//                 <h1>Thank You for Contacting Us!</h1>
//               </div>
//               <div class="content">
//                 <p>Dear <span class="highlight">${name}</span>,</p>
                
//                 <p>Thank you for reaching out to Steve O'Bizz Store. We have received your message and one of our representatives will get back to you within 24 hours.</p>
                
//                 <div class="contact-info">
//                   <h3>Your Message Details:</h3>
//                   <p><strong>Subject:</strong> ${subject}</p>
//                   <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}</p>
//                 </div>
                
//                 <p>In the meantime, you can:</p>
//                 <ul>
//                   <li>Browse our products at <a href="https://steveobizzstore.com">steveobizzstore.com</a></li>
//                   <li>Call us directly at <strong>+234 803 304 8352</strong></li>
//                   <li>Visit our store at No. 69 Obafemi Awolowo Way, Ikeja, Lagos</li>
//                 </ul>
                
//                 <p>Thank you for choosing Steve O'Bizz Store!</p>
                
//                 <p>Best regards,<br>
//                 <strong>The Steve O'Bizz Store Team</strong></p>
//               </div>
//             </div>
//           </body>
//         </html>
//       `,
//     };

//     await transporter.sendMail(autoReplyOptions);

//     // Optional: Save to database (if using Sanity)
//     // await client.create({
//     //   _type: 'contact',
//     //   name,
//     //   email,
//     //   phone,
//     //   company,
//     //   subject,
//     //   message,
//     //   status: 'new',
//     // });

//     return NextResponse.json(
//       { message: 'Message sent successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Contact form error:', error);
//     return NextResponse.json(
//       { error: 'Failed to send message' },
//       { status: 500 }
//     );
//   }
// }