/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useQuestionStore } from "../../store/useQuestionStore";
import { useAuthStore } from "../../store/useAuthStore";
import { addAnswer } from "../../services/answer.services";
import { toastError, toastSuccess } from "../../utils/toast";

const AddAnswer = () => {
  const navigate = useNavigate();

  const { selectedQuestion } = useQuestionStore();
  const { currUser } = useAuthStore();

  const [answer, setAnswer] = useState("");

  // Handle answer submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (answer.trim() === "") {
      alert("Answer cannot be empty.");
      return;
    }

    try {
      if (!selectedQuestion?.question_id) {
        toastError("No question selected.");
        return;
      }
      if (!currUser?.user_id) {
        toastError("No user logged in.");
        return;
      }
      await addAnswer(selectedQuestion?.question_id, answer, currUser?.user_id);
      toastSuccess("Answer submitted successfully!");
      navigate("/question");
    } catch (error) {
      console.error("Error submitting answer:", error);
      toastError("Failed to submit answer. Please try again.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen bg-[#0a0a0a] p-6 flex items-center justify-center">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#12012c] via-[#0a0a0a] to-[#25054d] opacity-80 blur-2xl -z-10"></div>

        <motion.div
          className="max-w-3xl mx-auto w-full bg-black/30 border border-gray-800 rounded-lg p-6 shadow-lg relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
        >
          {/* Question Title */}
          <h1 className="text-3xl font-bold text-white">
            {selectedQuestion?.title}
          </h1>

          {/* Question Description */}
          <p className="text-gray-300 mt-4">{selectedQuestion?.description}</p>

          {/* Answer Input */}
          <form onSubmit={handleSubmit} className="mt-6">
            <textarea
              className="w-full bg-black/50 border border-gray-700 text-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-purple-500"
              rows={5}
              placeholder="Write your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-semibold transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Submit Answer
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default AddAnswer;
