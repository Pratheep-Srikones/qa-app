/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const MyQuestions = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How does React handle state updates?",
      date: "March 14, 2025",
      answers: 5,
    },
    {
      id: 2,
      title: "What is the difference between useEffect and useLayoutEffect?",
      date: "March 12, 2025",
      answers: 3,
    },
    {
      id: 3,
      title: "How to optimize a large-scale React application?",
      date: "March 10, 2025",
      answers: 8,
    },
  ]);

  useEffect(() => {
    // Fetch user's questions from API (replace with real API call)
    // fetch("/api/my-questions")
    //   .then(res => res.json())
    //   .then(data => setQuestions(data))
    //   .catch(err => console.error("Error fetching questions:", err));
  }, []);

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
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
          >
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  className="p-4 bg-black/30 border border-gray-800 rounded-lg shadow-lg transition-all duration-300 hover:bg-black/50 hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  }}
                >
                  <Link to={`/question/${question.id}`} className="block">
                    <h2 className="text-lg font-semibold text-white">
                      {question.title}
                    </h2>
                    <div className="text-sm text-gray-400 mt-1 flex justify-between">
                      <span>{question.date}</span>
                      <span>{question.answers} Answers</span>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No questions found.</p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default MyQuestions;
