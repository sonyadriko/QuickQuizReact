import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HighScore {
  name: string;
  score: number;
}

const HighScores: React.FC = () => {
  const navigate = useNavigate();
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  useEffect(() => {
    // Ambil high scores dari localStorage
    const storedHighScores = JSON.parse(localStorage.getItem("highscores") || "[]");
    setHighScores(storedHighScores);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-blue-500 text-white">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-4">High Scores</h1>

        <ul className="mt-4 w-full text-left">
          {highScores.length > 0 ? (
            highScores.map((score, index) => (
              <li
                key={index}
                className="flex justify-between bg-gray-100 px-4 py-2 rounded-lg mb-2"
              >
                <span>{score.name}</span>
                <span className="font-bold">{score.score}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No high scores yet.</p>
          )}
        </ul>

        <button
          className="w-full bg-gray-700 text-white py-2 mt-6 rounded-lg"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default HighScores;
