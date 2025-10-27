import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { name, email, phone, zip, year, make, model, part, stock, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ionos.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // sales@nexxaauto.com
        pass: process.env.EMAIL_PASS, // password
      },
    });

    await transporter.sendMail({
      from: `"Nexxa Auto" <noreply@nexxaauto.com>`,
      to: "noreply@nexxaauto.com",
      bcc: "ksaybas3@gmail.com",
      replyTo: email,
      subject: "New Lead from Nexxa Auto",
      html: `
        <h2>🚗 New Lead from Nexxa Auto</h2>
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
        <p><b>Message:</b> ${message || "No message"}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Mail sent successfully!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, message: "Email send failed", error: error.message });
  }
}
