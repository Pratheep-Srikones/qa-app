import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, BarChart, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";

const ProfilePage = () => {
  const navigate = useNavigate();

  // Hardcoded user data
  const user = {
    username: "CyberWarrior",
    email: "cyberwarrior@example.com",
    questionsAsked: 23,
    answersProvided: 45,
    upvotes: 128,
    downvotes: 8,
    memberSince: "March 2023",
  };

  // State for animated counters
  const [counts, setCounts] = useState({
    questions: 0,
    answers: 0,
    upvotes: 0,
    downvotes: 0,
  });

  // Animate numbers on mount
  useEffect(() => {
    const animateCount = (key: keyof typeof counts, value: number) => {
      let start = 0;
      const duration = 1000; // Animation duration in ms
      const increment = Math.ceil(value / (duration / 30)); // Calculate increment steps

      const interval = setInterval(() => {
        start += increment;
        if (start >= value) {
          start = value;
          clearInterval(interval);
        }
        setCounts((prev) => ({ ...prev, [key]: start }));
      }, 30);
    };

    animateCount("questions", user.questionsAsked);
    animateCount("answers", user.answersProvided);
    animateCount("upvotes", user.upvotes);
    animateCount("downvotes", user.downvotes);
  }, []);

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
            <span className="text-lg">{user.username}</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 p-4 bg-gray-900/80 rounded-lg border border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Mail size={24} className="text-purple-400" />
            <span className="text-lg">{user.email}</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 p-4 bg-gray-900/80 rounded-lg border border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <BarChart size={24} className="text-purple-400" />
            <span className="text-lg">Member since: {user.memberSince}</span>
          </motion.div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Questions Asked", count: counts.questions },
            { label: "Answers Provided", count: counts.answers },
            { label: "Upvotes", count: counts.upvotes },
            { label: "Downvotes", count: counts.downvotes },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-4 bg-purple-800/50 rounded-lg border border-purple-600 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <h3 className="text-2xl font-bold">{stat.count}</h3>
              <p className="text-sm text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
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
