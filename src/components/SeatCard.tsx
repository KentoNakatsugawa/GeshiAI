import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Seat, hotnessColors } from '../types';

interface SeatCardProps {
  seat: Seat;
}

const SeatCard = ({ seat }: SeatCardProps) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const { customer, seatNumber, representativeName, representativeStatus } = seat;

  // 経過時間を計算
  const getElapsedTime = (meetingTime: Date): { text: string; minutes: number } => {
    const now = new Date();
    const diff = now.getTime() - meetingTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return { text: `${hours}時間${minutes % 60}分`, minutes };
    }
    return { text: `${minutes}分`, minutes };
  };

  // 長時間アラート判定（60分以上）
  const isLongMeeting = (meetingTime: Date): boolean => {
    const now = new Date();
    const diff = now.getTime() - meetingTime.getTime();
    const minutes = Math.floor(diff / 60000);
    return minutes >= 60;
  };

  // カードクリック時の処理
  const handleCardClick = () => {
    if (customer) {
      setIsExpanded(!isExpanded);
    }
  };

  // 詳細ページへ移動
  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (customer) {
      navigate(`/detail/${customer.id}`);
    }
  };

  // 休憩中の場合
  if (representativeStatus === '休憩中') {
    return (
      <div className="flex flex-col items-center opacity-50">
        <div className="w-full bg-amber-50 rounded-xl sm:rounded-2xl border border-amber-200 p-2 sm:p-4 relative">
          {/* 座席番号 */}
          <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 text-amber-500 text-[10px] sm:text-xs font-medium">
            席 {seatNumber}
          </div>

          {/* 休憩中表示 */}
          <div className="flex flex-col items-center pt-4 sm:pt-5 pb-2 sm:pb-3">
            {/* 休憩アイコン */}
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-amber-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <span className="text-xl sm:text-2xl">☕</span>
            </div>

            {/* 担当者名 */}
            <p className="text-sm sm:text-base text-amber-700 font-bold truncate max-w-full">
              {representativeName.replace(/^B[12]\s/, '')}
            </p>

            {/* 休憩中テキスト */}
            <p className="text-[10px] sm:text-xs text-amber-500 mt-1 font-medium">
              休憩中
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 待機中の場合
  if (representativeStatus === '待機中' || !customer) {
    return (
      <div className="flex flex-col items-center opacity-40">
        <div className="w-full bg-gray-100 rounded-xl sm:rounded-2xl border border-gray-200 p-2 sm:p-4 relative">
          {/* 座席番号 */}
          <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 text-gray-400 text-[10px] sm:text-xs font-medium">
            席 {seatNumber}
          </div>

          {/* シンプルな待機中表示 */}
          <div className="flex flex-col items-center pt-4 sm:pt-5 pb-2 sm:pb-3">
            {/* 人物アイコン */}
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gray-200 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-7 sm:w-8 h-7 sm:h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>

            {/* 担当者名 */}
            <p className="text-sm sm:text-base text-gray-700 font-bold truncate max-w-full">
              {representativeName.replace(/^B[12]\s/, '')}
            </p>

            {/* 待機中テキスト */}
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
              待機中
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 商談中の場合
  const hotnessColorMap = {
    'S': { bg: 'from-red-50 to-red-100', border: 'border-red-300', accent: 'bg-red-500', light: 'bg-red-100', text: 'text-red-600' },
    'A': { bg: 'from-orange-50 to-orange-100', border: 'border-orange-300', accent: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600' },
    'B': { bg: 'from-yellow-50 to-yellow-100', border: 'border-yellow-300', accent: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-600' },
    'C': { bg: 'from-green-50 to-green-100', border: 'border-green-300', accent: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' },
    'D': { bg: 'from-blue-50 to-blue-100', border: 'border-blue-300', accent: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600' },
    'E': { bg: 'from-gray-50 to-gray-100', border: 'border-gray-300', accent: 'bg-gray-500', light: 'bg-gray-100', text: 'text-gray-600' },
  };

  const colors = hotnessColorMap[customer.hotness];
  const elapsed = getElapsedTime(customer.meetingTime);
  const isLong = isLongMeeting(customer.meetingTime);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-full bg-gradient-to-b ${colors.bg} rounded-xl sm:rounded-2xl border-2 ${colors.border} shadow-sm p-2 sm:p-4 relative overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-[1.02] ${isLong ? 'ring-2 ring-red-400 ring-offset-1' : ''}`}
        onClick={handleCardClick}
      >
        {/* 長時間アラート */}
        {isLong && (
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] sm:border-t-[32px] border-t-red-500 border-l-[24px] sm:border-l-[32px] border-l-transparent z-30">
            <span className="absolute -top-5 sm:-top-7 right-0.5 sm:right-1 text-white text-[8px] sm:text-[10px] font-bold">!</span>
          </div>
        )}

        {/* HOT度バッジ */}
        <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 z-20 flex flex-col items-center">
          <span className="text-[6px] sm:text-[8px] font-bold text-gray-500 leading-none mb-0.5">HOT</span>
          <div className={`${hotnessColors[customer.hotness]} text-white text-[10px] sm:text-xs font-bold w-5 sm:w-7 h-5 sm:h-7 rounded-full flex items-center justify-center shadow-lg`}>
            {customer.hotness}
          </div>
        </div>

        {/* 座席番号 + 新規/再交渉バッジ */}
        <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 flex items-center gap-1">
          <span className="bg-white/90 text-gray-500 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium shadow-sm">
            席 {seatNumber}
          </span>
          <span className={`text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
            customer.negotiationType === '新規'
              ? 'bg-blue-500 text-white'
              : 'bg-purple-500 text-white'
          }`}>
            {customer.negotiationType}
          </span>
        </div>

        {/* メインコンテンツ */}
        <div className="flex flex-col items-center pt-7 sm:pt-8 pb-1">
          {/* 経過時間（大きく表示） */}
          <div className={`mb-2 sm:mb-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full ${isLong ? 'bg-red-100 border border-red-300' : 'bg-white/80 border border-gray-200'}`}>
            <p className={`text-sm sm:text-lg font-bold flex items-center gap-1 ${isLong ? 'text-red-600' : 'text-primary'}`}>
              ⏱ {elapsed.text}
            </p>
          </div>

          {/* 顧客名 */}
          <p className="text-xs sm:text-sm text-text-primary font-bold truncate max-w-full mb-1">
            {customer.customerName} 様
          </p>

          {/* ステータス */}
          <span className={`inline-block text-[9px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium ${colors.light} ${colors.text} border ${colors.border}`}>
            {customer.status}
          </span>

          {/* 担当者名（大きく表示） */}
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200 w-full text-center">
            <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5">担当</p>
            <p className="text-sm sm:text-base text-text-primary font-bold truncate">
              {customer.representativeName.replace(/^B[12]\s/, '')}
            </p>
          </div>
        </div>

        {/* 展開時の詳細表示 */}
        {isExpanded && (
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-300">
            {/* 現在の商談内容 */}
            {customer.currentTopic && (
              <div className="mb-2 sm:mb-3">
                <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium mb-1">💬 現在の話題</p>
                <p className="text-[10px] sm:text-xs text-text-primary bg-white/60 rounded-lg p-2">
                  {customer.currentTopic}
                </p>
              </div>
            )}

            {/* スクリプト（教育用） */}
            {customer.script && (
              <div className="mb-2 sm:mb-3">
                <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium mb-1">📋 スクリプト</p>
                <p className="text-[10px] sm:text-xs text-blue-700 bg-blue-50 rounded-lg p-2 border border-blue-200">
                  {customer.script}
                </p>
              </div>
            )}

            {/* 詳細ページへのリンク */}
            <button
              onClick={handleDetailClick}
              className="w-full text-[10px] sm:text-xs text-white bg-primary hover:bg-primary/90 rounded-lg py-1.5 sm:py-2 font-medium transition-colors"
            >
              詳細を見る →
            </button>
          </div>
        )}

        {/* タップで展開ヒント */}
        {!isExpanded && (
          <div className="mt-1 text-center">
            <p className="text-[8px] sm:text-[10px] text-gray-400">タップで詳細</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatCard;
