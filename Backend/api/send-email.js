// import nodemailer from "nodemailer";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ success: false, message: "Method Not Allowed" });
//   }

//   const { name, email, phone, zip, year, make, model, part, stock, message } = req.body || {};

//   try {
//     // 🧩 Check envs
//     if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.SMTP_HOST) {
//       throw new Error("Missing email configuration in environment variables");
//     }

//     // ✅ Create transporter
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: 465, // IONOS SSL port
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // ✅ Verify connection
//     await transporter.verify();

//     // ✅ Send email
//     await transporter.sendMail({
//       from: `"Nexxa Auto" <${process.env.EMAIL_USER}>`,
//       to: "noreply@nexxaauto.com",
//       bcc: "ksaybas3@gmail.com",
//       replyTo: email,
//       subject: "New Lead from Nexxa Auto",
//       html: `
//         <h2>🚗 New Lead</h2>
//         <p><b>Name:</b> ${name || "N/A"}</p>
//         <p><b>Email:</b> ${email || "N/A"}</p>
//         <p><b>Phone:</b> ${phone || "N/A"}</p>
//         <p><b>ZIP:</b> ${zip || "N/A"}</p>
//         <hr/>
//         <p><b>Year:</b> ${year || "N/A"}</p>
//         <p><b>Make:</b> ${make || "N/A"}</p>
//         <p><b>Model:</b> ${model || "N/A"}</p>
//         <p><b>Part:</b> ${part || "N/A"}</p>
//         <p><b>Stock:</b> ${stock || "N/A"}</p>
//         <p><b>Message:</b> ${message || "No message provided"}</p>
//       `,
//     });

//     res.status(200).json({ success: true, message: "Mail sent successfully!" });
//   } catch (error) {
//     console.error("❌ Email API Error:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// }
