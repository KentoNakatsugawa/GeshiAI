import { Customer, MeetingHistory, Seat, HotnessLevel, ActionStatus, Team, RepresentativeStatus } from '../types';

// 担当営業リスト
const representativesB2 = [
  'B2 佐藤幸大', 'B2 野田真輝', 'B2 森田彩友香', 'B2 小林眞翔',
  'B2 麻井俊宏', 'B2 河原塚美空', 'B2 阿久津直希', 'B2 芥川陽菜',
  'B2 熊谷愛花', 'B2 阿部樹', 'B2 佐藤誠哉', 'B2 魚住克志'
];

const representativesB1 = [
  'B1 梅木康裕', 'B1 大久保琴未', 'B1 清野勇人', 'B1 佐藤佳史',
  'B1 小川凜花', 'B1 中村柚稀', 'B1 長田周士', 'B1 瀧沢愛',
  'B1 金子愛実', 'B1 片岡憲太', 'B1 林裕人'
];

// 現在時刻から指定分前の時刻を生成
const getTimeMinutesAgo = (minutes: number): Date => {
  const now = new Date();
  return new Date(now.getTime() - minutes * 60 * 1000);
};

// モック顧客データ - B2チーム (10席)
export const mockCustomersTeamB2: Customer[] = [
  {
    id: 'b2-2',
    customerName: '鈴木 花子',
    meetingTime: getTimeMinutesAgo(32),
    representativeName: representativesB2[1],
    hotness: 'A',
    status: '入金確認',
    seatNumber: 2,
    team: 'B2',
    negotiationType: '新規',
    currentTopic: '入金方法の確認中。ローン審査結果を説明している。',
    script: '入金確認スクリプト: 審査結果をお伝えします。月々のお支払いは...',
  },
  {
    id: 'b2-3',
    customerName: '高橋 健一',
    meetingTime: getTimeMinutesAgo(18),
    representativeName: representativesB2[2],
    hotness: 'B',
    status: 'スコアプレゼン',
    seatNumber: 3,
    team: 'B2',
    negotiationType: '再交渉',
    currentTopic: '前回より条件改善。金利プランの再提案中。',
    script: 'スコアプレゼン: お客様のスコアに基づき、最適なプランをご提案...',
  },
  {
    id: 'b2-4',
    customerName: '伊藤 美咲',
    meetingTime: getTimeMinutesAgo(55),
    representativeName: representativesB2[3],
    hotness: 'A',
    status: '契約作業中',
    seatNumber: 4,
    team: 'B2',
    negotiationType: '新規',
    currentTopic: '契約書の記入中。保証内容の最終確認。',
    script: '契約締結: 契約内容をご確認ください。保証期間は...',
  },
  {
    id: 'b2-5',
    customerName: '渡辺 直樹',
    meetingTime: getTimeMinutesAgo(8),
    representativeName: representativesB2[4],
    hotness: 'C',
    status: 'ヒアリング',
    seatNumber: 5,
    team: 'B2',
    negotiationType: '新規',
    currentTopic: '初回ヒアリング。予算と希望車種を確認中。',
    script: 'ヒアリング: お車のご利用目的をお聞かせください...',
  },
  {
    id: 'b2-6',
    customerName: '小林 裕子',
    meetingTime: getTimeMinutesAgo(27),
    representativeName: representativesB2[5],
    hotness: 'S',
    status: '契約後対応',
    seatNumber: 7,
    team: 'B2',
    negotiationType: '新規',
    currentTopic: '納車日程の調整。オプション取付の確認。',
    script: '契約後フォロー: 納車予定日は○月○日となります...',
  },
  {
    id: 'b2-7',
    customerName: '加藤 大輔',
    meetingTime: getTimeMinutesAgo(12),
    representativeName: representativesB2[6],
    hotness: 'B',
    status: '初期スコア車両提示',
    seatNumber: 8,
    team: 'B2',
    negotiationType: '新規',
    currentTopic: '在庫車両3台を提示。色と装備の説明中。',
    script: '車両提示: こちらが今月のおすすめ車両です...',
  },
];

