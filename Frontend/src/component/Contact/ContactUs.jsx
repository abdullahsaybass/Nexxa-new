import React, { useState } from "react";
import "./ContactUs.css";
import { FaEnvelope, FaPhoneAlt, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactSection() {
  const [activeSide, setActiveSide] = useState("form");
  const [consent, setConsent] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) {
      alert("Please agree to the Privacy Policy before submitting.");
      return;
    }

    alert("Form submitted successfully!");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setConsent(false);
  };

  return (
    <section className="contact-section">
      <div className="contact-content">
        <div className="map-container">
          <iframe
            title="Nexxa Auto Parts Location"
            src="https://www.google.com/maps?q=550+Congressional+Blvd,+Suite+350,+Carmel,+IN+46032&output=embed"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <h2 className="contact-heading">Get in Touch with Nexxa Auto Parts</h2>
        <p className="contact-subheading">
          We specialize in high-quality second-hand OEM car parts. Reach out for inquiries, orders, or support.
        </p>

        <div className="contact-container-box">
          <div className="contact-container">
            {/* === Contact Form === */}
            <div
              className={`contact-form ${activeSide === "form" ? "active-side" : ""}`}
              onClick={() => setActiveSide("form")}
            >
              <h3 className="form-title">Send Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder=""
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    placeholder=""
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                {/* === Privacy Policy Checkbox === */}
                <div className="privacy-row">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <label htmlFor="privacyConsent">
                    By using our website and services, you agree to the collection and use of information in accordance with this Privacy Policy.
                  </label>
                </div>

                <button type="submit" className="send-btn" disabled={!consent}>
                  ✉ Send Message
                </button>
              </form>
            </div>

            {/* === Contact Info === */}
            <div
              className={`contact-info ${activeSide === "info" ? "active-side" : ""}`}
              onClick={() => setActiveSide("info")}
            >
              <h3 className="info-title">Nexxa Auto Parts</h3>
              <p className="info-description">
                We’re proud to serve customers nationwide with top-quality second-hand car parts, trusted by
                thousands of mechanics and vehicle owners. Contact us for genuine OEM replacements at affordable prices.
              </p>

              <div className="info-grid">
                <div className="info-box">
                  <FaEnvelope className="info-icon" />
                  <div>
                    <h4>Email</h4>
                    <p>info@nexxaauto.com</p>
                  </div>
                </div>

                <div className="info-box">
                  <FaPhoneAlt className="info-icon" />
                  <div>
                    <h4>Phone</h4>
                    <p>+1 (888) 266-0007</p>
                  </div>
                </div>

                <div className="info-box">
                  <FaGlobe className="info-icon" />
                  <div>
                    <h4>Website</h4>
                    <p>www.nexxaauto.com</p>
                  </div>
                </div>

                <div className="info-box">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <h4>Address</h4>
                    <p>550 Congressional Blvd, Suite 350<br />Carmel, IN 46032</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
