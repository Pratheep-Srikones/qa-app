import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
import Navbar from "../../components/Navbar";
import { useQuestionStore } from "../../store/useQuestionStore";
import { formatDateTime } from "../../utils/format";
import { useEffect, useState } from "react";
import { getUserNameById } from "../../services/user.services";

const SingleAnswerPage = () => {
  const { selectedAnswer } = useQuestionStore();
  const [authorName, setAuthorName] = useState<string>("");

  useEffect(() => {
    const fetchAuthorName = async () => {
      try {
        const response = await getUserNameById(
          selectedAnswer?.user_id as string
        );
        setAuthorName(response.username);
      } catch (error) {
        console.error("Error fetching author name:", error);
      }
    };
    fetchAuthorName();
  });
  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen bg-[#0a0a0a] p-6 flex items-center justify-center">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#12012c] via-[#0a0a0a] to-[#25054d] opacity-80 blur-2xl"></div>

        {/* Answer Card */}
        <motion.div
          className="max-w-2xl mx-auto w-full relative z-10 bg-black/30 border border-gray-700 rounded-lg shadow-md p-6 transition-all duration-300 hover:bg-black/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
        >
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-purple-400 font-semibold">
              {authorName || ""}
            </span>
            <span className="text-gray-500 text-sm">
              {formatDateTime(selectedAnswer?.answered_at || "", 2)}
            </span>
          </div>

          {/* Answer Text */}
          <p className="text-gray-300">{selectedAnswer?.answer}</p>

          {/* Voting Section */}
          <div className="flex justify-between mt-4">
            <div className="flex items-center space-x-2">
              <button className="flex items-center text-green-400 hover:text-green-300 transition-all">
                <ArrowUp size={18} />
                <span className="ml-1">{selectedAnswer?.upvotes}</span>
              </button>
              <button className="flex items-center text-red-400 hover:text-red-300 transition-all">
                <ArrowDown size={18} />
                <span className="ml-1">{selectedAnswer?.downvotes}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SingleAnswerPage;
