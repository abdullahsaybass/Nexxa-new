import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, email, phone, zip, year, make, model, part, stock, message } = req.body;

  try {
    // ✅ Configure SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ionos.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Prepare mail content
    const mailOptions = {
      from: `"Nexxa Auto" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: "noreply@nexxaauto.com",
      bcc: "ksaybas3@gmail.com",
      subject: "🚗 New Lead from Nexxa Auto",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>New Inquiry from Nexxa Auto</h2>
          <p><b>Name:</b> ${name || "N/A"}</p>
          <p><b>Email:</b> ${email || "N/A"}</p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>
          <p><b>ZIP:</b> ${zip || "N/A"}</p>
          <hr/>
          <p><b>Year:</b> ${year}</p>
          <p><b>Make:</b> ${make}</p>
          <p><b>Model:</b> ${model}</p>
          <p><b>Part:</b> ${part}</p>
          <p><b>Stock:</b> ${stock}</p>
          <hr/>
          <p><b>Message:</b> ${message || "No message provided."}</p>
          <hr/>
          <p style="font-size: 12px; color: #777;">Sent automatically via NexxaAuto.com</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    return res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    return res.status(500).json({ success: false, message: "Failed to send email" });
  }
}
