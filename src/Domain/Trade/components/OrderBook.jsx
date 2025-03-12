import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useSSE from "../../../hooks/useSSE";

const OrderBook = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [orders, setOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);
  const [buyOrders, setBuyOrders] = useState([]);

  const sseData = useSSE(code ? `/ask-bid/${code}` : null);

  // 🛠️ [더미 데이터 테스트용] : 아래 데이터를 주석 해제하면 더미 데이터로 테스트 가능
  
  // const sseData = {
  //   askp1: "5000", askRSQN1: "10",
  //   askp2: "5050", askRSQN2: "15",
  //   askp3: "5100", askRSQN3: "20",
  //   askp4: "5150", askRSQN4: "10",
  //   askp5: "5200", askRSQN5: "5",
  //   bidp1: "4950", bidRSQN1: "12",
  //   bidp2: "4900", bidRSQN2: "18",
  //   bidp3: "4850", bidRSQN3: "25",
  //   bidp4: "4800", bidRSQN4: "30",
  //   bidp5: "4750", bidRSQN5: "40",
  // };
  
  useEffect(() => {
    if (!sseData) return;

    let updatedOrders = [
      {
        id: 1,
        price: Number(sseData.askp1),
        sellVolume: Number(sseData.askRSQN1),
        buyVolume: 0,
      },
      {
        id: 2,
        price: Number(sseData.askp2),
        sellVolume: Number(sseData.askRSQN2),
        buyVolume: 0,
      },
      {
        id: 3,
        price: Number(sseData.askp3),
        sellVolume: Number(sseData.askRSQN3),
        buyVolume: 0,
      },
      {
        id: 4,
        price: Number(sseData.askp4),
        sellVolume: Number(sseData.askRSQN4),
        buyVolume: 0,
      },
      {
        id: 5,
        price: Number(sseData.askp5),
        sellVolume: Number(sseData.askRSQN5),
        buyVolume: 0,
      },
      {
        id: 6,
        price: Number(sseData.bidp1),
        sellVolume: 0,
        buyVolume: Number(sseData.bidRSQN1),
      },
      {
        id: 7,
        price: Number(sseData.bidp2),
        sellVolume: 0,
        buyVolume: Number(sseData.bidRSQN2),
      },
      {
        id: 8,
        price: Number(sseData.bidp3),
        sellVolume: 0,
        buyVolume: Number(sseData.bidRSQN3),
      },
      {
        id: 9,
        price: Number(sseData.bidp4),
        sellVolume: 0,
        buyVolume: Number(sseData.bidRSQN4),
      },
      {
        id: 10,
        price: Number(sseData.bidp5),
        sellVolume: 0,
        buyVolume: Number(sseData.bidRSQN5),
      },
    ];

    updatedOrders.sort((a, b) => b.price - a.price);

    const filteredOrders = updatedOrders.slice(1, -1);

    const centerIndex = Math.floor(filteredOrders.length / 2);
    const sellList = filteredOrders.slice(
      Math.max(0, centerIndex - 3),
      centerIndex
    );
    const buyList = filteredOrders.slice(
      centerIndex,
      Math.min(filteredOrders.length, centerIndex + 3)
    );

    setOrders(filteredOrders);
    setSellOrders(sellList);
    setBuyOrders(buyList);
  }, [sseData]);

  if (!code) {
    return <p className="text-center text-red-500">📢 종목 코드가 없습니다!</p>;
  }

  return (
    <div className="w-[90%] relative">
      <AnimatePresence>
        <ul className="flex flex-col items-center w-full">
          {orders.map((order, index) => (
            <motion.li
              key={order.id}
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{ scale: 1.0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="relative w-full flex justify-between items-center py-3 text-xs"
            >
              <span className="text-sm font-bold text-blue-500 w-14 text-right">
                {sellOrders.some((sell) => sell.price === order.price)
                  ? order.sellVolume.toLocaleString()
                  : ""}
              </span>

              <span className="text-lg font-bold text-black relative">
                {order.price.toLocaleString()}
              </span>

              <span className="text-sm font-bold text-red-500 w-14 text-left">
                {buyOrders.some((buy) => buy.price === order.price)
                  ? order.buyVolume.toLocaleString()
                  : ""}
              </span>
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
};

export default OrderBook;
