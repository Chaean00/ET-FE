import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { HttpStatusCode } from "axios";
import useAuth from "../hooks/useAuth";

const BASE_SSE_URL = `http://${import.meta.env.VITE_API_BASE_URL}:${
  import.meta.env.VITE_API_BASE_PORT
}/sse`;

const useSSE = (endpoint) => {
  const [data, setData] = useState(null);
  const { token, setToken } = useAuth();
  const controller = new AbortController();

  useEffect(() => {
    if (!endpoint || !token) return;

    let isCancelled = false;
    const sseUrl = `${BASE_SSE_URL}${endpoint}`;

    const connect = () => {
      if (isCancelled) return;
      setToken(localStorage.getItem("Authorization"));

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
          console.log(`SSE 연결 성공: ${sseUrl}`, response);
        },
        onmessage(event) {
          console.log(`SSE 데이터 수신 (${sseUrl}):`, event.data);
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
          console.error(`SSE 오류 발생 (${sseUrl}):`, error);
          controller.abort();
          if (!isCancelled) {
            setTimeout(connect, 3000);
          }
        },
        onclose() {
          console.log(`SSE 연결 종료 (${sseUrl})`);
          if (!isCancelled) {
            setTimeout(connect, 3000);
          }
        },
      });
    };

    connect();

    return () => {
      console.log(`SSE 연결 cleanup (${sseUrl})`);
      isCancelled = true;
      controller.abort();
    };
  }, [endpoint, token]);

  return data;
};

export default useSSE;
