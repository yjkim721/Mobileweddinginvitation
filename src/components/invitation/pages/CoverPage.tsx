import { motion } from "motion/react";
import coverImage from "figma:asset/f9f969ffed8b23afea2c99c0a530a3dcd4e1c658.png";
import { useState, useEffect } from "react";
import { messages, type Message } from "../../../data/messages";

export default function CoverPage() {
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    // URL 파라미터에서 name 가져오기
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("name");

    console.log("URL 파라미터 name:", nameParam);

    if (nameParam) {
      // messages.ts에서 찾기
      const foundMessage = messages.find((msg) => msg.name === nameParam);
      
      if (foundMessage) {
        console.log("메시지 찾음:", foundMessage);
        setMessage(foundMessage);
      } else {
        console.log("메시지를 찾을 수 없음:", nameParam);
      }
    }
  }, []);

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={coverImage}
          alt="Wedding"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col p-6 sm:p-8 md:p-12">
        {/* Top section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center pt-2 sm:pt-4"
        >
          <p
            className="text-white tracking-widest"
            style={{
              fontSize: "0.7rem",
              fontFamily: "'Noto Serif KR', serif",
              letterSpacing: "0.3em",
            }}
          >
            WEDDING INVITATION
          </p>
        </motion.div>

        {/* To section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-8"
        >
          <p
            className="text-white text-left inline-block"
            style={{
              fontSize: "0.9rem",
              fontFamily: "'Noto Serif KR', serif",
              fontWeight: 400,
              background: "rgba(0, 0, 0, 0.6)",
              padding: "2px 8px",
              boxDecorationBreak: "clone",
              WebkitBoxDecorationBreak: "clone",
            }}
          >
            To. {message?.name || "소중한 분"}
          </p>
          <div className="mt-2">
            {message?.content.split("\n").map((line, index) => (
              <p
                key={index}
                className="text-white text-left inline-block"
                style={{
                  fontSize: "0.85rem",
                  fontFamily: "'Noto Serif KR', serif",
                  fontWeight: 300,
                  lineHeight: "1.6",
                  background: line.trim()
                    ? "rgba(0, 0, 0, 0.6)"
                    : "transparent",
                  padding: line.trim() ? "2px 8px" : "0",
                  display: "block",
                  boxDecorationBreak: "clone",
                  WebkitBoxDecorationBreak: "clone",
                }}
              >
                {line || "\u00A0"}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Swipe instruction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="pb-4 text-center"
        >
          <div className="inline-block px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full">
            <p
              className="text-white"
              style={{
                fontSize: "0.9rem",
                fontFamily: "'Noto Serif KR', serif",
              }}
            >
              탭하여 넘겨주세요 →
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}