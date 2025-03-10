import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source"; // Make sure to install fetch-event-source package

const BASE_SSE_URL = import.meta.env.VITE_SSE_URL;

const useSSE = (endpoint) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const jwtToken = localStorage.getItem("Authorization");

    const sseUrl = `${BASE_SSE_URL}${endpoint}`;
    const controller = new AbortController();
    console.log("JWT 토큰:", jwtToken);

    // Using fetchEventSource to connect with custom headers
    fetchEventSource(sseUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwtToken}`,
        "Accept": "text/event-stream",
      },
      signal: controller.signal,
      onopen(response) {
        console.log(`✅ SSE 연결 성공: ${sseUrl}`, response);
      },
      onmessage(event) {
        console.log(`📡 SSE 데이터 수신 (${sseUrl}):`, event.data);
        try {
          const parsedData = JSON.parse(event.data);
          setData(parsedData);  // 상태 업데이트
        } catch (error) {
          console.error("SSE 데이터 파싱 실패:", error);
        }
      },
      onerror(error) {
        console.error(`❌ SSE 오류 발생 (${sseUrl}):`, error);
        controller.abort(); // Close the connection on error
      },
    });

    // Cleanup function to close the connection when the component unmounts
    return () => {
      console.log(`🔌 SSE 연결 종료 (${sseUrl})`);
      controller.abort();
    };
  }, [endpoint]);

  return data;
};

export default useSSE;