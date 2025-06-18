import React from "react";
import { motion } from "framer-motion";
import { FcSpeaker } from "react-icons/fc";
import Swal from "sweetalert2";
import HighlightedText from "./HighlightedText";

type Props = {
  simplifiedText: string;
  isSpeaking: boolean;
  setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
};

const SummarySection: React.FC<Props> = ({
  simplifiedText,
  isSpeaking,
  setIsSpeaking,
  language,
}) => {
  const cleanTextForSpeech = (text: string) =>
    text
      .replace(/[*_~`^><={}|[\]\\]/g, "")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const speakText = (text: string) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mt-10 p-6 rounded-2xl bg-white shadow-xl overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-2xl text-gray-800">📄 Summary</h3>
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
        </div>
        <HighlightedText text={simplifiedText} />
      </div>
    </motion.div>
  );
};

export default SummarySection;
