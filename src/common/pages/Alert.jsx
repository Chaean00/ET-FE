import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import useTrade from "../../hooks/useTrade";

export default function Alert() {
  const data = useTrade("/subscribe/trade");

  useEffect(() => {
    if (data) {
      const message =
        typeof data === "string" ? data.split("/")[0] : JSON.stringify(data);
      toast(`🔔 거래 체결 알림: ${message}`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        progress: undefined,
        transition: Zoom,
      });
    }
  }, [data]);

  return createPortal(<ToastContainer />, document.body);
}
