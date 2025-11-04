import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// === EMAIL ROUTE ===
app.post("/send-email", async (req, res) => {
  const { name, email, phone, zip, part, make, model, year } = req.body;

  try {
    // Configure SMTP (IONOS)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ionos.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // billing@nexxaauto.com
        pass: process.env.EMAIL_PASS, // your IONOS password
      },
    });

    // Unique ID to prevent email threading in inbox
    const uniqueId = Date.now();

    // Email details
    const mailOptions = {
      from: `"Nexxa Auto" <noreply@nexxaauto.com>`,
      replyTo: email || "noreply@nexxaauto.com",
      to: "nexxaauto@gmail.com", // Primary inbox
      bcc: "nexxaleads@gmail.com", // Optional backup inbox
      subject: `New Inquiry from ${name || "Customer"} (#${uniqueId})`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>New Client Inquiry</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Pincode:</b> ${zip}</p>
          <hr/>
          <p><b>Vehicle Details:</b></p>
          <p>Year: ${year}</p>
          <p>Make: ${make}</p>
          <p>Model: ${model}</p>
          <p>Part Requested: ${part}</p>
          <hr/>
          <p style="font-size:12px;color:#777;">
            Sent automatically from NexxaAuto.com (Production)
          </p>
        </div>
      `,
      envelope: {
        from: "noreply@nexxaauto.com",
        to: "nexxaauto@gmail.com",
        bcc: "nexxaleads@gmail.com",
      },
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully to:", mailOptions.to);
    res.status(200).json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("Email Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// === ROOT ROUTE ===
app.get("/", (req, res) => {
  res.send("Nexxa Auto Mail API Running on Vercel Environment");
});

// === EXPORT FOR VERCEL ===
export default app;
