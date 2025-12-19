import { useNavigate } from 'react-router-dom';
import { Seat, hotnessColors } from '../types';

interface SeatCardProps {
  seat: Seat;
}

const SeatCard = ({ seat }: SeatCardProps) => {
  const navigate = useNavigate();
  const { customer, seatNumber, isOccupied } = seat;

  // 経過時間を計算
  const getElapsedTime = (meetingTime: Date): string => {
    const now = new Date();
    const diff = now.getTime() - meetingTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}時間${minutes % 60}分`;
    }
    return `${minutes}分`;
  };

  // 商談していない場合（担当者が作業中）
  if (!isOccupied || !customer) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-full bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-2 sm:p-4 relative overflow-hidden">
          {/* 背景パターン */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)',
              backgroundSize: '10px 10px'
            }} />
          </div>

          {/* 座席番号 */}
          <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-gray-100 text-gray-400 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium">
            席 {seatNumber}
          </div>

          {/* 作業中のシーン */}
          <div className="flex flex-col items-center pt-5 sm:pt-6 pb-1 sm:pb-2 relative z-10">
            {/* デスク上面（俯瞰図） */}
            <div className="w-full bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg p-2 sm:p-3 border border-amber-300 shadow-inner relative">
              {/* PCモニター */}
              <div className="w-6 sm:w-8 h-4 sm:h-6 bg-gray-700 rounded-sm mx-auto mb-1 relative">
                <div className="absolute inset-0.5 bg-blue-400 rounded-sm animate-pulse opacity-80" />
              </div>
              {/* キーボード */}
              <div className="w-8 sm:w-10 h-1.5 sm:h-2 bg-gray-300 rounded-sm mx-auto" />
            </div>

            {/* 担当者（椅子に座っている） */}
            <div className="relative -mt-2">
              {/* 椅子の背もたれ */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-2 sm:h-3 bg-gray-400 rounded-t-lg" />
              {/* 人物 */}
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full flex items-center justify-center border-2 border-gray-400 relative z-10">
                <svg className="w-4 sm:w-6 h-4 sm:h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              {/* 作業中インジケーター */}
              <div className="absolute -top-1 -right-1 flex space-x-0.5">
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>

            <p className="text-[10px] sm:text-xs text-gray-400 mt-2 sm:mt-3 font-medium">作業中...</p>
          </div>
        </div>
      </div>
    );
  }

  // 商談中の場合（顧客と担当者が向かい合っている）
  const hotnessColorMap = {
    'S': { bg: 'from-red-50 to-red-100', border: 'border-red-300', accent: 'bg-red-500', light: 'bg-red-100', text: 'text-red-600' },
    'A': { bg: 'from-orange-50 to-orange-100', border: 'border-orange-300', accent: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600' },
    'B': { bg: 'from-yellow-50 to-yellow-100', border: 'border-yellow-300', accent: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-600' },
    'C': { bg: 'from-green-50 to-green-100', border: 'border-green-300', accent: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' },
    'D': { bg: 'from-blue-50 to-blue-100', border: 'border-blue-300', accent: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600' },
    'E': { bg: 'from-gray-50 to-gray-100', border: 'border-gray-300', accent: 'bg-gray-500', light: 'bg-gray-100', text: 'text-gray-600' },
  };

  const colors = hotnessColorMap[customer.hotness];

  return (
    <div
      className="flex flex-col items-center cursor-pointer group"
      onClick={() => navigate(`/detail/${customer.id}`)}
    >
      <div className={`w-full bg-gradient-to-b ${colors.bg} rounded-xl sm:rounded-2xl border-2 ${colors.border} shadow-sm p-2 sm:p-4 relative overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.03]`}>
        {/* HOT度バッジ */}
        <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 z-20 flex flex-col items-center">
          <span className="text-[6px] sm:text-[8px] font-bold text-gray-500 leading-none mb-0.5">HOT</span>
          <div className={`${hotnessColors[customer.hotness]} text-white text-[10px] sm:text-xs font-bold w-5 sm:w-7 h-5 sm:h-7 rounded-full flex items-center justify-center shadow-lg`}>
            {customer.hotness}
          </div>
        </div>

        {/* 座席番号 */}
        <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-white/90 text-gray-500 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium shadow-sm">
          席 {seatNumber}
        </div>

        {/* 商談シーン（俯瞰図） */}
        <div className="flex flex-col items-center pt-4 sm:pt-5 pb-0.5 sm:pb-1">
          {/* お客様（上側） */}
          <div className="flex flex-col items-center mb-1.5 sm:mb-2">
            {/* 椅子 */}
            <div className={`w-8 sm:w-10 h-1.5 sm:h-2 ${colors.light} rounded-b-lg border ${colors.border} border-t-0`} />
            {/* 人物 */}
            <div className={`w-8 sm:w-11 h-8 sm:h-11 ${colors.light} rounded-full flex items-center justify-center border-2 ${colors.border} -mt-1 relative`}>
              <svg className={`w-4 sm:w-6 h-4 sm:h-6 ${colors.text}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              {/* 話している吹き出し */}
              <div className="absolute -right-1.5 sm:-right-2 -top-0.5 sm:-top-1 text-sm sm:text-lg animate-bounce">💬</div>
            </div>
            <p className="text-[9px] sm:text-[11px] text-text-primary font-bold truncate max-w-full mt-0.5 sm:mt-1">
              {customer.customerName}様
            </p>
          </div>

          {/* 商談テーブル */}
          <div className={`w-full ${colors.accent} rounded-lg py-1 sm:py-1.5 px-1.5 sm:px-2 shadow-md relative`}>
            <div className="flex items-center justify-center gap-1">
              <span className="text-white text-[8px] sm:text-[10px] font-bold">🤝 商談中</span>
            </div>
            {/* テーブルの光沢 */}
            <div className="absolute inset-x-2 top-0.5 h-0.5 sm:h-1 bg-white/30 rounded-full" />
          </div>

          {/* 担当者（下側） */}
          <div className="flex flex-col items-center mt-1.5 sm:mt-2">
            {/* 人物 */}
            <div className="w-8 sm:w-11 h-8 sm:h-11 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-300 relative">
              <svg className="w-4 sm:w-6 h-4 sm:h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              {/* 資料アイコン */}
              <div className="absolute -left-1.5 sm:-left-2 -top-0.5 sm:-top-1 text-xs sm:text-sm">📋</div>
            </div>
            {/* 椅子 */}
            <div className="w-8 sm:w-10 h-1.5 sm:h-2 bg-blue-100 rounded-t-lg border border-blue-300 border-b-0 -mt-1" />
            <p className="text-[8px] sm:text-[10px] text-text-secondary truncate max-w-full mt-0.5 sm:mt-1">
              {customer.representativeName.replace(/^B[12]\s/, '')}
            </p>
          </div>
        </div>

        {/* 行動ステータス */}
        <div className="mt-1.5 sm:mt-2 text-center">
          <div className="inline-flex flex-col items-center">
            <span className="text-[6px] sm:text-[8px] font-bold text-gray-400 leading-none mb-0.5">商談ステータス</span>
            <span className={`inline-block text-[8px] sm:text-[10px] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium ${colors.light} ${colors.text} border ${colors.border}`}>
              {customer.status}
            </span>
          </div>
        </div>
      </div>

      {/* 経過時間 */}
      <div className="mt-1.5 sm:mt-2 text-center bg-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm border border-gray-100">
        <p className="text-[10px] sm:text-xs text-primary font-bold">
          ⏱ {getElapsedTime(customer.meetingTime)}
        </p>
      </div>
    </div>
  );
};

export default SeatCard;
