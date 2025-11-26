import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo + About */}
          <div>
            <h2 className="text-white text-xl font-semibold mb-4">YourBrand</h2>
            <p className="text-gray-400">
              Building beautiful web experiences with simplicity and style.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-white text-lg font-medium mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-medium mb-3">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-medium mb-3">Newsletter</h3>
            <p className="text-gray-400 mb-3">Subscribe to our newsletter</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-l bg-gray-800 text-gray-200 focus:outline-none"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700 text-white">
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          © {new Date().getFullYear()} YourBrand — All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
