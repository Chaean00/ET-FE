// hooks/useTrade.jsx
import { useEffect, useState, useRef } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { HttpStatusCode } from "axios";
import useAuth from "../hooks/useAuth";

const BASE_SSE_URL = `http://${import.meta.env.VITE_API_BASE_URL}:${
  import.meta.env.VITE_API_BASE_PORT
}/sse`;
const RETRY_DELAYS = [1000, 3000, 5000, 10000]; // 1초, 3초, 5초, 10초

export default function useTrade(endpoint) {
  const { token } = useAuth();
  const [data, setData] = useState(null);

  // retryCount를 useRef로 관리
  const retryCountRef = useRef(0);
  const controllerRef = useRef(null);

  useEffect(() => {
    if (!endpoint || !token) return;

    let isCancelled = false;

    const sseUrl = `${BASE_SSE_URL}${endpoint}`;

    function connect() {
      if (isCancelled) return;

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      // 최대 재시도 횟수를 넘어가면 중단
      if (retryCountRef.current >= RETRY_DELAYS.length) {
        return;
      }

      controllerRef.current = new AbortController();

      fetchEventSource(sseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/event-stream"
        },
        signal: controllerRef.current.signal,
        onopen(response) {
          if (
            response.status === HttpStatusCode.Forbidden ||
            response.status === HttpStatusCode.Unauthorized
          ) {
            controllerRef.current.abort();
            return;
          }
          retryCountRef.current = 0;
        },
        onmessage(event) {
          try {
            setData(JSON.parse(event.data));
          } catch (err) {
            setData(event.data);
          }
        },
        onerror(error) {
          // 서버가 아예 안 떠 있거나, CORS 문제 등으로 FetchError가 발생할 수도 있음
          // if (
          //   error?.status === HttpStatusCode.Forbidden ||
          //   error?.status === HttpStatusCode.Unauthorized
          // ) {
          //   controllerRef.current.abort();
          //   return;
          // }

          retry();
        },
        onclose() {
          if (!isCancelled) {
            retry();
          }
        }
      });
    }

    function retry() {
      // 연결 중단 상태가 아니고, 아직 재시도 횟수가 남았다면 재연결
      if (retryCountRef.current < RETRY_DELAYS.length) {
        const delay = RETRY_DELAYS[retryCountRef.current];
        setTimeout(() => {
          retryCountRef.current += 1;
          connect();
        }, delay);
      }
      // 초과 시는 connect() 내부에서 경고 후 중단
    }

    connect();

    return () => {
      isCancelled = true;
      // if (controllerRef.current) {
      //   controllerRef.current.abort();
      // }
    };
  }, [endpoint, token]);

  return data;
}
