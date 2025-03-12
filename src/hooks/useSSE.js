import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { HttpStatusCode } from "axios";
import useAuth from "../hooks/useAuth";

// ussSSE.js
const BASE_SSE_URL = `http://${import.meta.env.VITE_API_BASE_URL}:${
  import.meta.env.VITE_API_BASE_PORT
}/sse`;

const useSSE = (endpoint) => {
  const [data, setData] = useState(null);
  const { token, setToken } = useAuth();

  useEffect(() => {
    if (!endpoint || !token) return;

    let isCancelled = false; // 컴포넌트 언마운트 여부 체크
    const sseUrl = `${BASE_SSE_URL}${endpoint}`;

    // SSE 연결을 설정하는 함수
    const connect = () => {
      if (isCancelled) return;
      setToken(localStorage.getItem("Authorization"));
      const controller = new AbortController();

      fetchEventSource(sseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/event-stream",
        },
        signal: controller.signal,
        onopen(response) {
          if (response.status === HttpStatusCode.Forbidden) {
            console.log("로그인이 필요합니다.");
          }
          console.log(`✅ SSE 연결 성공: ${sseUrl}`, response);
        },
        onmessage(event) {
          console.log(`📡 SSE 데이터 수신 (${sseUrl}):`, event.data);
          let parsedData;
          try {
            parsedData = JSON.parse(event.data);
          } catch (error) {
            parsedData = event.data;
            console.error("SSE 데이터 파싱 실패:", error);
          }
          setData(parsedData);
        },
        onerror(error) {
          console.error(`❌ SSE 오류 발생 (${sseUrl}):`, error);
          // 에러 발생 시 연결 중단 후 재연결 시도
          controller.abort();
          if (!isCancelled) {
            // 3초 후 재연결
            setTimeout(connect, 3000);
          }
        },
        onclose() {
          console.log(`🔌 SSE 연결 종료 (${sseUrl})`);
          // 연결 종료 시에도 재연결 시도
          if (!isCancelled) {
            setTimeout(connect, 3000);
          }
        },
      });
    };

    // 최초 연결 시도
    connect();

    // cleanup: 컴포넌트 언마운트 시 재연결 방지
    return () => {
      console.log(`🔌 SSE 연결 cleanup (${sseUrl})`);
      isCancelled = true;
    };
  }, [endpoint, token]);

  return data;
};

export default useSSE;
