import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { name, email, phone, zip, year, make, model, part, stock, message } = req.body;

  try {
    // ✅ IONOS SMTP transporter setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ionos.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // e.g. sales@nexxaauto.com
        pass: process.env.EMAIL_PASS, // IONOS password
      },
    });

    // ✅ Proper mail options
    const mailOptions = {
      from: '"Nexxa Auto" <noreply@nexxaauto.com>', // visible sender name
      replyTo: email,
      to: "noreply@nexxaauto.com",
      bcc: "ksaybas3@gmail.com", // hidden copy
      subject: "New Lead from Nexxa Auto",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>🚗 New Lead from Nexxa Auto</h2>
          <p><b>Name:</b> ${name || "N/A"}</p>
          <p><b>Email:</b> ${email || "N/A"}</p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>
          <p><b>ZIP Code:</b> ${zip || "N/A"}</p>

          <hr/>
          <h3>Vehicle & Part Details</h3>
          <p><b>Year:</b> ${year}</p>
          <p><b>Make:</b> ${make}</p>
          <p><b>Model:</b> ${model}</p>
          <p><b>Part:</b> ${part}</p>
          <p><b>Stock:</b> ${stock}</p>

          <hr/>
          <h3>Message:</h3>
          <p>${message || "No additional message provided."}</p>

          <hr/>
          <p style="font-size: 12px; color: #777;">Sent automatically via NexxaAuto.com</p>
        </div>
      `,
      envelope: {
        from: "sales@nexxaauto.com", // must match your authenticated email
        to: "noreply@nexxaauto.com",
        bcc: "ksaybas3@gmail.com",
      },
    };

    // ✅ Send the email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    return res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return res.status(500).json({ success: false, message: "Failed to send email" });
  }
}
