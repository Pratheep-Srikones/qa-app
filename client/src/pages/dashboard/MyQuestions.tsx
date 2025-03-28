import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { useQuestionStore } from "../../store/useQuestionStore";
import { useAuthStore } from "../../store/useAuthStore";
import Loading from "../../components/Loading";
import { formatTimeDifference } from "../../utils/format";
import { Question } from "../../types/types";
import { useNavigate } from "react-router-dom";

const MyQuestions = () => {
  const {
    fetchQuestionsByUser,
    fetchedQuestions,
    isFetchingQuestions,
    setSelectedQuestion,
  } = useQuestionStore();
  const { currUser } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (currUser) {
      fetchQuestionsByUser(currUser.user_id);
    }
  }, [currUser, fetchQuestionsByUser]);

  function handleOpenQuestion(
    event: React.MouseEvent<HTMLButtonElement>,
    question: Question
  ): void {
    event.preventDefault();
    setSelectedQuestion(question);
    navigate(`/question`);
  }

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-10">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#12012c] via-[#0a0a0a] to-[#25054d] opacity-80 blur-2xl h-full"></div>

        {/* Neon Glow Overlay */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute inset-0 bg-[#7d0cff] opacity-10 blur-[100px]"></div>
        </div>

        {/* Content Container */}
        <motion.div
          className="relative z-10 w-full max-w-3xl p-6 bg-black/30 border border-gray-700 rounded-2xl shadow-2xl backdrop-blur-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        >
          <h1 className="text-4xl text-white text-center mb-6">My Questions</h1>

          {/* Scrollable Questions Container */}
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-2">
            {isFetchingQuestions ? (
              <Loading />
            ) : (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
              >
                {fetchedQuestions && fetchedQuestions.length > 0 ? (
                  fetchedQuestions.map((question, index) => (
                    <button
                      onClick={(e) => handleOpenQuestion(e, question)}
                      className="block w-full text-left"
                    >
                      <motion.div
                        key={question.question_id}
                        className="p-5 bg-black/40 border border-gray-700 rounded-lg shadow-md transition-all duration-300 
                                 hover:bg-black/60 hover:shadow-lg hover:border-[#7d0cff] relative group"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: index * 0.1 },
                        }}
                      >
                        {/* Question Title */}
                        <h2 className="text-xl font-semibold text-white group-hover:text-[#7d0cff] transition-colors">
                          {question.title}
                        </h2>

                        {/* Meta Information */}
                        <div className="text-sm text-gray-400 mt-1 flex justify-between items-center">
                          <span>
                            {question.description
                              .split(" ")
                              .slice(0, 3)
                              .join(" ")}
                            ...
                          </span>
                          <span className="text-[#7d0cff] font-medium">
                            {formatTimeDifference(question.asked_at)}
                          </span>
                        </div>

                        {/* Neon Glow Effect */}
                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 bg-[#7d0cff]/20 blur-md"></div>
                      </motion.div>
                    </button>
                  ))
                ) : (
                  <p className="text-gray-400 text-center">
                    No questions found.
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #7d0cff;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default MyQuestions;
