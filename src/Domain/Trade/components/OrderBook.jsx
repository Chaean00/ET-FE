import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OrderBook = () => {
  const initialOrders = [
    { id: 1, price: 422, sellVolume: 3200, buyVolume: 0 },
    { id: 2, price: 410, sellVolume: 400, buyVolume: 0 },
    { id: 3, price: 400, sellVolume: 2500, buyVolume: 0 },
    { id: 4, price: 399, sellVolume: 1000, buyVolume: 0 },
    { id: 5, price: 388, sellVolume: 0, buyVolume: 1800 },
    { id: 6, price: 387, sellVolume: 0, buyVolume: 700 },
    { id: 7, price: 386, sellVolume: 0, buyVolume: 1200 },
    { id: 8, price: 346, sellVolume: 0, buyVolume: 0 },
  ];

  const [orders, setOrders] = useState(initialOrders);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) => {
        let newOrders = prevOrders.map((order) => ({
          ...order,
          price: order.price + (Math.random() > 0.5 ? 1 : -1),
          sellVolume:
            order.price > 390
              ? Math.floor(Math.random() * 5000)
              : order.sellVolume,
          buyVolume:
            order.price < 390
              ? Math.floor(Math.random() * 5000)
              : order.buyVolume,
        }));

        return newOrders.sort((a, b) => b.price - a.price);
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const centerIndex = Math.floor(orders.length / 2);
  const sellVolumes = orders.slice(Math.max(0, centerIndex - 3), centerIndex);
  const buyVolumes = orders.slice(
    centerIndex,
    Math.min(orders.length, centerIndex + 3)
  );

  return (
    <div className="w-[90%] relative ">
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
              {index === 0 && (
                <span className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  상한가
                </span>
              )}

              <span className="text-sm font-bold text-blue-500 w-14 text-right">
                {sellVolumes.includes(order) && order.sellVolume > 0
                  ? order.sellVolume.toLocaleString()
                  : ""}
              </span>

              <span
                className={`text-lg font-bold ${
                  index === 0
                    ? "text-red-500"
                    : index === orders.length - 1
                    ? "text-blue-500 mt-5"
                    : "text-black"
                } relative`}
              >
                {order.price}

                {index === centerIndex - 1 && (
                  <span className="absolute right-[-40px] bg-red-500 text-white text-xs px-2 py-1 rounded">
                    고
                  </span>
                )}

                {index === centerIndex && (
                  <span className="absolute right-[-40px] bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    저
                  </span>
                )}
              </span>

              <span className="text-sm font-bold text-red-500 w-14 text-left">
                {buyVolumes.includes(order) && order.buyVolume > 0
                  ? order.buyVolume.toLocaleString()
                  : ""}
              </span>

              {index === orders.length - 1 && (
                <span className="mt-5 absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  하한가
                </span>
              )}
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
};

export default OrderBook;
