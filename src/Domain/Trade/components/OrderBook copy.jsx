import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const OrderBookCopy = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // ✅ 더미 데이터 (초기값)
    const sseData = [
      { id: 1, price: 5000, sellVolume: 10, buyVolume: 0 },
      { id: 2, price: 5050, sellVolume: 15, buyVolume: 0 },
      { id: 3, price: 5100, sellVolume: 20, buyVolume: 0 },
      { id: 4, price: 5150, sellVolume: 10, buyVolume: 0 },
      { id: 5, price: 5200, sellVolume: 5, buyVolume: 0 },
      { id: 6, price: 4950, sellVolume: 0, buyVolume: 12 },
      { id: 7, price: 4900, sellVolume: 0, buyVolume: 18 },
      { id: 8, price: 4850, sellVolume: 0, buyVolume: 25 },
      { id: 9, price: 4800, sellVolume: 0, buyVolume: 30 },
      { id: 10, price: 4750, sellVolume: 0, buyVolume: 40 },
    ];
    
    setOrders(sseData);

    // ✅ 테스트 코드: 1초마다 수량 랜덤 변경
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => ({
          ...order,
          sellVolume: order.sellVolume > 0 ? Math.floor(Math.random() * 40) : 0,
          buyVolume: order.buyVolume > 0 ? Math.floor(Math.random() * 40) : 0,
        }))
      );
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 제거
  }, []);

  if (!code) {
    return <p className="text-center text-red-500">📢 종목 코드가 없습니다!</p>;
  }

  // ✅ 현재 최대 주문량 계산 (막대 길이 조절을 위해)
  const maxVolume = Math.max(...orders.map(order => Math.max(order.sellVolume, order.buyVolume)), 1);

  return (
    <div className="w-[90%] relative p-4 rounded-lg shadow-lg">
      <AnimatePresence>
        <ul className="flex flex-col items-center w-full space-y-1">
          {orders.map((order) => {
            const sellBarWidth = order.sellVolume > 0 ? (order.sellVolume / maxVolume) * 50 : 0;
            const buyBarWidth = order.buyVolume > 0 ? (order.buyVolume / maxVolume) * 50 : 0;

            return (
              <motion.li
                key={order.id}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1.0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="relative w-full flex items-center justify-center py-2"
              >
                {/* 매도량 막대 (중앙에서 왼쪽으로 확장) */}
                <motion.div
                  className="absolute left-[50%] h-[50%] bg-blue-500 opacity-30"
                  style={{
                    width: `${sellBarWidth}%`,
                    transform: "translateX(-100%)",
                    borderTopLeftRadius: "9999px",
                    borderBottomLeftRadius: "9999px",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                    transition: "width 0.3s ease-in-out",
                  }}
                />

                {/* 매도량 숫자 (왼쪽) */}
                <span className="relative text-sm font-bold text-blue-500 w-14 text-right z-10">
                  {order.sellVolume > 0 ? order.sellVolume.toLocaleString() : ""}
                </span>

                {/* 가격 표시 (가운데) */}
                <span className="relative text-lg font-bold text-black z-10 w-20 text-center">
                  {order.price.toLocaleString()}
                </span>

                {/* 매수량 숫자 (오른쪽) */}
                <span className="relative text-sm font-bold text-red-500 w-14 text-left z-10">
                  {order.buyVolume > 0 ? order.buyVolume.toLocaleString() : ""}
                </span>

                {/* 매수량 막대 (중앙에서 오른쪽으로 확장) */}
                <motion.div
                  className="absolute left-[50%] h-[50%] bg-red-500 opacity-30"
                  style={{
                    width: `${buyBarWidth}%`,
                    transform: "translateX(0%)",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                    borderTopRightRadius: "9999px",
                    borderBottomRightRadius: "9999px",
                    transition: "width 0.3s ease-in-out",
                  }}
                />
              </motion.li>
            );
          })}
        </ul>
      </AnimatePresence>
    </div>
  );
};

export default OrderBookCopy;
