import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { STREAMS_LIST } from '../../data/streamsData';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Flame,
  Clock,
  BookOpen
} from 'lucide-react';

export const StudentQuizzes = () => {
  const { selectedStream, quizResults, submitQuizResult } = useApp();

  const activeStreamObj = STREAMS_LIST.find(s => s.id === selectedStream) || STREAMS_LIST[0];
  const quiz = activeStreamObj.dailyQuiz;

  // Active quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const questions = quiz ? quiz.questions : [];
  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (qId, optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleSubmitQuiz = () => {
    const score = calculateScore();
    setIsSubmitted(true);
    submitQuizResult({
      quizId: quiz.id,
      title: quiz.title,
      score,
      totalQuestions: questions.length,
      stream: selectedStream
    });
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setShowExplanation(false);
  };

  const finalScore = isSubmitted ? calculateScore() : 0;
  const percentage = questions.length > 0 ? Math.round((finalScore / questions.length) * 100) : 0;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Daily Concept Drills • {selectedStream}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Subject Practice Quizzes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Carefully crafted by verified IIT/NIT/IISER/DU rankers to test core intuition, not mere rote memory.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-rose-100 shadow-2xs text-xs font-bold text-slate-700">
          <Clock className="w-3.5 h-3.5 text-brand-rose" />
          <span>{quiz?.duration || '10 mins'}</span>
        </div>
      </div>

      {/* Main Quiz Box */}
      <div className="clay-card p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-rose-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">{quiz?.title}</h3>
            <p className="text-xs text-brand-rose font-semibold mt-0.5">
              Subject: {quiz?.subject} • {questions.length} Questions
            </p>
          </div>

          <span className="text-xs font-bold text-slate-500 bg-rose-50 px-3 py-1 rounded-full">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>

        {/* Current Question */}
        {currentQ && (
          <div className="space-y-6">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQuestionIndex + 1}. {currentQ.question}
            </h4>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === optIdx;
                const isCorrect = currentQ.correctIndex === optIdx;

                let optClass = 'bg-white border-slate-200/90 text-slate-800 hover:border-brand-rose/60';
                if (isSubmitted) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                  }
                } else if (isSelected) {
                  optClass = 'bg-[#FFF1F3] border-brand-rose text-brand-maroon font-bold shadow-xs';
                }

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${optClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation box after submission */}
            {isSubmitted && currentQ.explanation && (
              <div className="p-4 rounded-2xl bg-[#FFF6F7] border border-rose-200 text-xs">
                <p className="font-bold text-brand-maroon mb-1">Concept Explanation:</p>
                <p className="text-slate-700 leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Stepper & Action Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-rose-100">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="clay-btn-primary px-5 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  !isSubmitted && (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(selectedAnswers).length === 0}
                      className="clay-btn-primary px-6 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Quiz</span>
                    </button>
                  )
                )}

                {isSubmitted && (
                  <button
                    onClick={handleRetake}
                    className="clay-btn-secondary px-5 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Score Summary Modal Alert when submitted */}
        {isSubmitted && (
          <div className="mt-6 p-5 rounded-3xl bg-gradient-to-r from-purple-100 via-rose-100 to-amber-100 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-soft text-purple-600 flex items-center justify-center text-xl">
                🏆
              </div>
              <div>
                <h4 className="text-base font-black text-slate-900">
                  You Scored {finalScore} / {questions.length} ({percentage}%)!
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  🔥 Daily streak updated! Check individual question explanations above.
                </p>
              </div>
            </div>

            <button
              onClick={handleRetake}
              className="clay-btn-primary px-5 py-2 text-xs font-bold cursor-pointer"
            >
              Practice Again
            </button>
          </div>
        )}
      </div>

      {/* Quiz History List */}
      <div className="clay-card p-6">
        <h3 className="text-base font-black text-slate-900 mb-3">
          Past Quiz Drill History
        </h3>

        <div className="space-y-2.5">
          {quizResults.map((res) => (
            <div
              key={res.id}
              className="p-3.5 rounded-2xl bg-white/80 border border-rose-100 flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-bold text-slate-900">{res.title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Date: {res.date} • {res.stream}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-brand-maroon">
                  {res.score}/{res.totalQuestions}
                </span>
                <span className="bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                  {res.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
