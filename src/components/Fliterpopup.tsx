import React from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest, FaInstagram } from "react-icons/fa";

const Fliterpopup = () => {
  return (
    <footer className="bg-[#424242] text-white">
      <div className="grid grid-cols-4 h-6/7">
        {/* First column */}
        <div className="col-span-1 py-4 px-4">
          <Image src={Bookkartlogo} alt="Logo" width={157} height={118} />
          <p style={{ color: "#C7C7C7" }}>
            BookKart is a customer-to-customer platform like Olx for books.
            Our main objective is to bridge the communication gap between book sellers and buyers/renters, reducing the cost of books and sharing knowledge.
          </p>
        </div>
        {/* Second column */}
        <div className="col-span-1">
          <p style={{ color: "#C7C7C7" }}>
            <ul>
              <li>Company</li><br />
              <li>About us</li>
              <li>Contact us</li>
              <li>Terms and conditions</li>
              <li>Shipping Policy</li>
              <li>Privacy Policy</li>
            </ul>
          </p>
        </div>
        {/* Third column */}
        <div className="col-span-1">
          <p style={{ color: "#C7C7C7" }}>
            <ul>
              <li>Quick links</li><br />
              <li>Home</li>
              <li>Events</li>
              <li>Book Store</li>
              <li>Category</li>
            </ul>
          </p>
        </div>
        {/* Fourth column */}
        <div className="col-span-1">
          <p>
            <p style={{ color: "#C7C7C7" }}>
              Details<br />
              <br />
              Connect with us<br />
              <br />
            </p>
            <p style={{ color: "#C7C7C7" }}>
              Email: customer@bookscape.com<br />
              Phone: +91 86520 50510 (9AM to 6PM)
            </p>
          </p>
          <div className="flex">
            <a href="https://www.facebook.com">
              <FaFacebook className="text-white mr-2" size={20} />
            </a>
            <a href="https://www.twitter.com">
              <FaTwitter className="text-white mr-2" size={20} />
            </a>
            <a href="https://www.linkedin.com">
              <FaLinkedin className="text-white mr-2" size={20} />
            </a>
            <a href="https://www.pintrest.com">
              <FaPinterest className="text-white mr-2" size={20} />
            </a>
            <a href="https://www.instragram.com">
              <FaInstagram className="text-white" size={20} />
            </a>
          </div>
        </div>
      </div>
      {/* Second row */}
      <div className="h-1/7">
        <div style={{ padding: "10px 0" }}>
          <hr style={{ backgroundColor: "#424242", height: "1px", border: "none" }} />
        </div>
        <p style={{ textAlign: "center", color: "#FFF1F1" }}>
          &copy; 2023 BookKart All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Fliterpopup;