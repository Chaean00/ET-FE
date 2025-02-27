import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OrderBook = () => {
  const initialOrders = [
    { id: 1, price: 422, sellVolume: 0, buyVolume: 0, type: "high" },
    { id: 2, price: 410, sellVolume: 304, buyVolume: 0, type: "sell" },
    { id: 3, price: 400, sellVolume: 2109, buyVolume: 0, type: "sell" },
    { id: 4, price: 399, sellVolume: 26709, buyVolume: 0, type: "sell" },
    { id: 5, price: 388, sellVolume: 0, buyVolume: 86, type: "center" },
    { id: 6, price: 387, sellVolume: 0, buyVolume: 50, type: "buy" },
    { id: 7, price: 386, sellVolume: 0, buyVolume: 25, type: "buy" },
    { id: 8, price: 346, sellVolume: 0, buyVolume: 0, type: "low" },
  ];

  const [orders, setOrders] = useState(initialOrders);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) => {
        let newOrders = prevOrders.map((order) => ({
          ...order,
          price: order.price + (Math.random() > 0.5 ? 1 : -1),
          sellVolume:
            order.type === "sell"
              ? Math.floor(Math.random() * 5000)
              : order.sellVolume,
          buyVolume:
            order.type === "buy"
              ? Math.floor(Math.random() * 5000)
              : order.buyVolume,
        }));
        return newOrders;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-48 bg-white p-2 rounded-md shadow-md">
      <AnimatePresence>
        <ul className="flex flex-col-reverse items-center">
          {orders.map((order, index) => (
            <motion.li
              key={index}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1.0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`w-full flex justify-between items-center px-2 py-1 text-sm ${
                order.type === "sell"
                  ? "text-red-500"
                  : order.type === "buy"
                  ? "text-blue-500"
                  : "text-black font-bold"
              } ${order.type === "center" ? "bg-gray-100 rounded-md" : ""}`}
            >
              <span
                className={`text-right w-12 ${
                  order.sellVolume > 0 ? "text-red-400" : "opacity-0"
                }`}
              >
                {order.sellVolume > 0 ? order.sellVolume.toLocaleString() : ""}
              </span>

              <span className="font-bold">{order.price}</span>

              <span
                className={`text-left w-12 ${
                  order.buyVolume > 0 ? "text-blue-400" : "opacity-0"
                }`}
              >
                {order.buyVolume > 0 ? order.buyVolume.toLocaleString() : ""}
              </span>
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
};

export default OrderBook;
