import { useNavigate } from "react-router-dom";
import { User, Mail, BarChart, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { useAuthStore } from "../../store/useAuthStore";
import { formatDateTime } from "../../utils/format";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currUser } = useAuthStore();

  // Hardcoded user data

  // State for animated counters

  // Animate numbers on mount

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#0a0a0a] text-white">
      <div className="z-30 fixed top-0 left-0 w-full">
        <Navbar />
      </div>
      <motion.div
        className="w-full max-w-lg p-8 space-y-6 bg-black/20 backdrop-blur-xl border border-gray-800 rounded-xl shadow-lg z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-purple-400 text-center neon-glow"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Profile Overview
        </motion.h1>

        {/* User Details */}
        <div className="space-y-4">
          <motion.div
            className="flex items-center gap-3 p-4 bg-gray-900/80 rounded-lg border border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <User size={24} className="text-purple-400" />
            <span className="text-lg">{currUser?.username}</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 p-4 bg-gray-900/80 rounded-lg border border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Mail size={24} className="text-purple-400" />
            <span className="text-lg">{currUser?.email}</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 p-4 bg-gray-900/80 rounded-lg border border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <BarChart size={24} className="text-purple-400" />
            <span className="text-lg">
              Member since: {formatDateTime(currUser?.created_at || "", 5)}
            </span>
          </motion.div>
        </div>

        {/* Change Password Button */}
        <motion.button
          onClick={() => navigate("/change-password")}
          className="w-full py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 text-white flex items-center justify-center gap-2 shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Change Password <ChevronRight size={20} />
        </motion.button>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#12012c] via-[#0a0a0a] to-[#25054d] opacity-80 blur-2xl h-full"></div>
    </div>
  );
};

export default ProfilePage;
