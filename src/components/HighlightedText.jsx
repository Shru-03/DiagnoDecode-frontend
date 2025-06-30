import { useEffect, useState } from "react";

const keywords = [
  { label: "Diagnosis", emoji: "📋", color: "bg-yellow-200" },
  { label: "Medicine", emoji: "💊", color: "bg-pink-200" },
  { label: "Medications", emoji: "💊", color: "bg-pink-200" },
  { label: "Test", emoji: "🧪", color: "bg-blue-200" },
  { label: "Tests", emoji: "🧪", color: "bg-blue-200" },
];

const HighlightedText = ({ text }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let formatted = text;
    keywords.forEach(({ label, emoji, color }) => {
      const regex = new RegExp(`\\b(${label})\\b`, "gi");
      formatted = formatted.replace(
        regex,
        `<span class='inline-block px-2 py-1 text-sm rounded-md ${color} text-gray-800 font-semibold mr-1'>${emoji} $1</span>`
      );
    });

    let index = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + formatted.charAt(index));
      index++;
      if (index >= formatted.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div
      className="whitespace-pre-wrap text-gray-700 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: displayed }}
    />
  );
};

export default HighlightedText;
