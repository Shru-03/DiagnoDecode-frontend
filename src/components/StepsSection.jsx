import React from "react";
import { motion } from "framer-motion";

const steps = [
  { icon: "📤", text: "Upload a PDF or image of your medical report." },
  { icon: "🌐", text: "Select your preferred language for simplification." },
  { icon: "⚙️", text: 'Click "Upload & Simplify" to process the file.' },
  { icon: "📄", text: "Read the simplified version of your medical report." },
  {
    icon: "💡",
    text: "Tip: For best results, upload high-quality scans or clear images.",
  },
];

const StepsSection = () => (
  <div className="bg-white shadow-xl rounded-xl p-6 w-full md:w-1/2">
    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      <span className="text-blue-500">🩺</span> How it Works
    </h2>
    <motion.ol
      initial="hidden"
      whileInView="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      className="space-y-4 text-gray-700"
    >
      {steps.map((step, idx) => (
        <motion.li
          key={idx}
          className="flex items-start gap-0 sm:gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.2 }}
        >
          <span className="text-xl">{step.icon}</span>
          <span className="text-sm sm:text-l">{step.text}</span>
        </motion.li>
      ))}
    </motion.ol>
  </div>
);

export default StepsSection;
