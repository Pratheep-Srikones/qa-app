import { useState } from "react";
import { XCircle, PlusCircle, CloudUpload } from "lucide-react";
import Navbar from "../../components/Navbar";

const AskQuestion = () => {
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    images: [] as File[],
    tagInput: "",
    tags: [] as string[],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(e.target.files)],
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleAddTag = () => {
    if (
      formData.tagInput.trim() &&
      !formData.tags.includes(formData.tagInput.trim())
    ) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.tagInput.trim()],
        tagInput: "",
      });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#0a0a0a] text-white">
      <div className="z-30 fixed top-0 left-0 w-full">
        <Navbar />
      </div>
      <div className="w-full max-w-3xl p-8 space-y-6 bg-black/20 backdrop-blur-xl border border-gray-800 rounded-xl shadow-lg z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-400 text-center neon-glow">
          Ask a New Question
        </h1>

        {/* Question Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Question
          </label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            className="w-full px-4 py-3 mt-1 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your question..."
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-3 mt-1 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 h-32"
            placeholder="Provide more details..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Upload Images
          </label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full px-3 py-2 bg-gray-900 text-gray-400 rounded-lg border border-gray-700 cursor-pointer focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition-all"
            >
              <CloudUpload size={20} />
            </button>
          </div>
        </div>

        {/* Display Added Images */}
        {formData.images.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-2">
            {formData.images.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover rounded-lg border border-gray-700"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 p-1 rounded-full text-white"
                >
                  <XCircle size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tags Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Tags
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="tagInput"
              value={formData.tagInput}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500"
              placeholder="e.g. JavaScript, React, AI"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition-all"
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>

        {/* Display Added Tags */}
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-2 bg-purple-800/50 text-purple-300 px-3 py-1 rounded-lg"
              >
                {tag}
                <button onClick={() => handleRemoveTag(tag)}>
                  <XCircle
                    size={16}
                    className="hover:text-red-500 transition-all"
                  />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button className="w-full py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 text-white shadow-md">
          Submit Question
        </button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#12012c] via-[#0a0a0a] to-[#25054d] opacity-80 blur-2xl h-full"></div>
    </div>
  );
};

export default AskQuestion;
