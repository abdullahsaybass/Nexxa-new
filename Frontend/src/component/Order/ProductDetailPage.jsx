import React, { useState } from "react";
import "./ProductDetailPage.css";
import { db } from "../../firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function ProductDetailPage() {
  const location = useLocation();
  const { selectedYear, selectedMake, selectedModel, selectedPart } = location.state || {};

  const year = selectedYear || "2023";
  const make = selectedMake || "Chevrolet";
  const model = selectedModel || "Malibu";
  const part = selectedPart || "AC Evaporator Housing";
  const stock = 15;

  const [formData, setFormData] = useState({ email: "", phone: "", zip: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);
    setStatus("");

    try {
      // ✅ 1️⃣ Store inquiry in Firestore
      const docRef = await addDoc(collection(db, "productInquiries"), {
        year,
        make,
        model,
        part,
        stock,
        email: formData.email,
        phone: formData.phone,
        zip: formData.zip,
        message: formData.message,
        createdAt: serverTimestamp(),
      });
      console.log("✅ Inquiry stored with ID:", docRef.id);

      // ✅ 2️⃣ Send email to backend (update to your production URL)
      const response = await axios.post("http://localhost:5000/send-email", {
        name: formData.email.split("@")[0],
        email: formData.email,
        phone: formData.phone,
        zip: formData.zip,
        year,
        make,
        model,
        part,
        stock,
        message: formData.message,
      });

      if (response.data.success) {
        console.log("📧 Email sent successfully!");
        setSubmitted(true);
        setStatus("✅ Inquiry sent successfully! Our team will contact you soon.");
        setFormData({ email: "", phone: "", zip: "", message: "" });
      } else {
        console.error("❌ Failed to send email:", response.data.message);
        setStatus("❌ Failed to send email. Please try again later.");
      }
    } catch (error) {
      console.error("❌ Error submitting inquiry:", error);
      setStatus("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pd-page">
      <section className="pd-header">
        <h1>
          Find Quality Used <span>{part}</span> For {year} {make} {model}
        </h1>
        <p>Connect instantly with trusted recyclers and certified suppliers.</p>
      </section>

      <section className="pd-inquiry-card">
        <h3>
          Currently Available: <span>{stock}</span> in stock
        </h3>

        {submitted ? (
          <div className="pd-success-message">
            🎉 Thank you for your inquiry! Our team will contact you shortly.
          </div>
        ) : (
          <form className="pd-inquiry-form" onSubmit={handleSubmit}>
            <input type="text" value={year} readOnly />
            <input type="text" value={make} readOnly />
            <input type="text" value={model} readOnly />
            <input type="text" value={part} readOnly />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="Enter ZIP code"
              value={formData.zip}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Request a Quote"}
            </button>
          </form>
        )}

        {status && <p className="pd-status">{status}</p>}
      </section>

      <section className="pd-product-info">
        <h2>Product Overview</h2>
        <p>
          Get high-quality OEM replacement parts for your vehicle from our nationwide network of trusted recyclers.
        </p>
      </section>
    </div>
  );
}
