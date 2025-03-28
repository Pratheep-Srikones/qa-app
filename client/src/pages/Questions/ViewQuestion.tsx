import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Bot } from "lucide-react";
import { useQuestionStore } from "../../store/useQuestionStore";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import { getTagsByQuestionId } from "../../services/question.service";
import { getAnswerByQuestionId } from "../../services/answer.services";
import { Answer } from "../../types/types";
import { getUserNameById } from "../../services/user.services";
import { formatTimeDifference } from "../../utils/format";

const QuestionDetail = () => {
  const { setTag, setSelectedAnswer } = useQuestionStore();
  const navigate = useNavigate();
  const handleTagSelection = (tag: string) => {
    setTag(tag);
    navigate(`/questions/tagged`);
  };

  const handleAnswerSelection = (answer: Answer) => {
    setSelectedAnswer(answer);
    navigate(`/answer/view`);
  };

  const { selectedQuestion } = useQuestionStore();
  const [tags, setTags] = useState<string[]>([]);
  const [authorName, setAuthorName] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTagsByQuestionId(
          selectedQuestion?.question_id as string
        );
        setTags(response.tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    const fetchAnswers = async () => {
      try {
        setLoading(true);
        const response = await getAnswerByQuestionId(
          selectedQuestion?.question_id as string
        );
        setAnswers(response.answers);
      } catch (error) {
        console.error("Error fetching answers:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAuthorName = async () => {
      try {
        const response = await getUserNameById(
          selectedQuestion?.user_id as string
        );
        setAuthorName(response.username);
      } catch (error) {
        console.error("Error fetching author name:", error);
      }
    };

    const fetchData = async () => {
      fetchTags();

      setTimeout(async () => {
        await fetchAnswers();
        setTimeout(() => {
          fetchAuthorName();
        }, 2000);
      }, 2000);
    };

    fetchData();
  }, [selectedQuestion]);

  if (!selectedQuestion) {
    return <Loading />;
  }

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
          <h1 className="text-3xl font-bold text-white">
            {selectedQuestion?.title}
          </h1>
          {/* User Name */}
          <p className="text-gray-400 mt-2">
            Asked by:{" "}
            <span className="text-purple-400 font-semibold">
              {authorName || ""}
            </span>
          </p>
          {/* Answer Count */}
          <p className="text-gray-400 mt-1">
            {answers ? answers.length : 0} Answers
          </p>

          {/* Question Description */}
          <p className="text-gray-300 mt-4">{selectedQuestion?.description}</p>
          {/* Tags Section */}
          <div className="mt-4">
            <div className="mt-4 flex gap-2 flex-wrap justify-center md:justify-start">
              {tags &&
                tags.map((tag) => (
                  <span
                    onClick={() => handleTagSelection(tag)}
                    key={tag}
                    className="px-3 py-1 bg-purple-700 text-white text-sm rounded-lg cursor-pointer hover:bg-purple-800 transition"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          </div>

          {/* Images */}
          {selectedQuestion?.image_urls &&
            selectedQuestion?.image_urls.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedQuestion?.image_urls.map((img, index) => (
                  <motion.img
                    key={index}
                    src={img}
                    alt="Question Related"
                    className="w-full h-auto rounded-lg shadow-md object-cover"
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </div>
            )}

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
                Sparc Bot Overview
              </h2>
            </div>

            {/* AI Answer Content */}
            <p className="text-gray-300 mt-3 leading-relaxed">
              {selectedQuestion?.ai_answer}
            </p>
          </motion.div>

          {/* User Answers */}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-white">User Answers</h2>
            {loading ? (
              <div>
                <p className="text-gray-400 text-center mt-4">
                  Loading answers
                  <motion.span
                    className="inline-block"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    ...
                  </motion.span>
                </p>
              </div>
            ) : (
              <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-2 rounded-lg">
                {answers && answers.length > 0 ? (
                  answers.map((answer) => (
                    <motion.div
                      key={answer.answer_id}
                      className="mt-4 p-4 bg-black/30 border border-gray-700 rounded-lg shadow-md transition-all duration-300 hover:bg-black/50"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleAnswerSelection(answer)}
                    >
                      {/* User Info */}
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-purple-400 font-semibold">
                          Answered {formatTimeDifference(answer.answered_at)}
                        </span>
                      </div>

                      {/* Answer Text */}
                      <p className="text-gray-300">{answer.answer}</p>

                      {/* Voting Section */}
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center mt-4">
                    No answers yet.
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#12012c] via-[#0a0a0a] to-[#25054d] opacity-80 blur-2xl"></div>
      </div>
    </>
  );
};

export default QuestionDetail;
