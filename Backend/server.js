import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// === ✅ EMAIL ROUTE ===
app.post("/send-email", async (req, res) => {
  const { name, email, phone, zip, year, make, model, part, stock, message } = req.body;

  try {
    // ✅ Configure transporter (IONOS SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ionos.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // e.g. noreply@nexxaauto.com
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email structure
    const mailOptions = {
      from: `"Nexxa Auto" <noreply@nexxaauto.com>`, // visible sender
      replyTo: email || "noreply@nexxaauto.com", // reply-to user's email
      to: "noreply@nexxaauto.com", // main inbox
      bcc: "ksaybas3@gmail.com", // optional: for backup copy
      subject: "New Lead from Nexxa Auto",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>ZIP:</b> ${zip}</p>
          <hr/>
          <p><b>Year:</b> ${year}</p>
          <p><b>Make:</b> ${make}</p>
          <p><b>Model:</b> ${model}</p>
          <p><b>Part:</b> ${part}</p>
          <p><b>Stock:</b> ${stock}</p>
          <hr/>
          <p><b>Message:</b> ${message}</p>
          <p style="font-size:12px;color:#777;">Sent automatically via NexxaAuto.com</p>
        </div>
      `,
      // ✅ Envelope ensures correct actual sending addresses
      envelope: {
        from: "noreply@nexxaauto.com", // must match your authenticated IONOS sender
        to: "noreply@nexxaauto.com",
        bcc: "ksaybas3@gmail.com",
      },
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("❌ Email Error:", err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// === ✅ Test route ===
app.get("/", (req, res) => {
  res.send("🚀 Nexxa Auto Mail API Running Successfully!");
});

// === Start server ===
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
