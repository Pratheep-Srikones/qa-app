/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ArrowUp, ArrowDown, Bot } from "lucide-react";

const QuestionDetail = () => {
  const { id } = useParams();

  // Mock data for the question
  const [question, setQuestion] = useState({
    id,
    title: "How does React handle state updates?",
    description:
      "React updates the state asynchronously and batches multiple state updates to improve performance.",
    images: ["https://picsum.photos/200", "https://picsum.photos/200"],
    answers: [
      {
        id: 1,
        content:
          "React batches multiple state updates to optimize re-rendering.",
        upvotes: 12,
        downvotes: 2,
      },
      {
        id: 2,
        content: "State updates in React are scheduled asynchronously.",
        upvotes: 8,
        downvotes: 1,
      },
    ],
  });

  const [aiAnswer, setAiAnswer] = useState(
    "React batches multiple state updates and uses a virtual DOM to efficiently update UI components."
  );

  // Fetch question details (Replace this with API call)
  useEffect(() => {
    // fetch(`/api/questions/${id}`)
    //   .then(res => res.json())
    //   .then(data => setQuestion(data))
    //   .catch(err => console.error("Error fetching question:", err));
  }, [id]);

  const handleUpvote = (index: number) => {
    setQuestion((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[index].upvotes += 1;
      return { ...prev, answers: newAnswers };
    });
  };

  const handleDownvote = (index: number) => {
    setQuestion((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[index].downvotes += 1;
      return { ...prev, answers: newAnswers };
    });
  };

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen bg-[#0a0a0a] p-6 flex items-center justify-center mt-10">
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
          {/* User Name */}
          <p className="text-gray-400 mt-2">
            Asked by:{" "}
            <span className="text-purple-400 font-semibold">User123</span>
          </p>
          {/* Answer Count */}
          <p className="text-gray-400 mt-1">
            {question.answers.length} Answers
          </p>

          {/* Question Description */}
          <p className="text-gray-300 mt-4">{question.description}</p>

          {/* Images */}
          <div className="mt-4 flex space-x-4">
            {question.images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt="Question Related"
                className="w-1/2 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>

          {/* Add Answer Button */}
          <Link to={`/answer`}>
            <motion.button
              className="mt-6 w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition-all duration-300 font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              Add an Answer
            </motion.button>
          </Link>

          {/* AI Answer Section */}
          <motion.div
            className="relative mt-6 p-5 bg-black/60 border border-purple-500 rounded-lg shadow-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            {/* Glowing Neon Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700/30 via-purple-900/30 to-purple-500/20 blur-lg opacity-60 -z-10" />

            {/* AI Header with Icon */}
            <div className="flex items-center space-x-3">
              <Bot size={28} className="text-purple-400 animate-pulse" />
              <h2 className="text-xl font-bold text-purple-400 tracking-wider">
                AI Answer
              </h2>
            </div>

            {/* AI Answer Content */}
            <p className="text-gray-300 mt-3 leading-relaxed">{aiAnswer}</p>
          </motion.div>

          {/* User Answers */}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-white">User Answers</h2>
            {question.answers.length > 0 ? (
              question.answers.map((answer, index) => (
                <motion.div
                  key={answer.id}
                  className="mt-4 p-4 bg-black/30 border border-gray-700 rounded-lg shadow-md transition-all duration-300 hover:bg-black/50"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* User Info */}
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-purple-400 font-semibold">
                      User{answer.id}
                    </span>
                  </div>

                  {/* Answer Content */}
                  <p className="text-gray-300">{answer.content}</p>

                  {/* Upvote/Downvote */}
                  <div className="flex justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpvote(index)}
                        className="flex items-center text-green-400 hover:text-green-300 transition-all"
                      >
                        <ArrowUp size={18} />
                        <span className="ml-1">{answer.upvotes}</span>
                      </button>
                      <button
                        onClick={() => handleDownvote(index)}
                        className="flex items-center text-red-400 hover:text-red-300 transition-all"
                      >
                        <ArrowDown size={18} />
                        <span className="ml-1">{answer.downvotes}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 text-center mt-4">No answers yet.</p>
            )}
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#12012c] via-[#0a0a0a] to-[#25054d] opacity-80 blur-2xl"></div>
      </div>
    </>
  );
};

export default QuestionDetail;
