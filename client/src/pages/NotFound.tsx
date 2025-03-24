import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#12012c] via-[#0a0a0a] to-[#25054d] opacity-80 blur-2xl"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        <h1 className="text-5xl font-bold text-purple-400">404</h1>
        <p className="mt-2 text-lg text-gray-400">Page Not Found</p>

        {/* Animated Redirecting Text */}
        <motion.p
          className="mt-4 text-md text-purple-300"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Redirecting to home...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
