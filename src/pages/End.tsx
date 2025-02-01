import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface HighScore {
  name: string;
  score: number;
}

const MAX_HIGHSCORES = 10;

const End: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [latestScore, setLatestScore] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  useEffect(() => {
    // Ambil skor dari URL query string
    const scoreFromQuery = Number(searchParams.get("score")) || 0;
    setLatestScore(scoreFromQuery);

    // Ambil high scores dari localStorage
    const storedHighScores = JSON.parse(localStorage.getItem("highscores") || "[]");
    setHighScores(storedHighScores);
  }, [searchParams]);

  const handleSaveScore = () => {
    if (!username) return;

    const newScore: HighScore = { name: username, score: latestScore };
    const updatedHighScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_HIGHSCORES);

    localStorage.setItem("highscores", JSON.stringify(updatedHighScores));
    setHighScores(updatedHighScores);
    setUsername(""); // Bersihkan input
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-blue-500 text-white">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
        <p className="text-lg">Your Score:</p>
        <div className="text-4xl font-bold text-blue-600">{latestScore}</div>

        <input
          type="text"
          className="mt-4 w-full px-4 py-2 border rounded-lg text-black"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg font-bold disabled:bg-gray-400"
          onClick={handleSaveScore}
          disabled={!username}
        >
          Save Highscore
        </button>

        <button
          className="w-full bg-gray-700 text-white py-2 mt-3 rounded-lg"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>

        <h2 className="text-xl font-bold mt-6">High Scores</h2>
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
      </div>
    </div>
  );
};

export default End;
