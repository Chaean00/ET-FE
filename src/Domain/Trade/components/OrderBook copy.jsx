import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const OrderBook_copy = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // 더미 데이터
    const dummyData = {
      askp1: 410, askRSQN1: 100,
      askp2: 400, askRSQN2: 80,
      askp3: 399, askRSQN3: 50,
      askp4: 388, askRSQN4: 30,
      askp5: 387, askRSQN5: 20,
      bidp1: 386, bidRSQN1: 25,
      bidp2: 385, bidRSQN2: 40,
      bidp3: 384, bidRSQN3: 60,
      bidp4: 383, bidRSQN4: 100,
      bidp5: 382, bidRSQN5: 200
    };

    let mergedOrders = [
      { id: 1, price: dummyData.askp1, sellVolume: dummyData.askRSQN1, buyVolume: 0 },
      { id: 2, price: dummyData.askp2, sellVolume: dummyData.askRSQN2, buyVolume: 0 },
      { id: 3, price: dummyData.askp3, sellVolume: dummyData.askRSQN3, buyVolume: 0 },
      { id: 4, price: dummyData.askp4, sellVolume: dummyData.askRSQN4, buyVolume: 0 },
      { id: 5, price: dummyData.askp5, sellVolume: dummyData.askRSQN5, buyVolume: 0 },
      { id: 6, price: dummyData.bidp1, sellVolume: 0, buyVolume: dummyData.bidRSQN1 },
      { id: 7, price: dummyData.bidp2, sellVolume: 0, buyVolume: dummyData.bidRSQN2 },
      { id: 8, price: dummyData.bidp3, sellVolume: 0, buyVolume: dummyData.bidRSQN3 },
      { id: 9, price: dummyData.bidp4, sellVolume: 0, buyVolume: dummyData.bidRSQN4 },
      { id: 10, price: dummyData.bidp5, sellVolume: 0, buyVolume: dummyData.bidRSQN5 }
    ];

    mergedOrders.sort((a, b) => b.price - a.price);
    setOrders(mergedOrders);
  }, []);

  if (!code) {
    return <p className="text-center text-red-500">📢 종목 코드가 없습니다!</p>;
  }

  return (
    <div className="w-full h-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-4">
      <AnimatePresence>
        <ul className="w-full text-lg font-bold">
          {orders.map((order) => (
            <motion.li
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between items-center py-2"
            >
              {/* 매도 주문 수량 (빨간색, 왼쪽 정렬) */}
              <span className="text-red-500 text-left w-1/3 min-w-[60px]">
                {order.sellVolume > 0 ? order.sellVolume.toLocaleString() : ""}
              </span>
              
              {/* 현재 가격 (검정색, 중앙 정렬, 좌우 회색 테두리 추가) */}
              <span className="text-black text-center w-1/3 min-w-[60px] border-l border-r border-gray-300 px-2">
                {order.price.toLocaleString()}
              </span>
              
              {/* 매수 주문 수량 (파란색, 오른쪽 정렬) */}
              <span className="text-blue-500 text-right w-1/3 min-w-[60px]">
                {order.buyVolume > 0 ? order.buyVolume.toLocaleString() : ""}
              </span>
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
};

export default OrderBook_copy;
