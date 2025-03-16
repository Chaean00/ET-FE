import { useEffect, useState, useRef, useMemo } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { HttpStatusCode } from "axios";
import useAuth from "../hooks/useAuth";

const BASE_SSE_URL = `http://${import.meta.env.VITE_API_BASE_URL}:${
  import.meta.env.VITE_API_BASE_PORT
}/sse`;

const RETRY_DELAYS = [1000, 3000, 5000, 10000];
const useSSE = (endpoint, stockCodes) => {
  const [askBid, setAskBid] = useState();
  const [current, setCurrent] = useState();

  const { token } = useAuth();
  const retryCountRef = useRef(0);
  const controllerRef = useRef(new AbortController());

  const stableStockCodes = useMemo(() => stockCodes, [stockCodes]); // 안정적인 상태 유지

  useEffect(() => {
    if (!endpoint || !token || !stableStockCodes) return;

    let isCancelled = false;
    const sseUrl = `${BASE_SSE_URL}${endpoint}?stockCodes=${stableStockCodes}`; // ✅ 문자열 그대로 사용

    const connect = () => {
      if (isCancelled || retryCountRef.current >= RETRY_DELAYS.length) return;

      fetchEventSource(sseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/event-stream",
        },
        signal: controllerRef.current.signal,
        onopen(response) {
          if (response.status === 200) {
            console.log("✅ SSE 연결 성공");
            retryCountRef.current = 0;
          } else {
            console.log("❌ SSE 연결 실패", response.status);
          }
          console.log(`SSE 연결 성공: ${sseUrl}`, response);
        },
        onmessage(event) {
          try {
            const parsedData = JSON.parse(event.data);
            retryCountRef.current = 0;

            if (event.event === "currentPrice") {
              // console.log("CUR = " + JSON.stringify(parsedData))
              setCurrent(parsedData);
            } else if (event.event === "askBid") {
              // console.log("ASK = " + JSON.stringify(parsedData))
              setAskBid(parsedData);
            } else {
              console.warn("⚠️ 알 수 없는 이벤트 타입:", event.event);
            }
          } catch (error) {
            console.error("❌ SSE 데이터 파싱 실패:", error);
          }
        },
        onerror(error) {
          console.error("❌ SSE 오류 발생:", error);
          controllerRef.current.abort();

          if (!isCancelled && retryCountRef.current < RETRY_DELAYS.length) {
            const delay = RETRY_DELAYS[retryCountRef.current];
            console.warn(`⏳ ${delay / 1000}초 후 SSE 재연결...`);
            retryCountRef.current += 1;
            setTimeout(() => {
              controllerRef.current = new AbortController();
              connect();
            }, delay);
          }
        },
        onclose() {
          console.warn("🔌 SSE 연결 종료");
        },
      });
    };

    connect();

    return () => {
      console.log(`SSE 연결 cleanup (${sseUrl})`);
      isCancelled = true;
      controllerRef.current.abort();
    };
  }, [endpoint, token, stableStockCodes]); // ✅ 안정화된 stockCodes 사용

  return { current, askBid };
};

export default useSSE;
