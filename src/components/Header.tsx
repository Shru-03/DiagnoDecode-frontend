import React from "react";
import { motion } from "framer-motion";

const Header: React.FC = () => (
  <motion.header
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className=" bg-white shadow-2xl rounded-xl mb-10 px-6 py-3 sm:px-10 flex  items-center justify-between"
  >
    <img
      src="/logo2.png"
      alt="Logo"
      className="logo h-10 sm:h-12 md:h-16 object-contain"
    />
    <div className="head-text text-right  ">
      <h3 className="text-lg sm:text-l md:text-xl font-semibold text-gray-700">
        Decode medical reports with ease
      </h3>
      <p className="text-lg sm:text-l md:text-xl text-sm text-gray-500">
        From complex data to clear health insights
      </p>
    </div>
  </motion.header>
);

export default Header;
