import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, RefreshCw } from 'lucide-react';
import { useQuestions } from '../contexts/QuestionContext';

const Questions: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { getQuestionsByCategory } = useQuestions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const questions = getQuestionsByCategory(category || '');
  const currentQuestion = questions[currentQuestionIndex];

  const categoryInfo = {
    easy: { name: 'Dễ', color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    medium: { name: 'Vừa', color: 'yellow', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
    hard: { name: 'Khó', color: 'red', bgColor: 'bg-red-50', borderColor: 'border-red-200' }
  };

  const currentCategoryInfo = categoryInfo[category as keyof typeof categoryInfo];

  const handleSubmitAnswer = () => {
    setShowAnswer(true);
    if (!answeredQuestions.includes(currentQuestionIndex)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setShowAnswer(false);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserAnswer('');
      setShowAnswer(false);
      setShowExplanation(false);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setShowAnswer(false);
    setShowExplanation(false);
    setAnsweredQuestions([]);
  };

  const isCorrect = () => {
    return userAnswer.trim().toLowerCase() === currentQuestion?.answer.toLowerCase();
  };

  if (!currentQuestion) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Không tìm thấy câu hỏi</h1>
        <Link
          to="/category"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors inline-block"
        >
          Quay lại danh mục
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/category"
            className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Câu Hỏi Mức {currentCategoryInfo?.name}
            </h1>
            <p className="text-gray-600">
              Câu {currentQuestionIndex + 1} / {questions.length}
            </p>
          </div>
        </div>
        <button
          onClick={handleResetQuiz}
          className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
          title="Làm lại từ đầu"
        >
          <RefreshCw className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
          }}
        />
      </div>

      {/* Question Card */}
      <div className={`${currentCategoryInfo?.bgColor} ${currentCategoryInfo?.borderColor} border-2 rounded-xl p-8`}>
        <div className="space-y-6">
          {/* Question */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Answer Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đáp án của em:
              </label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Nhập đáp án..."
                disabled={showAnswer}
              />
            </div>

            {!showAnswer && (
              <button
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim()}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Kiểm tra đáp án
              </button>
            )}
          </div>

          {/* Answer Result */}
          {showAnswer && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg flex items-center space-x-3 ${
                isCorrect() ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
              }`}>
                {isCorrect() ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <div>
                  <p className={`font-semibold ${isCorrect() ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect() ? 'Chính xác! Rất tốt!' : 'Chưa đúng, hãy thử lại!'}
                  </p>
                  <p className="text-gray-700">
                    Đáp án đúng: <span className="font-bold">{currentQuestion.answer}</span>
                  </p>
                </div>
              </div>

              {/* Explanation */}
              {currentQuestion.explanation && (
                <div className="space-y-2">
                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Lightbulb className="w-5 h-5" />
                    <span>Xem lời giải</span>
                  </button>
                  
                  {showExplanation && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800">{currentQuestion.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Câu trước
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Đã trả lời: {answeredQuestions.length} / {questions.length}
          </p>
        </div>

        <button
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Câu tiếp theo
        </button>
      </div>

      {/* Question Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Chuyển đến câu:</h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentQuestionIndex(index);
                setUserAnswer('');
                setShowAnswer(false);
                setShowExplanation(false);
              }}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                index === currentQuestionIndex
                  ? 'bg-blue-500 text-white'
                  : answeredQuestions.includes(index)
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;