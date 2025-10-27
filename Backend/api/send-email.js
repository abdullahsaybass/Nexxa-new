import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  const { name, email, phone, zip, year, make, model, part, stock, message } =
    req.body || {};

  if (!email || !name || !part) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: name, email, or part",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ionos.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Nexxa Auto" <${process.env.EMAIL_USER}>`,
      to: "noreply@nexxaauto.com",
      bcc: "ksaybas3@gmail.com",
      replyTo: email,
      subject: "🚗 New Lead from Nexxa Auto",
      html: `
        <h2>New Lead from Nexxa Auto</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>ZIP:</b> ${zip || "N/A"}</p>
        <p><b>Vehicle:</b> ${year || ""} ${make || ""} ${model || ""}</p>
        <p><b>Part:</b> ${part}</p>
        <p><b>Stock:</b> ${stock || "N/A"}</p>
        <p><b>Message:</b> ${message || "N/A"}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully ✅",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
