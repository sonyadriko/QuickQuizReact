import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type QuestionType = {
  question: string;
  options: string[];
  answer: string;
};

const Game: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch questions with error handling
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Add a delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.response_code !== 0 || !data.results || data.results.length === 0) {
          throw new Error("No questions available or invalid response from the API.");
        }

        // Format data
        const formattedQuestions = data.results.map((q: any) => ({
          question: decodeHTML(q.question),
          options: shuffleOptions([...q.incorrect_answers, q.correct_answer]),
          answer: decodeHTML(q.correct_answer),
        }));

        setQuestions(formattedQuestions);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Shuffle answer options using Fisher-Yates algorithm
  const shuffleOptions = (options: string[]) => {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  // Decode HTML entities
  const decodeHTML = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // Navigate to the end screen when all questions are answered
  useEffect(() => {
    if (currentQuestionIndex >= questions.length && questions.length > 0) {
      navigate(`/end?score=${score}`);
    }
  }, [currentQuestionIndex, questions, score, navigate]);

  // Handle answer selection
  const handleAnswerClick = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setCurrentQuestionIndex(questions.length); // Trigger the useEffect for navigation
    }
  };

  // Render loading, error, or game UI
  if (loading) return <p className="text-center text-lg">Loading questions...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (questions.length === 0) return <p className="text-center">No questions available.</p>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-6">Quiz Game</h1>
      <p className="text-center text-gray-700 mb-4">
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2
          className="text-xl font-semibold text-center mb-4"
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        />
      </div>
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Game;