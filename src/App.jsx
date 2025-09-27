import React, { useState } from "react";
import quizData from "./assets/quizData";
import "./index.css";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleAnswerClick = (option) => {
    setSelectedOptions({ ...selectedOptions, [currentQuestion]: option });
  };

  const handleNextQuestion = () => {
    if (selectedOptions[currentQuestion] === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOptions({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              You scored {score} out of {quizData.length}!
            </h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={restartQuiz}
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Question {currentQuestion + 1}/{quizData.length}
            </h2>
            <p className="text-lg mb-6">{quizData[currentQuestion].question}</p>
            <div className="grid gap-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`p-3 rounded  text-left ${
                    selectedOptions[currentQuestion]
                    ? option === quizData[currentQuestion].answer
                    ? "bg-green-500 text-white":
                    selectedOptions[currentQuestion] === option
                        ?  "bg-red-500 text-white"
                        :"bg-gray-200"
                        : "bg-gray-200 hover:bg-gray-300 "
                  }`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedOptions[currentQuestion] !== undefined}
                >
                  {option}
                </button>
              ))}
            </div>

            <div
              className={`mt-4 ${
                currentQuestion >= 1
                  ? "flex justify-between"
                  : "flex justify-end"
              }`}
            >
              {currentQuestion > 0 && (
                <button
                  onClick={handlePreviousQuestion}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Previous
                </button>
              )}

              {selectedOptions[currentQuestion] && (
                <button
                  onClick={handleNextQuestion}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
