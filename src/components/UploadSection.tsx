import React from "react";
import { motion } from "framer-motion";
import { GridLoader, ClipLoader } from "react-spinners";

interface UploadSectionProps {
  selectedFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  language: string;
  onLanguageChange: (value: string) => void;
  onUpload: () => void;
  loadingStep: string;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  selectedFile,
  onFileChange,
  language,
  onLanguageChange,
  onUpload,
  loadingStep,
}) => {
  return (
    <div className="bg-white shadow-2xl rounded-xl p-6 w-full md:w-1/2 flex flex-col justify-between">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-1 border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:border-blue-400 transition-colors"
      >
        <label
          className="cursor-pointer flex flex-col items-center"
          htmlFor="fileInput"
        >
          <span className="text-4xl mb-2 text-blue-500">📎</span>
          <span className="text-gray-700 font-medium">
            Click to Choose a File
          </span>
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".pdf, image/*"
          onChange={onFileChange}
          className="hidden"
        />
        <p className="mt-3 text-sm text-gray-500 italic">
          {selectedFile ? selectedFile.name : "No file selected"}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          (Only PDF and image files allowed)
        </p>
      </motion.div>

      <div className="space-y-4 mt-4">
        <span className="text-[18px] text-gray-600">Select a language.</span>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="mt-2 w-full p-2 border border-blue-400 rounded"
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        onClick={onUpload}
        className="mt-6 cursor-pointer bg-gradient-to-r from-pink-400 to-blue-400 text-white py-2 px-4 rounded-l shadow-md hover:shadow-l"
      >
        Upload & Simplify
      </motion.button>

      {loadingStep !== "none" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center flex flex-col items-center gap-3"
        >
          {loadingStep === "extracting" && (
            <>
              <GridLoader color="#60A5FA" size={12} />
              <p className="text-gray-600 text-sm font-medium">
                Extracting text from your file...
              </p>
            </>
          )}
          {loadingStep === "analyzing" && (
            <>
              <ClipLoader color="#EC4899" size={40} />
              <p className="text-gray-600 text-sm font-medium">
                Analyzing the report with AI magic...
              </p>
            </>
          )}
          {loadingStep === "error" && (
            <p className="text-red-500 font-semibold">
              Oops! Something went wrong. Please try again.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default UploadSection;
