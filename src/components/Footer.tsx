import React from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-2xl px-3 sm:px-10 py-4 flex items-center justify-between flex-wrap"
    >
      <img src="/logo2.png" alt="Logo" className="h-10" />

      <p className="text-[15px] sm:text-[18px] text-gray-500 mt-2">
        © {currentYear} Shruti Sharma. All rights reserved.
      </p>

      <div className="flex justify-end items-center gap-3 mt-1 text-gray-500 text-sm">
        <a
          href="https://www.linkedin.com/in/shruti-sharma-developer/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
        >
          <FaLinkedin size={19} />
        </a>
        <a
          href="https://devbyshruti.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
        >
          <FaGlobe size={19} />
        </a>
      </div>
    </motion.footer>
  );
};

export default Footer;
