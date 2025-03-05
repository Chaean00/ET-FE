import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../common/components/Footer";
import BackButton from "../../../common/components/BackButton";

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "안녕! 나와 함께 경제공부를 도와줄 선생이야~ 뭐가 궁금하니?" },
  ]);
  const [input, setInput] = useState("");

  const chatContainerRef = useRef(null);

  // 메시지가 추가될 때 자동으로 스크롤
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 메시지 전송 함수
  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInput("");
  };

  // 챗봇 응답 로직
  const getBotResponse = (question) => {
    let response = "잘 모르겠어. 다른 질문 해볼래?";
    if (question.includes("GDP")) response = "GDP(국내총생산)는 한 나라에서 일정 기간 동안 생산된 모든 최종 재화와 서비스의 가치를 의미해!";
    return { sender: "bot", text: response };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* 상단 네비게이션 */}
      <div className="absolute top-4 left-4">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain cursor-pointer" />
        </span>
      </div>

      {/* 헤더 */}
      <header className="text-xl font-bold text-left p-4 bg-white shadow-md">
        AI 챗봇과 공부하기
      </header>

      {/* 메인 컨텐츠 (채팅 영역 + 입력창) */}
      <div className="flex flex-col flex-1">
        {/* 채팅 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.sender === "user" ? "bg-blue-500 text-white" : "bg-blue-200 text-black"
                } max-w-xs`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 입력창 */}
        <div className="flex items-center p-2 bg-white border-t flex-shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
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

      {/* Footer (고정된 높이 유지) */}
      <div className="h-16 bg-white border-t flex items-center justify-center flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
};

export default ChatbotPage;
