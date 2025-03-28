import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useQuestionStore } from "../../store/useQuestionStore";
import { useEffect, useState } from "react";
import { Question, TopTags } from "../../types/types";
import { toastError } from "../../utils/toast";
import { getTopTags } from "../../services/tag.services";
import { formatTimeDifference } from "../../utils/format";

const Home = () => {
  const { setTag, fetchQuestionsBySearchTerm } = useQuestionStore();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    isFetchingQuestions,
    fetchLatestQuestions,
    fetchedQuestions,
    setSelectedQuestion,
  } = useQuestionStore();
  const [topTags, setTopTags] = useState<TopTags[]>([]);
  const navigate = useNavigate();
  const handleTagSelection = (tag: string) => {
    setTag(tag);
    navigate(`/questions/tagged`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchLatestQuestions();
        setTimeout(async () => {
          const topTagsResponse = await getTopTags();
          setTopTags(topTagsResponse.tags);
        }, 1000);
      } catch (error) {
        console.error("Error while fetching questions:", error);
        toastError("Error while fetching questions");
      }
    };

    fetchData();
  }, [fetchLatestQuestions]);

  useEffect(() => {
    if (searchTerm && searchTerm !== "") {
      const timer = setTimeout(() => {
        fetchQuestionsBySearchTerm(searchTerm);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount or when searchTerm changes
    }
    if (searchTerm === "") {
      const timer = setTimeout(() => {
        fetchLatestQuestions();
      }, 1000);

      return () => clearTimeout(timer); // Fetch latest questions if search term is empty
    }
  }, [searchTerm, fetchQuestionsBySearchTerm, fetchLatestQuestions]);

  const handleNavigation = (question: Question) => {
    setSelectedQuestion(question);
    navigate(`/question`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
      <div className="z-30 fixed top-0 left-0 w-full mb-10">
        <Navbar />
      </div>
      <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10 mt-20 z-20">
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search for questions..."
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Questions Feed */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center md:text-left">
            {searchTerm && searchTerm !== ""
              ? `Search Results for "${searchTerm}"`
              : "Latest Questions"}
          </h2>
          {isFetchingQuestions ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500 border-solid"></div>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {fetchedQuestions &&
                fetchedQuestions.map((question) => (
                  <button
                    onClick={() => handleNavigation(question)}
                    key={question.question_id}
                    className="block p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all w-full max-w-2xl mx-auto md:max-w-full"
                  >
                    <h3 className="text-lg font-semibold text-left">
                      {question.title}
                    </h3>
                    {/* Meta Information */}
                    <div className="text-sm text-gray-400 mt-1 flex justify-between items-center">
                      <span>
                        {question.description.split(" ").slice(0, 3).join(" ")}
                        ...
                      </span>
                      <span className="text-[#7d0cff] font-medium">
                        {formatTimeDifference(question.asked_at)}
                      </span>
                    </div>
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
            {topTags &&
              topTags.map((tag) => (
                <span
                  onClick={() => handleTagSelection(tag.tag)}
                  key={tag.tag}
                  className="px-3 py-1 bg-purple-700 text-white text-sm rounded-lg cursor-pointer hover:bg-purple-800 transition"
                >
                  #{tag.tag} ({tag.count})
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