// モック顧客データ - B1チーム (10席)
export const mockCustomersTeamB1: Customer[] = [
  {
    id: 'b1-1',
    customerName: '吉田 真理',
    meetingTime: getTimeMinutesAgo(5),
    representativeName: representativesB1[0],
    hotness: 'D',
    status: 'ヒアリング',
    seatNumber: 1,
    team: 'B1',
    negotiationType: '新規',
    currentTopic: '初回来店。ご要望をヒアリング中。',
    script: 'ヒアリング: 本日はご来店ありがとうございます...',
  },
  {
    id: 'b1-2',
    customerName: '山本 拓也',
    meetingTime: getTimeMinutesAgo(38),
    representativeName: representativesB1[1],
    hotness: 'A',
    status: 'スコアプレゼン',
    seatNumber: 2,
    team: 'B1',
    negotiationType: '新規',
    currentTopic: 'スコア結果の説明。金利条件の詳細を案内中。',
    script: 'スコアプレゼン: 審査結果が出ましたのでご説明します...',
  },
  {
    id: 'b1-3',
    customerName: '中村 恵子',
    meetingTime: getTimeMinutesAgo(22),
    representativeName: representativesB1[2],
    hotness: 'C',
    status: '入金確認',
    seatNumber: 4,
    team: 'B1',
    negotiationType: '再交渉',
    currentTopic: '頭金の増額検討中。支払いシミュレーション中。',
    script: '入金確認: ご希望の支払い方法を確認させてください...',
  },
  {
    id: 'b1-4',
    customerName: '松本 健太',
    meetingTime: getTimeMinutesAgo(75),
    representativeName: representativesB1[3],
    hotness: 'E',
    status: 'ヒアリング',
    seatNumber: 5,
    team: 'B1',
    negotiationType: '新規',
    currentTopic: '長時間商談。家族構成と利用シーンを詳しく確認中。',
    script: 'ヒアリング: ご家族でのご利用シーンをお聞かせください...',
  },
  {
    id: 'b1-5',
    customerName: '井上 由美',
    meetingTime: getTimeMinutesAgo(48),
    representativeName: representativesB1[4],
    hotness: 'B',
    status: 'クロージング',
    seatNumber: 6,
    team: 'B1',
    negotiationType: '新規',
    currentTopic: '最終価格の交渉中。下取り査定額を提示。',
    script: 'クロージング: 本日ご契約いただける場合、特別価格で...',
  },
  {
    id: 'b1-6',
    customerName: '木村 翔太',
    meetingTime: getTimeMinutesAgo(33),
    representativeName: representativesB1[5],
    hotness: 'A',
    status: '納車流れ',
    seatNumber: 8,
    team: 'B1',
    negotiationType: '新規',
    currentTopic: '納車の流れを説明。必要書類の確認中。',
    script: '納車説明: 納車までの流れをご説明します...',
  },
  {
    id: 'b1-7',
    customerName: '林 美紀',
    meetingTime: getTimeMinutesAgo(10),
    representativeName: representativesB1[6],
    hotness: 'D',
    status: '初期スコア車両提示',
    seatNumber: 9,
    team: 'B1',
    negotiationType: '再交渉',
    currentTopic: '前回と異なる車種を提案中。',
    script: '車両提示: 前回ご検討いただいた車種とは別に...',
  },
  {
    id: 'b1-8',
    customerName: '斎藤 浩一',
    meetingTime: getTimeMinutesAgo(90),
    representativeName: representativesB1[7],
    hotness: 'S',
    status: '契約作業中',
    seatNumber: 10,
    team: 'B1',
    negotiationType: '新規',
    currentTopic: '契約書記入中。重要事項説明が完了。',
    script: '契約締結: 重要事項の説明は以上となります...',
  },
];

// 全顧客データ
export const mockCustomers: Customer[] = [...mockCustomersTeamB2, ...mockCustomersTeamB1];

