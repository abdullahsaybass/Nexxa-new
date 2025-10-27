// import express from "express";
// import nodemailer from "nodemailer";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // === EMAIL ROUTE ===
// app.post("/send-email", async (req, res) => {
//   const { name, email, phone, zip, year, make, model, part, stock, message } = req.body;

//   try {
//     //  Setup transporter using your actual IONOS account
//     const transporter = nodemailer.createTransport({
//       host: "smtp.ionos.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER, // sales@nexxaauto.com
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Mail options (display + routing)
//     const mailOptions = {
//       from: '"Nexxa Auto" <noreply@nexxaauto.com>', 
//       replyTo: email, 
//       to: "noreply@nexxaauto.com", 
//       bcc: "ksaybas3@gmail.com", // hidden internal copy
//       subject: "New Lead from Nexxa Auto",
//       html: `
//         <div style="font-family: Arial, sans-serif; color: #333;">
//           <h2>New Lead from Nexxa Auto</h2>
//           <hr/>
//           <p><b>Name:</b> ${name}</p>
//           <p><b>Email:</b> ${email}</p>
//           <p><b>Phone:</b> ${phone}</p>
//           <p><b>ZIP:</b> ${zip}</p>
//           <hr/>
//           <h3>Vehicle / Part Details</h3>
//           <p><b>Year:</b> ${year}</p>
//           <p><b>Make:</b> ${make}</p>
//           <p><b>Model:</b> ${model}</p>
//           <p><b>Part:</b> ${part}</p>
//           <p><b>Stock:</b> ${stock}</p>
//           <hr/>
//           <h3>Message:</h3>
//           <p>${message || "No additional message provided."}</p>
//           <hr/>
//           <p style="font-size: 12px; color: #777;">Sent automatically via NexxaAuto.com</p>
//         </div>
//       `,
//       // 🔹 Real envelope for SMTP
//       envelope: {
//         from: "sales@nexxaauto.com", 
//         to: "noreply@nexxaauto.com", 
//         bcc: "ksaybas3@gmail.com", // internal copy
//       },
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully!");
//     res.status(200).json({ success: true, message: "Email sent successfully!" });
//   } catch (error) {
//     console.error(" Email sending error:", error);
//     res.status(500).json({ success: false, message: "Failed to send email" });
//   }
// });

// app.get("/", (req, res) => res.send(" Nexxa Auto Mail API Running"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(` Server started on port ${PORT}`));

import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// === ✅ EMAIL ROUTE ===
app.post("/send-email", async (req, res) => {
  const { name, email, phone, zip, year, make, model, part, stock, message } = req.body;

  try {
    // ✅ IONOS SMTP transporter setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ionos.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // e.g. sales@nexxaauto.com
        pass: process.env.EMAIL_PASS, // your IONOS password
      },
    });

    // ✅ Proper mail options
    const mailOptions = {
      from: '"Nexxa Auto" <noreply@nexxaauto.com>', // what recipients will see
      replyTo: email, // allows replying to customer
      to: "noreply@nexxaauto.com", // your receiving inbox
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
      // ✅ Real envelope to satisfy IONOS
      envelope: {
        from: "sales@nexxaauto.com", // must match authenticated sender
        to: "noreply@nexxaauto.com",
        bcc: "ksaybas3@gmail.com",
      },
    };

    // ✅ Send the email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// === ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Nexxa Auto Mail API Running Successfully!");
});

// === ✅ Start server (only for local dev; Vercel auto-handles it)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
