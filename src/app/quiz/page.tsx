"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, Award } from "lucide-react";

const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    explanation: "Paris is the capital and most populous city of France.",
  },
  {
    id: 2,
    question: "Which of these is a JavaScript framework?",
    options: ["Django", "Laravel", "React", "Spring Boot"],
    correctAnswer: 2,
    explanation:
      "React is a JavaScript library for building user interfaces, commonly referred to as a framework.",
  },
  {
    id: 3,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: 2,
    explanation:
      "CSS stands for Cascading Style Sheets, used for describing the presentation of web pages.",
  },
  {
    id: 4,
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    correctAnswer: 2,
    explanation:
      "<h1> is the HTML tag used for the largest and most important heading.",
  },
  {
    id: 5,
    question: "What is the output of: console.log(typeof null) in JavaScript?",
    options: ["null", "undefined", "object", "string"],
    correctAnswer: 2,
    explanation:
      "In JavaScript, typeof null returns 'object', which is a known historical bug in the language.",
  },
];

type QuizState = {
  currentQuestion: number;
  answers: (number | null)[];
  showResults: boolean;
  timeSpent: number;
};

function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: Array(quizData.length).fill(null),
    showResults: false,
    timeSpent: 0,
  });

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start timer when component mounts
    const timerId = setInterval(() => {
      setQuizState((prev) => ({ ...prev, timeSpent: prev.timeSpent + 1 }));
    }, 1000);
    setTimer(timerId);

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, []); // Empty dependency array to run only on mount

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = answerIndex;
    setQuizState((prev) => ({ ...prev, answers: newAnswers }));
  };

  const handleNext = () => {
    if (quizState.currentQuestion < quizData.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    }
  };

  const handlePrevious = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  const handleSubmit = () => {
    if (timer) {
      clearInterval(timer);
    }
    setQuizState((prev) => ({ ...prev, showResults: true }));
  };

  const handleRestart = () => {
    // Clear existing timer
    if (timer) {
      clearInterval(timer);
    }

    setQuizState({
      currentQuestion: 0,
      answers: Array(quizData.length).fill(null),
      showResults: false,
      timeSpent: 0,
    });

    // Start new timer
    const timerId = setInterval(() => {
      setQuizState((prev) => ({ ...prev, timeSpent: prev.timeSpent + 1 }));
    }, 1000);
    setTimer(timerId);
  };

  const calculateScore = () => {
    return quizState.answers.reduce((score, answer, index) => {
      // Add null check for answer
      if (answer === null) return score;
      return answer === quizData[index]?.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestionData = quizData[quizState.currentQuestion];
  const score = calculateScore();
  const percentage = Math.round((score / quizData.length) * 100);

  // Safe progress value calculation
  const progressValue =
    quizData.length > 0
      ? ((quizState.currentQuestion + 1) / quizData.length) * 100
      : 0;

  if (quizState.showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <Award className="h-16 w-16 text-yellow-500" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                Quiz Completed!
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Here's how you performed
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {score}/{quizData.length}
                  </div>
                  <div className="text-gray-600">Correct Answers</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {percentage}%
                  </div>
                  <div className="text-gray-600">Score</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {formatTime(quizState.timeSpent)}
                  </div>
                  <div className="text-gray-600">Time Spent</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Detailed Results
                </h3>
                {quizData.map((question, index) => {
                  const userAnswer = quizState.answers[index];
                  const isCorrect = userAnswer === question.correctAnswer;

                  return (
                    <Card
                      key={question.id}
                      className={`border-l-4 ${
                        isCorrect ? "border-l-green-500" : "border-l-red-500"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">
                            Q{index + 1}: {question.question}
                          </h4>
                          <Badge
                            variant={isCorrect ? "default" : "destructive"}
                            className="ml-2"
                          >
                            {isCorrect ? (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {isCorrect ? "Correct" : "Incorrect"}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-3">
                          {question.options.map((option, optIndex) => {
                            const isUserAnswer = optIndex === userAnswer;
                            const isCorrectAnswer =
                              optIndex === question.correctAnswer;

                            return (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-md border ${
                                  isCorrectAnswer
                                    ? "bg-green-50 border-green-200 text-green-800"
                                    : isUserAnswer && !isCorrect
                                    ? "bg-red-50 border-red-200 text-red-800"
                                    : "bg-gray-50 border-gray-200"
                                }`}
                              >
                                {option}
                                {isCorrectAnswer && (
                                  <CheckCircle2 className="h-4 w-4 inline ml-2" />
                                )}
                                {isUserAnswer && !isCorrect && (
                                  <XCircle className="h-4 w-4 inline ml-2" />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {!isCorrect && (
                          <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                            <p className="text-sm text-blue-800 font-medium">
                              Explanation:
                            </p>
                            <p className="text-sm text-blue-700">
                              {question.explanation}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleRestart}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  Take Quiz Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Early return if no current question data
  if (!currentQuestionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Quiz Error</CardTitle>
            <CardDescription>
              Unable to load quiz questions. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleRestart} className="w-full">
              Restart Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader className="border-b bg-white rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  MCQ Knowledge Quiz
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Test your knowledge with these multiple choice questions
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(quizState.timeSpent)}
                </Badge>
                <Badge variant="outline">
                  Question {quizState.currentQuestion + 1} of {quizData.length}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Progress Bar */}
            <div className="mb-8">
              <Progress value={progressValue} className="h-2 bg-gray-200" />
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Q{quizState.currentQuestion + 1}: {currentQuestionData.question}
              </h2>
              <p className="text-gray-600 text-sm">
                Select the correct answer from the options below
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestionData.options.map((option, index) => {
                const isSelected =
                  quizState.answers[quizState.currentQuestion] === index;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 text-blue-900 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                          isSelected
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-400"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                onClick={handlePrevious}
                disabled={quizState.currentQuestion === 0}
                variant="outline"
                className="px-6"
              >
                Previous
              </Button>

              {quizState.currentQuestion === quizData.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={
                    quizState.answers[quizState.currentQuestion] === null
                  }
                  className="bg-green-600 hover:bg-green-700 px-8"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={
                    quizState.answers[quizState.currentQuestion] === null
                  }
                  className="bg-blue-600 hover:bg-blue-700 px-8"
                >
                  Next Question
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">
              {quizState.answers.filter((answer) => answer !== null).length}
            </div>
            <div className="text-sm text-gray-600">Answered</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-gray-600">
              {quizData.length -
                quizState.answers.filter((answer) => answer !== null).length}
            </div>
            <div className="text-sm text-gray-600">Remaining</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">
              {quizState.answers.reduce(
                (count, answer, index) =>
                  answer !== null && answer === quizData[index]?.correctAnswer
                    ? count + 1
                    : count,
                0
              )}
            </div>
            <div className="text-sm text-gray-600">Correct So Far</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(progressValue)}%
            </div>
            <div className="text-sm text-gray-600">Progress</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
