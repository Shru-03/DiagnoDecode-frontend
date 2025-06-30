import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FcSpeaker } from "react-icons/fc";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";
import HighlightedText from "./HighlightedText";

const SummarySection = ({
  simplifiedText,
  isSpeaking,
  setIsSpeaking,
  language,
}) => {
  const cleanTextForSpeech = (text) =>
    text
      .replace(/[*_~`^><={}|[\]\\]/g, "")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const utter = new SpeechSynthesisUtterance(cleanTextForSpeech(text));
    if (language === "Hindi") {
      const hindiVoice = synth.getVoices().find((v) => v.lang === "hi-IN");
      if (!hindiVoice) {
        Swal.fire({
          icon: "warning",
          title: "Hindi Voice Not Found",
          text: "Please try a different browser.",
        });
        return;
      }
      utter.voice = hindiVoice;
      utter.lang = "hi-IN";
    } else {
      utter.lang = "en-US";
    }

    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    synth.speak(utter);
  };

  const downloadPDF = () => {
    const element = document.getElementById("pdf-summary");
    const opt = {
      margin: 0.5,
      filename: "summary-report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <>
      {/* 🔽 VISIBLE Summary Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mt-10 p-6 rounded-2xl bg-white shadow-xl overflow-hidden z-20"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-2xl text-gray-800">📄 Summary</h3>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => speakText(simplifiedText)}
                className={`flex cursor-pointer items-center transition ${
                  isSpeaking
                    ? "text-red-500 hover:text-red-700"
                    : "text-blue-500 hover:text-blue-700"
                }`}
              >
                <FcSpeaker className="animate-pulse" />
                <span className="ml-1 underline">
                  {isSpeaking ? "Stop listening" : "Tap to listen"}
                </span>
              </button>
              <button
                onClick={downloadPDF}
                className="cursor-pointer text-green-600 hover:text-green-800 underline text-sm"
              >
                ⬇️ Download PDF
              </button>
            </div>
          </div>
          <HighlightedText text={simplifiedText} />
        </div>
      </motion.div>

      {/* 🔒 HIDDEN version for PDF export */}
      <div className="hidden">
        <div
          id="pdf-summary"
          className="p-6 font-sans text-base leading-relaxed"
        >
          <h3 className="text-xl font-bold mb-2">📄 Summary</h3>
          <p>{simplifiedText}</p>
        </div>
      </div>
    </>
  );
};

export default SummarySection;
