import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// import useSSE from "../../../hooks/useSSE";

const OrderBook = ({askBid}) => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [sellOrders, setSellOrders] = useState([]);
  const [buyOrders, setBuyOrders] = useState([]);
  const [totalSellVolume, setTotalSellVolume] = useState(0);
  const [totalBuyVolume, setTotalBuyVolume] = useState(0);

  useEffect(() => {
    if (!askBid) return;
    let updatedOrders = [
      {
        id: 1,
        price: Number(askBid.askp1),
        sellVolume: Number(askBid.askRSQN1),
        buyVolume: 0,
      },
      {
        id: 2,
        price: Number(askBid.askp2),
        sellVolume: Number(askBid.askRSQN2),
        buyVolume: 0,
      },
      {
        id: 3,
        price: Number(askBid.askp3),
        sellVolume: Number(askBid.askRSQN3),
        buyVolume: 0,
      },
      {
        id: 4,
        price: Number(askBid.askp4),
        sellVolume: Number(askBid.askRSQN4),
        buyVolume: 0,
      },
      {
        id: 5,
        price: Number(askBid.askp5),
        sellVolume: Number(askBid.askRSQN5),
        buyVolume: 0,
      },
      {
        id: 6,
        price: Number(askBid.bidp1),
        sellVolume: 0,
        buyVolume: Number(askBid.bidRSQN1),
      },
      {
        id: 7,
        price: Number(askBid.bidp2),
        sellVolume: 0,
        buyVolume: Number(askBid.bidRSQN2),
      },
      {
        id: 8,
        price: Number(askBid.bidp3),
        sellVolume: 0,
        buyVolume: Number(askBid.bidRSQN3),
      },
      {
        id: 9,
        price: Number(askBid.bidp4),
        sellVolume: 0,
        buyVolume: Number(askBid.bidRSQN4),
      },
      {
        id: 10,
        price: Number(askBid.bidp5),
        sellVolume: 0,
        buyVolume: Number(askBid.bidRSQN5),
      },
    ];

    updatedOrders.sort((a, b) => b.price - a.price);

    const centerIndex = Math.floor(updatedOrders.length / 2);
    const sellOrdersData = updatedOrders.slice(0, centerIndex);
    const buyOrdersData = updatedOrders.slice(centerIndex);

    setSellOrders(sellOrdersData);
    setBuyOrders(buyOrdersData);

    const totalSell = sellOrdersData.reduce(
      (acc, order) => acc + order.sellVolume,
      0
    );
    const totalBuy = buyOrdersData.reduce(
      (acc, order) => acc + order.buyVolume,
      0
    );

    setTotalSellVolume(totalSell);
    setTotalBuyVolume(totalBuy);
  }, [askBid]);

  if (!code) {
    return <p className="text-center text-red-500">종목 코드가 없습니다!</p>;
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <AnimatePresence>
        <ul className="flex flex-col w-full">
          {sellOrders.map((order) => (
            <motion.li
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between items-center py-2 text-red-500 font-bold"
            >
              <div className="w-1/3 flex items-center space-x-2 justify-end px-2">
                <motion.div
                  style={{
                    width: `${(order.sellVolume / totalSellVolume) * 100}%`,
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(order.sellVolume / totalSellVolume) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-2 bg-red-500 rounded"
                ></motion.div>
              </div>
              <span className="text-black text-center w-1/3 min-w-[60px] border-l border-r border-gray-300 px-2">
                {order.price.toLocaleString()}
              </span>
              <span className="text-red-500 w-1/3 min-w-[60px] px-2 ">
                {order.sellVolume.toLocaleString()}
              </span>
            </motion.li>
          ))}
          {buyOrders.map((order) => (
            <motion.li
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between items-center py-2 text-blue-500 font-bold"
            >
              <span className="text-blue-500 text-right w-1/3 min-w-[60px] px-2">
                {order.buyVolume.toLocaleString()}
              </span>
              <span className="text-black text-center w-1/3 min-w-[60px] border-l border-r border-gray-300 px-2">
                {order.price.toLocaleString()}
              </span>
              <div className="w-1/3 flex items-center space-x-2 px-2 ">
                <motion.div
                  style={{
                    width: `${(order.buyVolume / totalBuyVolume) * 100}%`,
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(order.buyVolume / totalBuyVolume) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-2 bg-blue-500 rounded"
                ></motion.div>
              </div>
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
};

export default OrderBook;
