
import { Question, Job, Riasec } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "もしRPGのパーティーに入るなら、あなたの希望は？",
    options: [
      { label: "前線で皆を引っ張る「勇者」", points: { E: 3, S: 1 }, synchroEffect: 8 },
      { label: "冷静に状況を分析する「軍師」", points: { I: 3, C: 1 }, synchroEffect: 5 },
      { label: "傷ついた仲間を癒やす「僧侶」", points: { S: 3, R: 1 }, synchroEffect: 10 },
      { label: "独自の道具を使いこなす「職人」", points: { R: 3, A: 1 }, synchroEffect: 6 }
    ]
  },
  {
    id: 2,
    text: "新しい課題に直面したとき、どう動く？",
    options: [
      { label: "まずは直感で飛び込んでみる！", points: { A: 2, E: 2 }, synchroEffect: 9 },
      { label: "過去の事例を徹底的に調べる", points: { C: 3, I: 1 }, synchroEffect: 4 },
      { label: "周囲に意見を聞いてから判断する", points: { S: 3, C: 1 }, synchroEffect: 7 },
      { label: "最短ルートで解決できる仕組みを作る", points: { I: 3, R: 1 }, synchroEffect: 6 }
    ]
  },
  {
    id: 3,
    text: "「福祉」の仕事、今のあなたのイメージは？",
    options: [
      { label: "心と心の触れ合いが中心の温かい仕事", points: { S: 3 }, synchroEffect: 10 },
      { label: "チームで大きな目標を達成する組織的な仕事", points: { E: 2, C: 2 }, synchroEffect: 7 },
      { label: "最新技術やDXで変えられる可能性の塊", points: { I: 3, A: 1 }, synchroEffect: 9 },
      { label: "プロフェッショナルな技術を磨く職人技", points: { R: 3 }, synchroEffect: 8 }
    ]
  },
  {
    id: 4,
    text: "あなたの「素直さ」を自負するなら？",
    options: [
      { label: "誰からのアドバイスも即実践できる！", points: { S: 2, E: 2 }, synchroEffect: 10 },
      { label: "納得いくまで質問して、自分の血肉にする", points: { I: 2, C: 2 }, synchroEffect: 6 },
      { label: "独自の解釈を加えて、より良くアレンジする", points: { A: 3 }, synchroEffect: 7 },
      { label: "黙々と実行し、結果で証明する", points: { R: 3 }, synchroEffect: 5 }
    ]
  },
  {
    id: 5,
    text: "休日、最もリフレッシュできる過ごし方は？",
    options: [
      { label: "大勢でわいわいイベントに参加！", points: { S: 3, E: 1 }, synchroEffect: 8 },
      { label: "一人で趣味の制作や勉強に没頭", points: { I: 3, A: 1 }, synchroEffect: 4 },
      { label: "デジタルデトックスして自然に触れる", points: { R: 2, S: 2 }, synchroEffect: 9 },
      { label: "溜まっていたタスクを片付け、整理整頓", points: { C: 3 }, synchroEffect: 5 }
    ]
  },
  {
    id: 6,
    text: "自分のアイデアが形になるなら、どんな風がいい？",
    options: [
      { label: "目の前の誰かが笑顔になる瞬間を見たい", points: { S: 3 }, synchroEffect: 10 },
      { label: "SNSで何万回もバズって世界に届きたい", points: { A: 3, E: 1 }, synchroEffect: 9 },
      { label: "業界の標準となるような堅実な仕組みにしたい", points: { C: 3, I: 1 }, synchroEffect: 5 },
      { label: "とにかく効率が上がり、皆の負担を減らしたい", points: { R: 2, I: 2 }, synchroEffect: 8 }
    ]
  },
  {
    id: 7,
    text: "スマホや最新ガジェット、あなたはどっち？",
    options: [
      { label: "使いこなして生活を効率化したい", points: { I: 2, C: 2 }, synchroEffect: 7 },
      { label: "新しい表現や発信に活用したい", points: { A: 3 }, synchroEffect: 8 },
      { label: "あまり興味はない、対面が一番！", points: { S: 3 }, synchroEffect: 6 },
      { label: "分解して中身がどうなっているか見たい", points: { R: 3 }, synchroEffect: 4 }
    ]
  },
  {
    id: 8,
    text: "将来、どんなリーダーになりたい？",
    options: [
      { label: "ビジョンを示し、皆を鼓舞するカリスマ", points: { E: 3, A: 1 }, synchroEffect: 8 },
      { label: "全員の意見を聞き、調和を図る支え役", points: { S: 3, C: 1 }, synchroEffect: 10 },
      { label: "専門知識で誰にも負けない頼れる先生", points: { I: 3, R: 1 }, synchroEffect: 6 },
      { label: "成果をきっちり管理し、組織を成長させるプロ", points: { C: 3, E: 1 }, synchroEffect: 5 }
    ]
  },
  {
    id: 9,
    text: "「介護プロフェッショナル」に必要なものは何だと思う？",
    options: [
      { label: "絶対的な「共感力」と「優しさ」", points: { S: 3 }, synchroEffect: 10 },
      { label: "状況を素早く判断する「決断力」", points: { E: 2, I: 2 }, synchroEffect: 7 },
      { label: "確かな根拠に基づく「技術力」", points: { R: 3 }, synchroEffect: 8 },
      { label: "組織を円滑に回す「事務管理力」", points: { C: 3 }, synchroEffect: 5 }
    ]
  },
  {
    id: 10,
    text: "10年後の自分はどうなっていたい？",
    options: [
      { label: "法人の役員として経営に携わっている", points: { E: 3, C: 1 }, synchroEffect: 9 },
      { label: "現場でレジェンドと呼ばれる専門家", points: { R: 3, S: 1 }, synchroEffect: 8 },
      { label: "福祉×ITの新しいサービスを創っている", points: { I: 2, A: 2 }, synchroEffect: 10 },
      { label: "地域の人々に愛される相談窓口の顔", points: { S: 3 }, synchroEffect: 9 }
    ]
  },
  {
    id: 11,
    text: "人から言われて嬉しい褒め言葉は？",
    options: [
      { label: "「あなたがいてくれて本当に良かった」", points: { S: 3 }, synchroEffect: 10 },
      { label: "「君のアイデア, 斬新で面白いね！」", points: { A: 3 }, synchroEffect: 9 },
      { label: "「仕事が速くて, 正確で助かるよ」", points: { C: 3 }, synchroEffect: 5 },
      { label: "「さすがリーダー, 皆ついていくよ」", points: { E: 3 }, synchroEffect: 8 }
    ]
  },
  {
    id: 12,
    text: "チームで衝突が起きたとき、あなたはどうする？",
    options: [
      { label: "中立の立場で双方の言い分を整理する", points: { C: 2, S: 2 }, synchroEffect: 7 },
      { label: "とりあえず飲みに行って腹を割って話す", points: { S: 3, E: 1 }, synchroEffect: 10 },
      { label: "論理的に解決策を提示し、納得させる", points: { I: 3 }, synchroEffect: 5 },
      { label: "新しい共通の敵（課題）を作って団結させる", points: { E: 2, A: 2 }, synchroEffect: 8 }
    ]
  },
  {
    id: 13,
    text: "さつき会が「福祉のイメージを壊す」と言っています。どう思う？",
    options: [
      { label: "最高にワクワクする！自分も壊したい", points: { A: 3, E: 1 }, synchroEffect: 10 },
      { label: "どうやって壊すのか、具体策を議論したい", points: { I: 3, C: 1 }, synchroEffect: 7 },
      { label: "大切な芯は残しつつ、進化させたい", points: { S: 3, R: 1 }, synchroEffect: 9 },
      { label: "今の良さを守ることこそが一番大事だと思う", points: { C: 3 }, synchroEffect: 5 }
    ]
  },
  {
    id: 14,
    text: "SNSで法人の魅力を発信するなら？",
    options: [
      { label: "感動の日常をストーリー性豊かに伝える", points: { S: 2, A: 2 }, synchroEffect: 9 },
      { label: "最新機器を使った「スマート福祉」を紹介する", points: { I: 3, R: 1 }, synchroEffect: 10 },
      { label: "職員たちの面白おかしい裏側を見せる", points: { A: 3, S: 1 }, synchroEffect: 8 },
      { label: "待遇や制度の充実を分かりやすくまとめる", points: { C: 3, E: 1 }, synchroEffect: 6 }
    ]
  },
  {
    id: 15,
    text: "最後の質問：池田さつき会で、あなたは「自分らしく」輝けそう？",
    options: [
      { label: "はい！ここなら自分の強みが出せそうです", points: { S: 2, E: 2, A: 2 }, synchroEffect: 10 },
      { label: "まだ分からないけど、挑戦してみたい！", points: { E: 2, I: 2 }, synchroEffect: 10 },
      { label: "自分のペースで、着実に馴染んでいきたい", points: { C: 2, R: 2 }, synchroEffect: 7 },
      { label: "まずは見学して、空気を感じてみたい", points: { S: 3 }, synchroEffect: 8 }
    ]
  }
];

