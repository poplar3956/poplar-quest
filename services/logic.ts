
import { Riasec, Question, Job, DiagnosticResult, Rarity, CareerMilestone } from '../types';
import { JOBS } from '../constants';

const RIASEC_LABELS: Record<Riasec, { strength: string, growth: string }> = {
  R: { strength: "確かな実行力", growth: "全体的な戦略視点" },
  I: { strength: "鋭い分析眼", growth: "直感的なアクション" },
  A: { strength: "豊かな創造性", growth: "型にはまった継続性" },
  S: { strength: "深い共感力", growth: "数値に基づく判断" },
  E: { strength: "力強い牽引力", growth: "緻密な事務管理" },
  C: { strength: "圧倒的な正確性", growth: "変化への柔軟な対応" }
};

export function calculateResult(answers: number[], questions: Question[]): DiagnosticResult {
  const riasecScores: Record<Riasec, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  let totalSynchroEffect = 0;
  let answerHash = 0;

  answers.forEach((optionIdx, qIdx) => {
    const question = questions[qIdx];
    const option = question.options[optionIdx];

    // RIASECポイントの集計
    Object.entries(option.points).forEach(([type, val]) => {
      riasecScores[type as Riasec] += val!;
    });

    // シンクロ率の集計
    totalSynchroEffect += option.synchroEffect;

    // 回答の組み合わせを数値化（同じジョブが複数ある場合のタイブレーク用）
    answerHash += (optionIdx + 1) * (qIdx + 1);
  });

  // スコア算出（15問、最大シンクロ効果10とした場合の相対評価 0-100）
  // 15問中、最高シンクロ率を100%に調整
  // スコア算出（15問、最大シンクロ効果10とした場合の相対評価 0-100）
  const maxPossibleSync = 150;
  const rawScore = Math.min(Math.round((totalSynchroEffect / maxPossibleSync) * 100), 100);

  // レア度判定（スコア連動型に変更）
  // 修正：ユーザーフィードバックにより緩和 & 演出用スコア補正 (2026-02-17)
  // UR: 80点以上 (表示95-100)
  // SR: 60点以上 (表示80-94)
  // R:  60点未満 (表示0-79)

  let rarity: Rarity;
  let score: number;

  if (rawScore >= 80) {
    rarity = Rarity.UR;
    // 80-100 を 95-100 にマッピング
    score = 95 + Math.round((rawScore - 80) * (5 / 20));
  } else if (rawScore >= 70) {
    rarity = Rarity.SSR;
    // 70-79 を 85-94 にマッピング
    score = 85 + Math.round((rawScore - 70) * (9 / 9));
  } else if (rawScore >= 55) {
    rarity = Rarity.SR;
    // 55-69 を 70-84 にマッピング
    score = 70 + Math.round((rawScore - 55) * (14 / 14));
  } else {
    rarity = Rarity.R;
    // 0-54 を 0-69 にマッピング
    score = Math.round(rawScore * (69 / 55));
  }

  const sortedTypes = Object.entries(riasecScores).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return b[0].localeCompare(a[0]); // 同点の場合はアルファベット順で固定
  });

  const primaryType = sortedTypes[0][0] as Riasec;
  const secondaryType = sortedTypes[1][0] as Riasec;
  const tertiaryType = sortedTypes[2][0] as Riasec;

  // Job selection (決定論的に選択)
  const candidates = JOBS.filter(j => j.riasecPrimary === primaryType);
  // 同一タイプ内に複数ジョブがある場合、回答ハッシュを用いて一意に選択
  const jobIndex = answerHash % (candidates.length || 1);
  const selectedJob = candidates[jobIndex] || JOBS[0];

  // Strengths & Growth Area based on RIASEC
  const strengths = [
    RIASEC_LABELS[primaryType].strength,
    RIASEC_LABELS[secondaryType].strength,
    "高い学習意欲"
  ];
  const growthArea = RIASEC_LABELS[tertiaryType].growth;

  // Department Mapping
  const departments: string[] = [];
  if (primaryType === 'R') departments.push("特別養護老人ホーム", "訪問介護");
  if (primaryType === 'I') departments.push("居宅介護支援事業所", "労務部");
  if (primaryType === 'A') departments.push("デイサービス", "人事部");
  if (primaryType === 'S') departments.push("グループホーム", "デイサービス");
  if (primaryType === 'E') departments.push("介護付き有料老人ホーム", "人事部");
  if (primaryType === 'C') departments.push("経理部", "総務部");

  const uniqueDepts = Array.from(new Set(departments)).slice(0, 2);
  if (uniqueDepts.length === 0) uniqueDepts.push("特別養護老人ホーム");

  // Career Plan
  const careerPlan: CareerMilestone[] = [
    {
      year: "1年目",
      title: "ケアスタッフ",
      salary: "270,000円",
      description: "池田さつき会の全職員が通る道。現場での経験が、将来どの部署に行ってもあなたの最強の武器になります。",
      icon: "🌱"
    }
  ];

  const cat = selectedJob.category;
  let y3, y5, y10;

  if (cat === 'BACK OFFICE') {
    y3 = { title: "事務担当", salary: "280,000円", description: "現場経験を活かした本部事務へ。", icon: "📝" };
    y5 = { title: "事務係長", salary: "320,000円", description: "部門の要として実務を統括。", icon: "📜" };
    y10 = { title: "管理職", salary: "420,000円", description: "法人の経営を支える中核へ。", icon: "🗝️" };
  } else {
    y3 = { title: "リーダー候補", salary: "290,000円", description: "現場チームをまとめる役割へ。", icon: "🛡️" };
    y5 = { title: rarity === Rarity.UR ? "施設長(管理者)" : "リーダー", salary: rarity === Rarity.UR ? "400,000円" : "310,000円", description: "拠点を牽引する存在へ。", icon: "⚔️" };
    y10 = { title: "施設長(管理者)", salary: "450,000円", description: "地域福祉を創るトップリーダー。", icon: "👑" };
  }

  careerPlan.push({ year: "3年目", ...y3 }, { year: "5年目", ...y5 }, { year: "10年目", ...y10 });

  return {
    job: selectedJob,
    rarity,
    score,
    riasecScores,
    departments: uniqueDepts,
    careerPlan,
    strengths,
    growthArea
  };
}

export function getRadarData(riasecScores: Record<Riasec, number>) {
  return [
    { subject: '現実的', A: riasecScores.R, fullMark: 15 },
    { subject: '研究的', A: riasecScores.I, fullMark: 15 },
    { subject: '芸術的', A: riasecScores.A, fullMark: 15 },
    { subject: '社会的', A: riasecScores.S, fullMark: 15 },
    { subject: '企業的', A: riasecScores.E, fullMark: 15 },
    { subject: '慣習的', A: riasecScores.C, fullMark: 15 },
  ];
}
