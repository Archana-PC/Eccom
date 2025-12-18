import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#f3f7f9] text-gray-700 pt-14 pb-8 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* ======= TOP SECTION ======= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* LOGO + DESCRIPTION */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#006699] mb-3">
              SHARK PLUS
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 mb-6">
              Premium menswear designed for everyday confidence.
              Shop high-quality shirts, polos, jeans, chinos & more.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:scale-110 transition">
                <img src="/icons/facebook.svg" className="w-6 opacity-80 hover:opacity-100" />
              </a>
              <a href="#" className="hover:scale-110 transition">
                <img src="/icons/instagram.svg" className="w-6 opacity-80 hover:opacity-100" />
              </a>
              <a href="#" className="hover:scale-110 transition">
                <img src="/icons/youtube.svg" className="w-6 opacity-80 hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 tracking-wide">SHOP</h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-[#006699]" to="/new-arrivals">New Arrivals</Link></li>
              <li><Link className="hover:text-[#006699]" to="/clothing">Clothing</Link></li>
              <li><Link className="hover:text-[#006699]" to="/shirts">Shirts</Link></li>
              <li><Link className="hover:text-[#006699]" to="/jeans">Jeans</Link></li>
              <li><Link className="hover:text-[#006699]" to="/chinos">Chinos</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 tracking-wide">SUPPORT</h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-[#006699]" to="/contact">Contact Us</Link></li>
              <li><Link className="hover:text-[#006699]" to="/faq">FAQ</Link></li>
              <li><Link className="hover:text-[#006699]" to="/returns">Return Policy</Link></li>
              <li><Link className="hover:text-[#006699]" to="/terms">Terms & Conditions</Link></li>
              <li><Link className="hover:text-[#006699]" to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 tracking-wide">JOIN OUR NEWSLETTER</h4>
            <p className="text-sm text-gray-600 mb-4">
              Get updates on new releases and exclusive offers.
            </p>

            <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="py-2 px-3 w-full text-sm outline-none"
              />
              <button
                className="px-5 py-2 bg-[#006699] text-white text-sm font-medium hover:bg-[#00557a] transition"
              >
                Subscribe
              </button>
            </div>

            {/* Payment Icons */}
            <div className="flex gap-4 mt-6 opacity-90">
              <img src="/payments/visa.png" className="w-10" />
              <img src="/payments/mastercard.png" className="w-10" />
              <img src="/payments/rupay.png" className="w-10" />
              <img src="/payments/upi.png" className="w-10" />
            </div>
          </div>
        </div>

        {/* ======= DIVIDER ======= */}
        <div className="border-t border-gray-300 my-8" />

        {/* ======= BOTTOM COPYRIGHT ======= */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} SHARK PLUS — All Rights Reserved.</p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-[#006699]">Terms</Link>
            <Link to="/privacy" className="hover:text-[#006699]">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