export const JOBS: Job[] = [
  {
    id: 'A',
    title: "ギルドマスター",
    subTitle: "管理者候補",
    category: "MANAGEMENT",
    riasecPrimary: 'E',
    icon: "👑",
    color: "from-amber-400 to-orange-500",
    descriptions: {
      UR: "圧倒的統率力！理事長右腕の素質あり。あなたの決断力がさつき会の未来を拓く鍵になります。",
      SSR: "次世代のエース候補。抜群のリーダーシップで周囲を牽引する力があります。早期のキャリアアップが現実的です。",
      SR: "冷静な戦略家。周囲をまとめる調整役として期待大。次世代マネージャーへの最短距離にいます。",
      R: "信頼されるリーダーの原石。まずは現場で人望を集め、着実に管理職へのステップを登りましょう。"
    },
    messageFromSatsuki: "あなたは周囲を巻き込み、組織を導く才能に溢れています。さつき会では、入社1年目から現場の課題解決に主体的に関わることができ、あなたの『マネジメント視点』を磨くチャンスが無限にあります。自分だけの最強のチーム、ここで作りませんか？",
    seniorMessage: {
      name: "先輩社員",
      years: "入社10年",
      position: "特別養護老人ホーム 事務長",
      avatar: "👨‍💼",
      content: "27卒の皆さん、就活で『自分を消す』必要はありません。僕も10年前は不安でしたが、ここは若手の裁量が大きく、今では事務長として経営に携わっています。有給申請はスマホ1分, 理由は誰も聞きません。ライブ遠征も旅行も全力で楽しむのがうちのスタイル。君のリーダーシップを、最高の福利厚生の中で発揮してほしい。"
    }
  },
  {
    id: 'B',
    title: "聖騎士",
    subTitle: "現場スペシャリスト",
    category: "SPECIALIST",
    riasecPrimary: 'R',
    icon: "🛡️",
    color: "from-blue-400 to-indigo-600",
    descriptions: {
      UR: "共感の天才。利用者様の心に寄り添う伝説のケア職候補。あなたの優しさは法人の至宝となります。",
      SSR: "プロフェッショナルな技術者。高いスキルと深い知識で、現場の信頼を一身に集める存在です。",
      SR: "介護を極める職人肌。高い専門スキルを習得し、現場を支えるエースとしての活躍が目に浮かびます。",
      R: "周囲を癒やすムードメーカー。あなたの存在が現場に笑顔を生む。着実な成長で信頼のプロへ。"
    },
    messageFromSatsuki: "一つひとつの技術を丁寧に磨き、誰かの支えになれる。あなたの誠実さは福祉の原点そのものです。さつき会独自の『キャリア段位制度』なら、あなたの成長を可視化し、スペシャリストとしての市場価値を最大化することをお約束します。",
    seniorMessage: {
      name: "先輩社員",
      years: "入社5年",
      position: "特別養護老人ホーム フロアリーダー",
      avatar: "👩‍⚕️",
      content: "ぶっちゃけ『タイパ』重視で福祉を選びましたが、正解でした。タブレット活用で記録は爆速、持ち上げない介護技術で腰痛知らず。5年目でリーダーを任されてますが、有給は推し活のためにガッツリ消化してます（笑）。心理的安全性が高いから、後輩の失敗も『ナイス挑戦！』と笑える。自分らしさを捨てずに働ける場所ですよ。"
    }
  },
  {
    id: 'C',
    title: "賢者",
    subTitle: "人事・労務・経理",
    category: "BACK OFFICE",
    riasecPrimary: 'C',
    icon: "📜",
    color: "from-emerald-400 to-teal-600",
    descriptions: {
      UR: "組織の心臓。数字と人で法人を支える管理の要。あなたの緻密さが経営の基盤を作ります。",
      SSR: "頼れる守護神。完璧な事務処理能力で、法人のリスクをゼロにする最強のバックオフィサー。",
      SR: "論理的思考の持ち主。正確な事務処理と制度への深い理解で、職員が安心して働ける環境を守る逸材。",
      R: "縁の下の力持ち。法人の土台を支える管理部門の成長株。コツコツ積み上げる力が信頼に繋がります。"
    },
    messageFromSatsuki: "法人のガバナンスを支えるあなたの緻密さは、これからの福祉経営に不可欠です。現場の声を制度に反映し、『働きやすさ日本一』を裏側からデザインする。そんなクリエイティブなバックオフィス業務を、あなたにお任せしたいと考えています。",
    seniorMessage: {
      name: "先輩社員",
      years: "入社10年",
      position: "グループホーム 管理者",
      avatar: "👨‍💻",
      content: "就活って『自分を偽る作業』だと思ってませんか？さつき会は違いました。10年経ち、管理者として痛感するのは『自由な風土』の価値です。誰も休暇の理由を聞かない。自己研鑽も全力応援。スーツ不要, 本音での議論。堅苦しい社会人のイメージを壊したい27卒の君にこそ、僕らの現場を見に来てほしいです。"
    }
  },
  {
    id: 'D',
    title: "勇者",
    subTitle: "サブリーダー・総合職",
    category: "GENERALIST",
    riasecPrimary: 'E',
    icon: "⚔️",
    color: "from-red-400 to-rose-600",
    descriptions: {
      UR: "改革の旗手。福祉の常識を塗り替える挑戦者。あなたの「素直さ」と行動力が組織を動かします。",
      SSR: "マルチタスクの達人。どんな状況でも最適解を見つけ出す柔軟性は、まさに現代の勇者。",
      SR: "万能型の精鋭。どんな現場でも即戦力となる柔軟性が武器。新しい課題もあなたなら解決できるはず。",
      R: "期待のルーキー。柔軟な発想で、現場の課題を共に見直す姿勢が素晴らしい。未来を創る一員です。"
    },
    messageFromSatsuki: "好奇心旺盛で、変化を恐れないあなた。さつき会は今、まさに変革の真っ只中です。新しい技術の導入やイベント企画など、あなたの『やってみたい』を形にするフィールドは整っています。既存の枠を飛び越え、次世代の福祉を共に創りましょう！",
    seniorMessage: {
      name: "先輩社員",
      years: "入社5年",
      position: "特別養護老人ホーム ユニットリーダー",
      avatar: "🙋‍♂️",
      content: "27卒の君に伝えたいのは、『やりがいの搾取』がない環境の重要性です。さつき会は成果とプライベートを両立できるから、仕事が楽しい。趣味のカメラを活かして入居者様の笑顔を撮影し、広報にも関わっています。誰も否定せず, 面白がってくれる。自分の個性を消さずに働ける, ここは最高にエモい場所です。"
    }
  },
  {
    id: 'E',
    title: "特殊ジョブ",
    subTitle: "広報・SNS・DX担当",
    category: "CREATIVE",
    riasecPrimary: 'A',
    icon: "⚡",
    color: "from-purple-400 to-fuchsia-600",
    descriptions: {
      UR: "発信の神。さつき会の魅力を世界へ届ける主役。あなたの感性で「福祉のイメージ」を破壊して。",
      SSR: "バズを生む仕掛け人。鋭いトレンド感覚で、社会と福祉を繋ぐ新しい架け橋になれる逸材。",
      SR: "デジタルの開拓者。ITを武器に現場の負担を減らす変革者。最先端の福祉を共に形にしましょう。",
      R: "トレンドの目利き。若者の視点で新しい広報スタイルを作る。あなたの感性が法人の認知を広げます。"
    },
    messageFromSatsuki: "福祉×クリエイティブ。その可能性は無限大です。あなたのデジタルネイティブな感性や表現力を、社会貢献に直結させませんか？さつき会の公式SNSや新システムの構築など、あなたが主役になれる舞台を用意して待っています。",
    seniorMessage: {
      name: "先輩社員",
      years: "入社2年目",
      position: "特別養護老人ホーム ケアスタッフ",
      avatar: "💁‍♀️",
      content: "福祉を『映え』させるのが今の私のマイブーム。1年目からSNSの企画を任され、自分の投稿で学生が見学に来てくれるのが最高に嬉しい！タイパを意識した業務改善も歓迎されるし, 何より推し活のための連休が『スマホ完結』で取れるのが神。27卒の仲間と, 福祉のイメージをTikTokとかで爆破したいです（笑）"
    }
  },
  {
    id: 'F',
    title: "吟遊詩人",
    subTitle: "コミュ力特化・盛り上げ役",
    category: "COMMUNICATION",
    riasecPrimary: 'S',
    icon: "🎶",
    color: "from-yellow-300 to-amber-500",
    descriptions: {
      UR: "笑顔の魔法使い！あなたの明るさは現場の希望です。最高のコミュニケーションで笑顔の輪を広げて。",
      SSR: "心を繋ぐ通訳者。言葉にならない想いも汲み取る対話力で、誰からも愛される人気者。",
      SR: "聞き上手の達人。利用者様の想いを引き出す才能は唯一無二。場を和ませる力はチームの潤滑油です。",
      R: "期待のムードメーカー。親しみやすさは最大の武器。あなたの笑顔で、さつき会に新しい風を吹かせて。"
    },
    messageFromSatsuki: "あなたの明るい声、豊かな表情は、利用者様にとって何よりの特効薬です。コミュニケーションを『技術』として高められるさつき会の環境なら、あなたの人間力はさらに輝きます。地域に愛される『さつき会の顔』を、目指してみませんか？",
    seniorMessage: {
      name: "先輩社員",
      years: "入社5年",
      position: "デイサービス リーダー",
      avatar: "👩‍🎤",
      content: "人と話すのが好きなら、ここは『自己肯定感の爆上がりスポット』。お年寄りとの会話は毎日が新発見。27卒の皆が不安に思う人間関係も, ここは驚くほどフラット。推し活の連休も『楽しんでおいで！』と送り出してくれる。自分の個性を消さずに働ける居心地の良さ。偽りの自分を演じなくていい職場です。"
    }
  },
  {
    id: 'G',
    title: "守護者",
    subTitle: "寄り添い・安定型",
    category: "SUPPORT",
    riasecPrimary: 'S',
    icon: "🌿",
    color: "from-green-300 to-green-600",
    descriptions: {
      UR: "究極の寄り添い人。一人ひとりと深く向き合う姿勢は、福祉の原点。あなたの誠実さが安心を創ります。",
      SSR: "鉄壁のサポーター。どんな時も動じない安定感で、利用者様と職員の心の拠り所となります。",
      SR: "信頼の守り手。丁寧なケアと安定感で周囲に安らぎを与える存在。着実な歩みが大きな支えになります。",
      R: "成長する支援者。あなたの穏やかさは現場に不可欠な才能。じっくり時間をかけ、信頼の絆を深めて。"
    },
    messageFromSatsuki: "波風を立てず、静かに、でも確実に誰かを支える。その姿勢こそが、利用者様の安心の根源です。さつき会は、あなたの『安定感』を高く評価します。自分のペースを大切にしながら、着実にプロへと成長できる育成システムがここにはあります。",
    seniorMessage: {
      name: "先輩社員",
      years: "入社10年",
      position: "サービス付き高齢者向け住宅 管理者",
      avatar: "🧑‍🏫",
      content: "派手な活躍より、誰かの日常を静かに支えたい。そんな僕の性格に、さつき会はフィットしました。入社10年, 今は管理者ですが, 有給を自由に取れる文化は僕が守っています。スマホ申請で理由不問。自己研鑽も自分のタイミングでOK。ガツガツした就活に疲れたら, 一度うちの空気を吸いに来てください。"
    }
  },
  {
    id: 'H',
    title: "錬金術師",
    subTitle: "業務改善・DX改革型",
    category: "INNOVATION",
    riasecPrimary: 'I',
    icon: "🧪",
    color: "from-cyan-400 to-blue-500",
    descriptions: {
      UR: "効率化の天才。既存の仕組みを再構築し、現場を楽に変える発明家。あなたのアイデアが組織を救う。",
      SSR: "ロジカルな革命家。データと事実に基づく改善提案で、確実な成果を生み出す実力者。",
      SR: "改善の目利き。無駄を見抜き、より良い手法を提案する変革者。最先端の介護を共に創り上げましょう。",
      R: "期待のイノベーター。小さな気づきを形にする力。あなたの「もっと良くしたい」が現場の力になる。"
    },
    messageFromSatsuki: "『なぜこうなっているの？』というあなたの疑問が、さつき会をアップデートする原動力です。分析力と論理的思考を活かし、福祉の現場をよりスマートに、より創造的に変えていく。そんなイノベーターとしてのキャリア、ここから始めませんか？",
    seniorMessage: {
      name: "先輩社員",
      years: "入社8年",
      position: "訪問介護 サービス提供責任者",
      avatar: "🧪",
      content: "『福祉＝アナログ』という偏見はタイパの敵。さつき会はSlackやiPad活用が当たり前。入社8年, 僕はサビ管として現場をハックし続けてます。論理的に無駄を削り, 浮いた時間で全力で遊ぶ。そんな『賢い働き方』ができる仲間を待ってます。理由を言わずに取れる有休で, 自己研鑽も遊びも最大化しましょう。"
    }
  }
];
