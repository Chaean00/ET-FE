import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../common/components/BackButton";
import getChatBotResponse from "../../../utils/chatbot";

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `안녕하세요! 저는 주식공부를 도와줄 트레이드타운봇이에요. 어떤 것이 궁금하세요? 저에게 뭐든 물어보세요! 제가 중간에 말이 끊기면 "이어서 얘기해줘"라고 해주세요.🤗`
    }
  ]);
  const [input, setInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return; // 전송 중이면 return

    setIsLoading(true);
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const botResponseText = await getChatBotResponse(input);
      const botResponse = { sender: "bot", text: botResponseText };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "서버 응답이 없습니다. 다시 시도해주세요." }
      ]);
    }

    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="overflow-y-scroll flex flex-col bg-gray-100 h-screen">
      <div className="absolute top-4 left-4">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain cursor-pointer" />
        </span>
      </div>

      <header className="text-xl font-bold text-center p-4 bg-white shadow-md">
        AI 챗봇과 공부하기
      </header>

      <div className="flex-1 p-4 pb-30" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-t-2xl rounded-bl-2xl rounded-br-none"
                  : "bg-blue-200 text-black rounded-t-2xl rounded-br-2xl rounded-bl-none"
              } max-w-xs`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[70px] w-full bg-white border-t p-2 flex items-center h-14">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.repeat) {
              // e.repeat 체크 추가
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="flex-1 border rounded-lg p-2 outline-none"
          placeholder="대화를 입력해주세요"
        />

        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
