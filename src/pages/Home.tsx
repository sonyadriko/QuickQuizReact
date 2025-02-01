import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 text-white">
      {/* Navbar */}
      <nav className="w-full bg-gray-900 py-4 fixed top-0">
        <div className="container mx-auto px-6">
          <h1 className="text-lg font-bold">Quick Quiz</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="bg-white text-black p-8 rounded-xl shadow-lg text-center w-96">
        <h1 className="text-2xl font-bold mb-4">Welcome to Quick Quiz</h1>
        <p className="mb-6">Test your knowledge and have fun with our quick and interactive quizzes!</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/game")}
            className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105"
          >
            Play Now
          </button>
          <button
            onClick={() => navigate("/highscores")}
            className="border-2 border-black text-black font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105"
          >
            View High Scores
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
