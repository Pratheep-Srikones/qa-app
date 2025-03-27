import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useQuestionStore } from "../../store/useQuestionStore";
import Loading from "../../components/Loading";
import { useEffect } from "react";
import { Question } from "../../types/types";
import { toastError } from "../../utils/toast";

const Home = () => {
  const {
    isFetchingQuestions,
    fetchLatestQuestions,
    fetchedQuestions,
    setSelectedQuestion,
  } = useQuestionStore();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        await fetchLatestQuestions();
      } catch (error) {
        console.error("Error while fetching questions:", error);
        toastError("Error while fetching questions");
      }
    };

    fetchQuestions();
  }, [fetchLatestQuestions]);

  const handleNavigation = (question: Question) => {
    setSelectedQuestion(question);
    navigate(`/question`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
      <div className="z-30 fixed top-0 left-0 w-full">
        <Navbar />
      </div>
      <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10 mt-6 z-20">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-400 neon-glow">
            Who Asked?
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            A futuristic Q&A platform for developers & enthusiasts.
          </p>
          <Link
            to="/ask"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300"
          >
            Ask a Question
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mt-10 max-w-2xl mx-auto w-full">
          <input
            type="text"
            placeholder="Search for questions..."
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Questions Feed */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center md:text-left">
            Latest Questions
          </h2>
          {isFetchingQuestions ? (
            <Loading />
          ) : (
            <div className="mt-4 space-y-4">
              {fetchedQuestions &&
                fetchedQuestions.map((question) => (
                  <button
                    onClick={() => handleNavigation(question)}
                    key={question.question_id}
                    className="block p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all w-full max-w-2xl mx-auto md:max-w-full"
                  >
                    <h3 className="text-lg font-semibold">{question.title}</h3>
                    <p className="text-gray-400 text-sm">
                      3 answers • 15 votes
                    </p>
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Popular Tags */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center md:text-left">
            Popular Tags
          </h2>
          <div className="mt-4 flex gap-2 flex-wrap justify-center md:justify-start">
            {["JavaScript", "Next.js", "AI", "Web3"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-700 text-white text-sm rounded-lg cursor-pointer hover:bg-purple-800 transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#12012c] via-[#0a0a0a] to-[#25054d] opacity-80 blur-2xl h-full"></div>
    </div>
  );
};

export default Home;
