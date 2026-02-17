
import React, { useMemo, useState, useEffect } from 'react';
import { DiagnosticResult, Rarity } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { getRadarData } from '../services/logic';
import { RefreshCcw, MapPin, AlertCircle, TrendingUp, Banknote, Scale, Info, CheckCircle2, Send, Gift, ExternalLink, Smartphone, Palmtree, GraduationCap, Quote, Globe, UserPlus, FileWarning } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

interface ResultViewProps {
  result: DiagnosticResult;
  onReset: () => void;
  isReadOnly?: boolean;
  answers: number[];
}

const ResultView: React.FC<ResultViewProps> = ({ result, onReset, isReadOnly = false, answers }) => {
  const radarData = useMemo(() => getRadarData(result.riasecScores), [result]);
  const [shareUrl, setShareUrl] = useState('');
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    // 現在のURLをベースに共有URLを生成
    // window.location.origin は "http://192.168.x.x:3000" のようになる
    const baseUrl = window.location.origin + window.location.pathname;
    const encodedAnswers = answers.join('');
    const url = `${baseUrl}?a=${encodedAnswers}`;
    setShareUrl(url);

    // localhost判定
    const hostname = window.location.hostname;
    setIsLocalhost(hostname === 'localhost' || hostname === '127.0.0.1');

    // URLを更新（履歴に追加せず置き換え）
    if (!isReadOnly) {
      window.history.replaceState({}, '', `?a=${encodedAnswers}`);
    }
  }, [answers, isReadOnly]);

  const rarityColors = {
    [Rarity.UR]: "text-amber-500",
    [Rarity.SSR]: "text-pink-500",
    [Rarity.SR]: "text-indigo-600",
    [Rarity.R]: "text-emerald-600"
  };

  const rarityBenefits = {
    [Rarity.UR]: "★一次選考パス★",
    [Rarity.SSR]: "特別オファー確約",
    [Rarity.SR]: "送迎付き見学会",
    [Rarity.R]: "スペシャルグッズ"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 animate-pop-in px-4">
      {/* メイン診断結果表示 */}
      <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 shadow-2xl relative border-4 border-white overflow-hidden">
        <div className={`absolute top-0 right-0 w-64 h-64 -mr-24 -mt-24 rounded-full opacity-10 bg-gradient-to-br ${result.job.color} blur-3xl`} />

        <div className="text-center relative z-10">
          <div className="mb-2">
            <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">診断結果レポート</h3>
          </div>

          <div className="mb-4">
            <span className={`pixel-font font-black text-4xl md:text-5xl italic ${rarityColors[result.rarity]} drop-shadow-sm`}>
              {result.rarity}
            </span>
          </div>

          <div className="mb-8">
            <span className="text-7xl md:text-9xl font-black text-slate-800 tracking-tighter">
              {result.score}<span className="text-2xl md:text-3xl ml-2 text-pink-500 font-bold">%</span>
            </span>
            <p className="text-slate-400 font-bold text-xs md:text-sm tracking-widest mt-2 uppercase">Satsuki Sync Rate</p>
          </div>

          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl md:text-6xl font-black text-slate-800 mb-4 flex items-center gap-3 md:gap-4">
              <span className="text-4xl md:text-7xl">{result.job.icon}</span>
              {result.job.title}
            </h2>
            <div className="bg-pink-500 text-white font-black px-6 md:px-8 py-2 md:py-2.5 rounded-full text-base md:text-lg shadow-lg">
              {result.job.subTitle}
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 mb-10 flex items-center gap-4 md:gap-6 shadow-sm">
            <div className="bg-amber-400 p-2 md:p-3.5 rounded-xl md:rounded-2xl text-white shadow-lg shrink-0">
              <Gift size={28} className="md:w-8 md:h-8" />
            </div>
            <div className="text-left">
              <p className="text-amber-800 text-[10px] md:text-xs font-black uppercase tracking-widest mb-1">獲得したブース特典</p>
              <p className="text-amber-900 font-black text-lg md:text-xl">{rarityBenefits[result.rarity]}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 border-l-4 md:border-l-[16px] border-pink-500 text-left shadow-inner">
            <p className="text-slate-700 font-bold leading-relaxed text-base md:text-xl lg:text-2xl">
              {result.job.descriptions[result.rarity]}
            </p>
          </div>
        </div>
      </div>

      {/* 池田さつき会からのメッセージ */}
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-xl border-2 border-pink-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Quote size={80} className="text-pink-500 md:w-[120px] md:h-[120px]" />
        </div>
        <h4 className="text-pink-600 font-black text-xl md:text-2xl mb-6 flex items-center gap-3">
          あなたへのメッセージ
        </h4>
        <p className="text-slate-700 text-base md:text-lg font-bold leading-relaxed whitespace-pre-wrap relative z-10">
          {result.job.messageFromSatsuki}
        </p>
      </div>

      {/* 先輩社員マッチング */}
      <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden border-2 border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 opacity-5 blur-[100px] -mr-32 -mt-32"></div>
        <h4 className="text-white font-black text-xl md:text-2xl mb-10 flex items-center gap-3">
          <Quote className="text-pink-500" />
          同じジョブタイプの先輩
        </h4>

        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start">
          <div className="flex flex-col items-center gap-4 shrink-0 w-full md:w-auto">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-800 rounded-3xl flex items-center justify-center text-6xl md:text-7xl shadow-2xl border-4 border-slate-700 relative overflow-hidden group">
              <span className="group-hover:scale-110 transition-transform">{result.job.seniorMessage.avatar}</span>
            </div>
            <div className="text-center">
              <p className="text-white font-black text-lg md:text-xl mb-1">{result.job.seniorMessage.name}</p>
              <p className="text-pink-400 text-xs md:text-sm font-black italic mb-1">{result.job.seniorMessage.years}</p>
              <p className="text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-tighter">{result.job.seniorMessage.position}</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] relative flex-1">
            <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 bg-pink-500 text-white p-2 rounded-lg md:rounded-xl shadow-lg">
              <Quote size={18} className="md:w-5 md:h-5" />
            </div>
            <p className="text-slate-200 text-base md:text-lg font-bold leading-relaxed italic">
              「{result.job.seniorMessage.content}」
            </p>
            <div className="mt-4 md:mt-6 flex justify-end">
              <span className="text-slate-500 text-[9px] md:text-[10px] font-black italic tracking-widest uppercase">Senior's Real Voice</span>
            </div>
          </div>
        </div>
      </div>

      {/* 柔軟な働き方セクション */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden border-2 border-slate-700">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 opacity-5 blur-[100px] -ml-32 -mb-32"></div>
        <div className="relative z-10">
          <h4 className="text-white font-black text-xl md:text-2xl mb-8 flex items-center gap-3">
            <Palmtree className="text-emerald-400" />
            柔軟な働き方
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl md:rounded-3xl hover:bg-white/10 transition-all border-b-4 border-b-pink-500">
              {/* Merged className to avoid duplicates on line 150 */}
              <Smartphone className="text-pink-400 mb-4 md:w-8 md:h-8" size={28} />
              <h5 className="text-white font-black mb-2 text-base md:text-lg">スマホで完結</h5>
              <p className="text-slate-400 text-xs md:text-sm font-bold leading-relaxed">有給申請は専用アプリで1分。上司への根回しや印鑑は一切不要。いつでもどこでも申請可能です。</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl md:rounded-3xl hover:bg-white/10 transition-all border-b-4 border-b-emerald-500">
              {/* Merged className to avoid duplicates on line 155 */}
              <Palmtree className="text-emerald-400 mb-4 md:w-8 md:h-8" size={28} />
              <h5 className="text-white font-black mb-2 text-base md:text-lg">推し活・旅行OK</h5>
              <p className="text-slate-400 text-xs md:text-sm font-bold leading-relaxed">ライブや長期旅行など, 私生活の充実は仕事の活力。あなたの『好き』を全力で尊重します。</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl md:rounded-3xl hover:bg-white/10 transition-all border-b-4 border-b-amber-500">
              {/* Merged className to avoid duplicates on line 160 */}
              <GraduationCap className="text-amber-400 mb-4 md:w-8 md:h-8" size={28} />
              <h5 className="text-white font-black mb-2 text-base md:text-lg">自己研鑽を応援</h5>
              <p className="text-slate-400 text-xs md:text-sm font-bold leading-relaxed">資格取得やセミナー費用を支援。キャリアアップも『自分のペース』で無理なく進められます。</p>
            </div>
          </div>

          <div className="mt-8 md:mt-10 p-6 md:p-8 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl md:rounded-3xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50"></div>
            <p className="text-white text-lg md:text-2xl font-black leading-relaxed">
              「推し活・旅行・自己研鑽, 何でもOK。<br className="hidden md:block" />
              誰も理由を聞かない, 自由な風土があります。」
            </p>
          </div>
        </div>
      </div>

      {/* 強み・伸びしろ分析セクション */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 shadow-xl flex flex-col items-center border border-slate-100 min-h-[350px] md:min-h-[400px]">
          <h4 className="text-slate-800 font-black mb-6 text-base md:text-lg flex items-center gap-2 uppercase tracking-tighter">
            📊 Ability Parameter
          </h4>
          <div className="w-full h-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                <Radar
                  name="Ability"
                  dataKey="A"
                  stroke="#ec4899"
                  fill="#ec4899"
                  fillOpacity={0.4}
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 shadow-2xl relative overflow-hidden border-2 border-slate-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-10 blur-3xl"></div>
            <h4 className="text-white font-black text-lg md:text-xl mb-6 flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400" />
              あなたの強み 3つ
            </h4>
            <div className="space-y-3 md:space-y-4">
              {result.strengths.map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-3 transition-transform hover:scale-105">
                  <span className="text-emerald-400 font-black italic text-base md:text-lg">#{i + 1}</span>
                  <span className="text-white font-bold text-sm md:text-base">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 shadow-xl border-2 border-slate-200">
            <h4 className="text-slate-800 font-black text-lg md:text-xl mb-4 flex items-center gap-3">
              <TrendingUp className="text-pink-500" />
              伸びしろ（課題）
            </h4>
            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-slate-700 font-bold leading-relaxed text-sm md:text-base">
                今のあなたに <span className="text-pink-600 font-black">「{result.growthArea}」</span> という視点が加われば,
                さつき会でもさらに大きな影響力を持つ人材へと成長できます。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 10年間のキャリアプラン */}
      <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden border-2 border-slate-800">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <h3 className="text-white font-black text-xl md:text-2xl flex items-center gap-3">
              <TrendingUp className="text-pink-500" />
              10年間のキャリアプラン
            </h3>
            <span className="text-[10px] md:text-xs bg-pink-500/20 text-pink-400 px-3 py-1.5 rounded-full border border-pink-500/30 font-black w-fit">さつき会での月収推移モデル</span>
          </div>

          <div className="space-y-8 md:space-y-12 relative before:absolute before:inset-0 before:ml-4 md:before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
            {result.careerPlan.map((step, idx) => (
              <div key={idx} className="relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-700 bg-slate-900 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all group-hover:border-pink-500 group-hover:scale-125 group-hover:bg-pink-500 z-10">
                  <span className="text-sm md:text-lg">{step.icon}</span>
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-800 bg-slate-800/30 hover:bg-slate-800 transition-all group-hover:border-slate-600 group-hover:shadow-lg">
                  <div className="flex flex-col gap-2 md:gap-3 mb-4">
                    <div className="flex items-center justify-between">
                      <time className="font-black text-pink-500 italic text-xs md:text-sm tracking-widest">{step.year}</time>
                      {step.salary && (
                        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-xl text-xs md:text-sm font-black">
                          <Banknote size={14} className="md:w-[18px] md:h-[18px]" />
                          <span className="text-[9px] mr-0.5 opacity-70">月収例:</span>
                          <span className="text-base md:text-xl tracking-tight">{step.salary}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-white font-black text-lg md:text-3xl leading-tight">{step.title}</div>
                  </div>
                  <div className="text-slate-400 text-xs md:text-base font-bold leading-relaxed">{step.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 市場データ比較 */}
          <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
              <div className="bg-pink-500 p-2 rounded-lg w-fit">
                <Scale size={18} className="text-white md:w-5 md:h-5" />
              </div>
              <div>
                <h4 className="text-white font-black text-base md:text-lg">2025年度 平均年収・月収比較 data</h4>
                <p className="text-slate-500 text-[9px] md:text-[10px] font-bold tracking-widest uppercase">Reference: Market Average Comparison</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-slate-800/40 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-700/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-600"></div>
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <span className="text-slate-400 text-[10px] font-black tracking-widest uppercase bg-slate-700/50 px-3 py-1 rounded-full">全国平均（全産業）</span>
                </div>
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-start justify-between border-b border-slate-700/50 pb-4 gap-4">
                    <div className="flex-1">
                      <p className="text-slate-500 text-[10px] md:text-xs font-bold mb-1">23歳（社会人1〜2年目）</p>
                      <p className="text-slate-400 font-bold text-xs md:text-sm italic">初任給〜若手層</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-white font-black text-xl md:text-3xl">20〜25<span className="text-xs ml-1 text-slate-500">万円</span></p>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-slate-500 text-[10px] md:text-xs font-bold mb-1">33歳（中堅・管理職）</p>
                      <p className="text-slate-400 font-bold text-xs md:text-sm italic">キャリア中核層</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-white font-black text-xl md:text-3xl">35〜40<span className="text-xs ml-1 text-slate-500">万円</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-pink-500/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border-2 border-pink-500/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-pink-500"></div>
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <span className="text-pink-500 text-[10px] font-black tracking-widest uppercase bg-pink-500/10 px-3 py-1 rounded-full">介護業界平均（2025推定）</span>
                </div>
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-start justify-between border-b border-pink-500/10 pb-4 gap-4">
                    <div className="flex-1">
                      <p className="text-slate-400 text-[10px] md:text-xs font-bold mb-1">23歳（社会人1〜2年目）</p>
                      <p className="text-pink-400/80 font-bold text-xs md:text-sm italic">実務者研修程度</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-white font-black text-xl md:text-3xl text-pink-100">22〜26<span className="text-xs ml-1 text-slate-500">万円</span></p>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-slate-400 text-[9px] md:text-[10px] font-bold mb-1 leading-tight">33歳（介護福祉士・管理職候補）</p>
                      <p className="text-pink-400/80 font-bold text-xs md:text-sm italic">リーダー・中堅層</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-white font-black text-xl md:text-3xl text-pink-100">27〜32<span className="text-xs ml-1 text-slate-500">万円</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QRコードセクション */}
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 pb-10 shadow-2xl border-4 border-slate-100 flex flex-col items-center w-full max-w-md relative z-10 transition-transform hover:scale-[1.02]">
          <div className="text-slate-400 text-[9px] md:text-[10px] font-black tracking-[0.4em] mb-6 md:mb-8 uppercase">
            {isReadOnly ? "YOUR SHARED DIAGNOSIS" : "BOOTH SPECIAL GIFT CODE"}
          </div>

          <div className="relative mb-6 md:mb-8 group">
            <div className="p-4 md:p-6 bg-white shadow-inner rounded-[1.5rem] md:rounded-[2rem] border-2 border-slate-50 transition-transform group-hover:scale-105">
              {shareUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <QRCodeCanvas
                    value={shareUrl}
                    size={200}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                    includeMargin={true}
                    className="w-40 h-40 md:w-56 md:h-56"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 md:w-56 md:h-56 flex flex-col items-center justify-center bg-slate-50 text-slate-400 p-4 text-center">
                  <AlertCircle size={28} className="mb-2 text-pink-300" />
                  <p className="text-[9px] font-bold">QR生成中...</p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center space-y-4 px-4">
            {isLocalhost ? (
              <div className="bg-amber-100 text-amber-800 p-3 rounded-xl border border-amber-200 flex items-start gap-2 text-left">
                <FileWarning className="shrink-0 mt-0.5" size={16} />
                <div className="text-[10px] md:text-xs font-bold leading-relaxed">
                  <p className="mb-1">現在 <code>localhost</code> で表示中のため、スマホで読み取れません。</p>
                  <p>PCのターミナルに表示されている <code>Network: http://192.168.x.x:3000</code> のURLで開き直してください。</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-slate-500 text-[10px] md:text-xs font-bold">
                  {isReadOnly ? "このURLを保存すればいつでも見返せます" : "この診断結果をスマホで持ち帰ろう！"}
                </p>
                <p className="text-slate-400 text-[9px] md:text-[10px] font-bold">
                  {isReadOnly ? "ブックマーク推奨！" : "ブース担当者にこの画面を見せて"}
                </p>
                {!isReadOnly && <p className="text-pink-500 text-sm md:text-base font-black">【限定特典】をゲット！</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 次のアクション：サイトへのリンクのみに集約 */}
      <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-10 shadow-2xl border-4 border-slate-900 text-center space-y-6 md:space-y-8 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-4">次のアクションへ</h3>
          <p className="text-slate-500 font-bold mb-8 md:mb-10 text-sm md:text-base">
            採用特設サイトで、あなたにぴったりの<br className="md:hidden" />
            キャリア体験・見学プランを見つけましょう。
          </p>

          <div className="flex justify-center">
            <a
              href="https://poplar-recruit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-sm bg-slate-900 text-white font-black py-4 md:py-5 px-6 rounded-2xl md:rounded-3xl hover:bg-slate-800 hover:scale-[1.03] transition-all flex items-center justify-center gap-3 text-base md:text-lg group shadow-xl"
            >
              採用特設サイトを見る
              <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 pt-6">
        {!isReadOnly && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-slate-400 font-black hover:text-pink-500 transition-all hover:scale-105 text-sm md:text-base"
          >
            <RefreshCcw size={18} className="md:w-5 md:h-5" /> 最初からやり直す
          </button>
        )}

        <div className="bg-gradient-to-br from-pink-50 to-white border-2 border-pink-100 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 text-center space-y-6 shadow-xl w-full overflow-hidden relative">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-pink-200 rounded-full blur-[60px] opacity-30"></div>
          <h3 className="text-2xl md:text-3xl font-black text-pink-600 leading-tight">
            あなたの「自分らしさ」を磨きませんか？
          </h3>
          <p className="text-slate-600 font-bold leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
            池田さつき会は、福祉の常識をアップデートする仲間を探しています。<br className="hidden md:block" />
            あなたの個性が, 誰かの希望に変わる場所がここにあります。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
