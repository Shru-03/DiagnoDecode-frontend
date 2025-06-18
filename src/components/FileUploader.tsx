import React, { useState } from "react";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "../index.css";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
import { extractTextFromPDF, extractTextFromImage } from "../utils/ocrUtils";
import Swal from "sweetalert2";
import Header from "./Header";
import StepsSection from "./StepsSection";
import UploadSection from "./UploadSection";
import SummarySection from "./SummarySection";
import { BASE_URL } from "../contant";

const FileUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<string>("English");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [simplifiedText, setSimplifiedText] = useState<string>("");

  const [loadingStep, setLoadingStep] = useState<
    "none" | "extracting" | "analyzing" | "done" | "error"
  >("none");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "No File Selected!",
        text: "Please select a file first.",
      });

      return;
    }

    setSimplifiedText("");
    setLoadingStep("extracting");

    let extractedText = "";

    try {
      if (selectedFile.type === "application/pdf") {
        extractedText = await extractTextFromPDF(selectedFile);
      } else if (selectedFile.type.startsWith("image/")) {
        extractedText = await extractTextFromImage(selectedFile);
      } else {
        alert("Unsupported file type. Only PDF and image files are allowed.");
        setLoadingStep("none");
        return;
      }

      setLoadingStep("analyzing");

      const response = await axios.post(`${BASE_URL}/api/simplify`, {
        text: extractedText,
        language: language,
      });

      setSimplifiedText(response.data.simplified);
      setLoadingStep("done");
    } catch (err) {
      console.error(err);
      setLoadingStep("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-blue-200 to-pink-100 p-10">
      <Header />

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Manual Section */}
        <StepsSection />

        {/* Right Upload Section */}

        <UploadSection
          selectedFile={selectedFile}
          onFileChange={handleFileChange}
          language={language}
          onLanguageChange={setLanguage}
          onUpload={handleUpload}
          loadingStep={loadingStep}
        />
      </div>

      {loadingStep === "done" && simplifiedText && (
        <SummarySection
          simplifiedText={simplifiedText}
          isSpeaking={isSpeaking}
          setIsSpeaking={setIsSpeaking}
          language={language}
        />
      )}
    </div>
  );
};

export default FileUploader;
