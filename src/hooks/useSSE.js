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
            retryCountRef.current = 0;
          } else {
          }
        },
        onmessage(event) {
          try {
            const parsedData = JSON.parse(event.data);
            retryCountRef.current = 0;

            if (event.event === "currentPrice") {
              setCurrent(parsedData);
            } else if (event.event === "askBid") {
              setAskBid(parsedData);
            } else {
            }
          } catch (error) {
          }
        },
        onerror(error) {
          controllerRef.current.abort();

          if (!isCancelled && retryCountRef.current < RETRY_DELAYS.length) {
            const delay = RETRY_DELAYS[retryCountRef.current];
            retryCountRef.current += 1;
            setTimeout(() => {
              controllerRef.current = new AbortController();
              connect();
            }, delay);
          }
        },
        onclose() {
        },
      });
    };

    connect();

    return () => {
      isCancelled = true;
      controllerRef.current.abort();
    };
  }, [endpoint, token, stableStockCodes]); // ✅ 안정화된 stockCodes 사용

  return { current, askBid };
};

export default useSSE;