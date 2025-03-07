import { useEffect, useState } from "react";

const BASE_SSE_URL = import.meta.env.VITE_SSE_URL;

const useSSE = (endpoint) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const sseUrl = `${BASE_SSE_URL}${endpoint}`;
    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = (event) => {
      console.log(`📡 SSE 데이터 수신 (${sseUrl}):`, event.data);
      setData(JSON.parse(event.data));
    };

    eventSource.onerror = (error) => {
      console.error(`❌ SSE 오류 발생 (${sseUrl}):`, error);
      eventSource.close();
    };

    return () => {
      console.log(`🔌 SSE 연결 종료 (${sseUrl})`);
      eventSource.close();
    };
  }, [endpoint]);

  return data;
};

export default useSSE;
