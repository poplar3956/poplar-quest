
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { DiagnosticResult } from './types';
import { calculateResult } from './services/logic';
import SynchroGauge from './components/SynchroGauge';
import QuestionCard from './components/QuestionCard';
import ResultView from './components/ResultView';
import { Sparkles, Trophy, MousePointer2, Users, Flame } from 'lucide-react';

type Screen = 'START' | 'DIAGNOSIS' | 'ANALYZING' | 'RESULT';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('START');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [synchroRate, setSynchroRate] = useState(0);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  // 初期化時にURLパラメータを確認
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedAnswers = params.get('a');

    if (encodedAnswers && encodedAnswers.length === QUESTIONS.length) {
      // 数値配列に変換
      const recoveredAnswers = encodedAnswers.split('').map(char => parseInt(char, 10));
      // 有効な回答かチェック
      if (recoveredAnswers.every(a => !isNaN(a) && a >= 0 && a <= 3)) {
        const res = calculateResult(recoveredAnswers, QUESTIONS);
        setResult(res);
        setAnswers(recoveredAnswers);
        setIsReadOnly(true);
        setScreen('RESULT');
      }
    }
  }, []);

  const handleStart = () => {
    setScreen('DIAGNOSIS');
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setSynchroRate(0);
    setIsReadOnly(false);
  };

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIdx;
    setAnswers(newAnswers);

    const effect = QUESTIONS[currentQuestionIndex].options[optionIdx].synchroEffect;
    setSynchroRate(prev => Math.min(Math.max(prev + effect, 0), 100));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setScreen('ANALYZING');
      setTimeout(() => {
        const res = calculateResult(newAnswers, QUESTIONS);
        setResult(res);
        setScreen('RESULT');
      }, 2500);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleReset = () => {
    // URLパラメータをクリアしてリセット
    window.history.replaceState({}, '', window.location.pathname);
    setScreen('START');
    setResult(null);
    setIsReadOnly(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-pink-200">
      <div className="fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-rose-400 to-purple-600 z-50"></div>

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {screen === 'DIAGNOSIS' && (
          <div className="mb-8 sticky top-4 z-40 bg-slate-50/80 backdrop-blur-sm pt-2 pb-4 space-y-4">
            <SynchroGauge value={synchroRate} />
            <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-400 transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {screen === 'START' && (
          <div className="flex flex-col items-center justify-center text-center space-y-8 py-10 md:py-16">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 font-black px-4 py-1 rounded-full text-xs tracking-widest animate-bounce">
                <Sparkles size={14} /> NEW RECRUITMENT EXPERIENCE
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-800 leading-tight">
                ポプラ<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 uppercase">相性診断クエスト</span>
              </h1>
              <p className="text-lg md:text-xl font-bold text-slate-500 max-w-md mx-auto">
                福祉のイメージを壊し、<br />
                あなたの「自分らしさ」を解き放つ。
              </p>
            </div>

            <div className="w-full max-w-sm">
              <div className="relative group">
                <div className="absolute inset-0 bg-pink-400 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity rounded-full"></div>
                <button
                  onClick={handleStart}
                  className="relative w-full bg-slate-900 text-white text-xl font-black py-6 rounded-3xl hover:bg-slate-800 transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-2xl flex items-center justify-center gap-3"
                >
                  クエスト開始 <MousePointer2 className="animate-pulse" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-2 text-xs font-bold bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                <Trophy size={14} className="text-amber-400" /> 全8種の称号
              </div>
              <div className="flex items-center gap-2 text-xs font-bold bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                RIASEC理論採用
              </div>
              <div className="flex items-center gap-2 text-xs font-bold bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                限定特典あり
              </div>
            </div>
          </div>
        )}

        {screen === 'DIAGNOSIS' && (
          <QuestionCard
            question={QUESTIONS[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onBack={handleBack}
            canBack={currentQuestionIndex > 0}
            currentNumber={currentQuestionIndex + 1}
            totalNumber={QUESTIONS.length}
          />
        )}

        {screen === 'ANALYZING' && (
          <div className="flex flex-col items-center justify-center text-center space-y-8 py-20">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-12 border-pink-100 rounded-full"></div>
              <div className="absolute inset-0 border-12 border-pink-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-4 border-8 border-slate-900 rounded-full border-b-transparent animate-spin-slow"></div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-800 pixel-font animate-pulse uppercase">Syncing...</h2>
              <p className="text-slate-500 font-bold">あなたの「強み」と「伸びしろ」を抽出中</p>
            </div>
          </div>
        )}

        {screen === 'RESULT' && result && (
          <ResultView
            result={result}
            onReset={handleReset}
            isReadOnly={isReadOnly}
            answers={answers}
          />
        )}
      </main>

      <div className="fixed top-[10%] right-[5%] w-64 h-64 bg-pink-100 rounded-full blur-[100px] -z-10 opacity-60"></div>
      <div className="fixed bottom-[10%] left-[5%] w-96 h-96 bg-purple-100 rounded-full blur-[100px] -z-10 opacity-40"></div>
    </div>
  );
};

export default App;
