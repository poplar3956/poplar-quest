
import React from 'react';
import { Question } from '../types';
import { ChevronLeft } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (index: number) => void;
  onBack: () => void;
  canBack: boolean;
  currentNumber: number;
  totalNumber: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  onAnswer, 
  onBack, 
  canBack, 
  currentNumber, 
  totalNumber 
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border-t-8 border-pink-500 transform transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <span className="pixel-font text-pink-600 font-bold bg-pink-100 px-3 py-1 rounded-full text-sm">
          QUESTION {currentNumber} / {totalNumber}
        </span>
        {canBack && (
          <button 
            onClick={onBack}
            className="flex items-center text-slate-400 hover:text-pink-500 text-xs font-bold transition-colors"
          >
            <ChevronLeft size={16} /> 時を戻す
          </button>
        )}
      </div>

      <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-8 leading-relaxed">
        {question.text}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(idx)}
            className="group relative w-full text-left p-4 md:p-6 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:bg-white hover:border-pink-300 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 group-hover:bg-pink-500 group-hover:text-white font-bold text-slate-600 transition-colors mr-4">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-slate-700 font-bold text-base md:text-lg group-hover:text-pink-600">
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
