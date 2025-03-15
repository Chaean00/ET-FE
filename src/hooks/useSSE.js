import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { HttpStatusCode } from "axios";
import useAuth from "../hooks/useAuth";

const BASE_SSE_URL = `http://${import.meta.env.VITE_API_BASE_URL}:${
  import.meta.env.VITE_API_BASE_PORT
}/sse`;

const RETRY_DELAYS = [1000, 3000, 5000, 10000];

const useSSE = (endpoint) => {
  const [data, setData] = useState(null);
  const { token, setToken } = useAuth();
  const [retryCount, setRetryCount] = useState(0);
  const controller = new AbortController();

  useEffect(() => {
    if (!endpoint || !token) return;

    let isCancelled = false;
    const sseUrl = `${BASE_SSE_URL}${endpoint}`;

    const connect = () => {
      if (isCancelled || retryCount >= RETRY_DELAYS.length) return;

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
            setToken(null);
            console.error("로그인 실패");
          }
        },
        onmessage(event) {
          let parsedData;
          try {
            parsedData = JSON.parse(event.data);
            setRetryCount(0);
          } catch (error) {
            parsedData = event.data;
            console.error("SSE 데이터 파싱 실패:", error);

            if (retryCount < RETRY_DELAYS.length) {
              const delay = RETRY_DELAYS[retryCount];
              console.warn(`⏳ ${delay / 1000}초 후 재시도...`);
              setTimeout(connect, delay);
              setRetryCount(retryCount + 1);
            } else {
              console.error("SSE 데이터 파싱 실패 - 최대 재시도 횟수 도달");
              controller.abort();
            }
          }
          setData(parsedData);
        },
        onerror(error) {
          console.error(`SSE 오류 발생 (${sseUrl}):`, error);
          controller.abort();

          if (!isCancelled && retryCount < RETRY_DELAYS.length) {
            const delay = RETRY_DELAYS[retryCount];
            console.warn(`⏳ ${delay / 1000}초 후 SSE 재연결...`);
            setTimeout(connect, delay);
            setRetryCount(retryCount + 1);
          } else {
            console.error("SSE 연결 실패 - 최대 재시도 횟수 도달");
          }
        },
        onclose() {
          if (!isCancelled && retryCount < RETRY_DELAYS.length) {
            const delay = RETRY_DELAYS[retryCount];
            console.warn(`⏳ ${delay / 1000}초 후 SSE 재연결...`);
            setTimeout(connect, delay);
            setRetryCount(retryCount + 1);
          } else {
            console.error("SSE 연결 종료 - 최대 재시도 횟수 도달");
          }
        },
      });
    };

    connect();

    return () => {
      console.log(`🔌 SSE 연결 cleanup (${sseUrl})`);
      isCancelled = true;
      controller.abort();
    };
  }, [endpoint, token, retryCount]);

  return data;
};

export default useSSE;