// 商談履歴モックデータ
export const mockMeetingHistory: MeetingHistory[] = [
  {
    id: 'h1',
    customerId: 'b2-1',
    date: new Date('2024-01-10T10:00:00'),
    notes: '初回ヒアリング完了。予算は300万円程度。ファミリーカーを希望。',
    nextAction: '在庫車両の提案準備',
  },
  {
    id: 'h2',
    customerId: 'b2-1',
    date: new Date('2024-01-12T14:00:00'),
    notes: 'スコアプレゼン実施。審査通過見込み。',
    nextAction: '見積書の作成',
  },
  {
    id: 'h3',
    customerId: 'b2-1',
    date: new Date('2024-01-15T10:00:00'),
    notes: 'クロージング商談中。契約書準備完了。',
    nextAction: '契約締結',
  },
];

// 休憩中の担当者（各チーム1名程度）
const breakingRepresentatives: Record<Team, number[]> = {
  'B1': [3],  // 席番号3の担当者は休憩中
  'B2': [6],  // 席番号6の担当者は休憩中
};

// チーム別座席配置生成（各チーム10席）
export const generateSeatsForTeam = (team: Team, customers: Customer[]): Seat[] => {
  const totalSeats = 10;
  const seats: Seat[] = [];
  const teamCustomers = customers.filter(c => c.team === team);
  const representatives = team === 'B1' ? representativesB1 : representativesB2;
  const breakingSeats = breakingRepresentatives[team];

  for (let i = 1; i <= totalSeats; i++) {
    const customer = teamCustomers.find(c => c.seatNumber === i) || null;
    // 担当者名: 商談中ならcustomerから、空席なら座席番号に基づいて割り当て
    const representativeName = customer
      ? customer.representativeName
      : representatives[i - 1] || `${team} 担当${i}`;

    // 担当者ステータスを決定
    let representativeStatus: RepresentativeStatus;
    if (customer) {
      representativeStatus = '商談中';
    } else if (breakingSeats.includes(i)) {
      representativeStatus = '休憩中';
    } else {
      representativeStatus = '待機中';
    }

    seats.push({
      seatNumber: i,
      customer,
      isOccupied: customer !== null,
      team,
      representativeName,
      representativeStatus,
    });
  }

  return seats;
};

// 全座席配置生成（後方互換用）
export const generateSeats = (customers: Customer[]): Seat[] => {
  return [
    ...generateSeatsForTeam('B2', customers),
    ...generateSeatsForTeam('B1', customers),
  ];
};

// マトリックスデータ生成（HOT度 × 行動）
export const generateMatrixData = (customers: Customer[]): Map<string, Customer[]> => {
  const matrix = new Map<string, Customer[]>();

  customers.forEach(customer => {
    const key = `${customer.hotness}-${customer.status}`;
    const existing = matrix.get(key) || [];
    matrix.set(key, [...existing, customer]);
  });

  return matrix;
};

// HOT度別の顧客数を取得
export const getCustomerCountByHotness = (customers: Customer[]): Record<HotnessLevel, number> => {
  const counts: Record<HotnessLevel, number> = {
    'S': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0
  };

  customers.forEach(customer => {
    counts[customer.hotness]++;
  });

  return counts;
};

// 行動別の顧客数を取得
export const getCustomerCountByStatus = (customers: Customer[]): Record<ActionStatus, number> => {
  const counts: Record<ActionStatus, number> = {
    '契約作業中': 0,
    '契約後対応': 0,
    'クロージング': 0,
    '入金確認': 0,
    '納車流れ': 0,
    '初期スコア車両提示': 0,
    'スコアプレゼン': 0,
    'ヒアリング': 0,
  };

  customers.forEach(customer => {
    counts[customer.status]++;
  });

  return counts;
};

// 実績サマリー用データ（今月）
export const getMonthlySummary = () => {
  return {
    contracts: 23,      // 今月の契約数
    meetings: 156,      // 今月の商談数
    calls: 342,         // 今月の通話数
    conversionRate: 14.7, // 契約率
  };
};
