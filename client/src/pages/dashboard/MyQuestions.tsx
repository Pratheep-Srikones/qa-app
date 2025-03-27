import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { useQuestionStore } from "../../store/useQuestionStore";
import { useAuthStore } from "../../store/useAuthStore";
import Loading from "../../components/Loading";
import { formatDateTime } from "../../utils/format";
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
      <div className="relative min-h-screen bg-[#0a0a0a] p-6 flex items-center justify-center">
        {/* Background Gradient (Behind Content) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#12012c] via-[#0a0a0a] to-[#25054d] opacity-80 blur-2xl"></div>

        {/* Content */}
        <motion.div
          className="max-w-3xl mx-auto w-full relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
        >
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            My Questions
          </h1>

          {/* List of Questions */}
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
                  <motion.div
                    key={question.question_id}
                    className="p-4 bg-black/30 border border-gray-800 rounded-lg shadow-lg transition-all duration-300 hover:bg-black/50 hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.1 },
                    }}
                  >
                    <button
                      onClick={(e) => {
                        handleOpenQuestion(e, question);
                      }}
                      className="block"
                    >
                      <h2 className="text-lg font-semibold text-white">
                        {question.title}
                      </h2>
                      <div className="text-sm text-gray-400 mt-1 flex justify-between">
                        <span>{formatDateTime(question.asked_at, 2)}</span>
                        <span>{0} Answers</span>
                      </div>
                    </button>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-400 text-center">No questions found.</p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default MyQuestions;
