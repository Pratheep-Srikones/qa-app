import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#12012c] via-[#0a0a0a] to-[#25054d] opacity-80 blur-2xl"></div>

      {/* Loading Container */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
      >
        {/* Glowing Rings */}
        <motion.div
          className="relative w-16 h-16 border-4 border-purple-500 rounded-full animate-spin"
          style={{
            borderTopColor: "transparent",
            animationDuration: "1.2s",
          }}
        ></motion.div>

        {/* Pulsing Text */}
        <motion.p
          className="mt-4 text-xl font-semibold text-purple-400"
          animate={{
            opacity: [0.4, 1, 0.4],
            transition: { duration: 1.5, repeat: Infinity },
          }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loading;
