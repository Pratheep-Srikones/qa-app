/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AddAnswer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock question data (Replace with API fetch)
  const [question, setQuestion] = useState({
    id,
    title: "How does React handle state updates?",
    description:
      "React updates the state asynchronously and batches multiple state updates to improve performance.",
  });

  const [answer, setAnswer] = useState("");

  // Handle answer submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (answer.trim() === "") {
      alert("Answer cannot be empty.");
      return;
    }

    // Simulate API request (Replace with real API call)
    console.log(`Submitting answer: ${answer}`);

    // Redirect back to question page
    navigate(`/question/${id}`);
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
          <h1 className="text-3xl font-bold text-white">{question.title}</h1>

          {/* Question Description */}
          <p className="text-gray-300 mt-4">{question.description}</p>

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
