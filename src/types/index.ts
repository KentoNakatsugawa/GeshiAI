// HOT度レベル
export type HotnessLevel = 'S' | 'A' | 'B' | 'C' | 'D' | 'E';

// 行動ステータス
export type ActionStatus =
  | 'クロージング'
  | '入金確認'
  | '納車流れ'
  | '初期スコア車両提示'
  | 'スコアプレゼン'
  | 'ヒアリング';

// チーム
export type Team = 'B1' | 'B2';

// 顧客情報
export interface Customer {
  id: string;
  customerName: string;      // 顧客名
  meetingTime: Date;         // 商談時間
  representativeName: string; // 担当者名
  hotness: HotnessLevel;     // HOT度
  status: ActionStatus;      // 行動
  seatNumber: number;        // 座席番号
  team: Team;                // チーム
}

// 商談履歴
export interface MeetingHistory {
  id: string;
  customerId: string;
  date: Date;
  notes: string;
  nextAction: string;
}

// 座席情報
export interface Seat {
  seatNumber: number;
  customer: Customer | null;
  isOccupied: boolean;
  team: Team;
}

// HOT度のカラーマッピング
export const hotnessColors: Record<HotnessLevel, string> = {
  'S': 'bg-hot-s',
  'A': 'bg-hot-a',
  'B': 'bg-hot-b',
  'C': 'bg-hot-c',
  'D': 'bg-hot-d',
  'E': 'bg-hot-e',
};

// HOT度のテキストカラーマッピング
export const hotnessTextColors: Record<HotnessLevel, string> = {
  'S': 'text-hot-s',
  'A': 'text-hot-a',
  'B': 'text-hot-b',
  'C': 'text-hot-c',
  'D': 'text-hot-d',
  'E': 'text-hot-e',
};

// 行動ステータスの順序（UI表示順：左から右）
export const actionStatusOrder: ActionStatus[] = [
  'クロージング',
  '入金確認',
  '納車流れ',
  '初期スコア車両提示',
  'スコアプレゼン',
  'ヒアリング',
];

// HOT度の順序
export const hotnessOrder: HotnessLevel[] = ['S', 'A', 'B', 'C', 'D', 'E'];
