import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "./Tc.css";

const Tc = () => {
  return (
    <div>
      <Header />

      <section className="tc-section">
        <div className="tc-content">
          <h1 className="tc-heading">Terms and Conditions</h1>

          {/* === INTRODUCTION === */}
          <div className="tc-item">
            <p>
              Before placing an order with <strong>Nexxa Auto Parts</strong>,
              please read these Terms carefully. By purchasing from us, you
              agree to the following:
            </p>
            <ul>
              <li>
                You have read and understood our{" "}
                <strong>Warranty Policy</strong> and{" "}
                <strong>Return Procedures</strong>.
              </li>
              <li>
                You are responsible for confirming that all parts ordered are
                correct and compatible with your vehicle.
              </li>
              <li>
                Nexxa Auto Parts reserves the right to refuse or cancel orders
                that do not comply with our policies.
              </li>
              <li>
                Our warranty applies only to the original purchaser and cannot
                be transferred.
              </li>
              <li>
                Warranty and refund claims will only be processed if the part is
                returned in the same condition as received, with no signs of
                misuse or improper installation.
              </li>
            </ul>
          </div>

          {/* === Order Accuracy === */}
          <div className="tc-item">
            <h2>Order Accuracy and Compatibility</h2>
            <p>
              Customers are responsible for providing accurate vehicle
              information, including make, model, year, and engine type. Nexxa
              Auto Parts will not be liable for incorrect orders placed due to
              customer error.
            </p>
          </div>

          {/* === Payment === */}
          <div className="tc-item">
            <h2>Payment</h2>
            <p>
              All payments must be completed before order processing. Nexxa Auto
              Parts accepts major credit cards and other payment methods
              displayed at checkout. We reserve the right to cancel or hold
              orders that cannot be verified or are flagged for potential fraud.
              If you purchase any products or services from us, you agree to
              provide accurate payment information. All payments are subject to
              applicable taxes and fees, and prices may change from time to
              time.
            </p>
          </div>

          {/* === Pricing and Availability === */}
          <div className="tc-item">
            <h2>Pricing and Availability</h2>
            <p>
              Prices and availability are subject to change without notice. If a
              product becomes unavailable after your order is placed, we will
              notify you and issue a full refund or suggest an alternative.
            </p>
          </div>

          {/* === Shipping === */}
          <div className="tc-item">
            <h2>Shipping and Delivery</h2>
            <p>
              Orders are shipped to the address provided at checkout. Nexxa Auto
              Parts is not responsible for delays caused by carriers, customs,
              or incorrect addresses provided by the customer.
            </p>
          </div>

          {/* === Limitation of Liability === */}
          <div className="tc-item">
            <h2>Limitation of Liability</h2>
            <p>
              Nexxa Auto Parts is not responsible for any labor costs,
              installation charges, towing, storage fees, or any indirect or
              consequential damages arising from the use or installation of
              parts purchased from us.
            </p>
          </div>

          {/* === Governing Law === */}
         

          {/* === Contact Us === */}
          {/* <div className="tc-item">
            <h2>Contact Us</h2>
            <p>
              <strong>Nexxa Auto Parts</strong>
              <br />
              550 Congressional Blvd, Suite 350
              <br />
              Carmel, IN 46032
              <br />
              📞 +1 (888) 266-0007
              <br />
              📧 info@nexxaauto.com
            </p>
          </div> */}

          {/* ===================================================== */}
          {/* === NEWLY ADDED 11 POINTS (UPDATED TERMS SECTION) === */}
          {/* ===================================================== */}
          <div className="tc-item">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using our website or services, you agree to comply
              with and be bound by these Terms and Conditions. If you do not
              agree to these terms, please do not use our website or services.
            </p>
          </div>

          <div className="tc-item">
            <h2>Use of the Website</h2>
            <p>You may use our website for lawful purposes only. You agree not to:</p>
            <ul>
              <li>Violate any applicable laws or regulations.</li>
              <li>
                Engage in any activity that could damage, disable, or impair the
                website or interfere with another user's ability to use the
                website.
              </li>
            </ul>
          </div>

          <div className="tc-item">
            <h2>Account Registration</h2>
            <p>
              To access certain features of our services, you may need to create
              an account. You agree to provide accurate and complete information
              during the registration process. You are responsible for keeping
              your account details and password confidential.
            </p>
          </div>

          <div className="tc-item">
            <h2>Intellectual Property</h2>
            <p>
              All content on the website, including text, graphics, logos, and
              images, is owned by or licensed to <strong>Nexxa Auto Parts</strong> and is protected by copyright and other intellectual property laws. You may not copy, distribute, or modify any content without our permission.
            </p>
          </div>

          

          <div className="tc-item">
            <h2>Limitation of Liability</h2>
            <p>
              Nexxa Auto Parts will not be liable for any damages, losses, or
              costs arising from your use of the website or services, including
              but not limited to direct, indirect, or consequential damages.
            </p>
          </div>

          <div className="tc-item">
            <h2>Privacy Policy</h2>
            <p>
              Your use of the website and services is also governed by our{" "}
              <a
                href="https://nexxaauto.com/privacypolicy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              , which explains how we collect, use, and protect your personal
              information.
            </p>
          </div>

          <div className="tc-item">
            <h2>Termination</h2>
            <p>
              We may suspend or terminate your access to the website or services
              if you violate these Terms and Conditions. You may also terminate
              your account by contacting us.
            </p>
          </div>

          <div className="tc-item">
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to update or modify these Terms and
              Conditions at any time. Any changes will be posted on this page,
              and the updated date will be noted at the top.
            </p>
          </div>

          <div className="tc-item">
            <h2>Governing Law</h2>
            <p>
              These Terms and Conditions will be governed by the laws of Indiana
              without regard to its conflict of law principles. Any disputes
              will be resolved in the appropriate courts of Indiana.
            </p>
          </div>

          <div className="tc-item">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, please
              contact us at:
            </p>
            <p>
              📧 <strong>Email:</strong>{" "}
              <a href="mailto:info@nexxaauto.com">info@nexxaauto.com</a>
            </p>
          </div>

          
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tc;
