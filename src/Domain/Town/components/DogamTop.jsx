import { motion } from "framer-motion";

const DogamTop = ({ children }) => {
  return (
    <motion.div
      className="font-town text-6xl font-black text-center"
      style={{
        WebkitTextStroke: "2.75px black",
        WebkitTextFillColor: "white",
      }}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default DogamTop;
