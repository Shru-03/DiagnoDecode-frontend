import React, { useState } from "react";
import axios from "axios";

import "../index.css";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
import { extractTextFromPDF, extractTextFromImage } from "../utils/ocrUtils";
import Swal from "sweetalert2";
import Header from "./Header";
import StepsSection from "./StepsSection";
import UploadSection from "./UploadSection";
import SummarySection from "./SummarySection";
import { BASE_URL } from "../contant";
import Footer from "./Footer";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [language, setLanguage] = useState("English");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [simplifiedText, setSimplifiedText] = useState("");

  const [loadingStep, setLoadingStep] = useState("none");

  const handleFileChange = (e) => {
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
    <div className="">
      <div className="px-4 py-6 md:px-6">
        <Header />

        <div className="flex flex-col-reverse md:flex-row gap-10">
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
      <Footer />
    </div>
  );
};

export default FileUploader;
