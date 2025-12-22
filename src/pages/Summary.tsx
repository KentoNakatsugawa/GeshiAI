import { getMonthlySummary, mockCustomers } from '../data/mockData';
import { Team } from '../types';

const Summary = () => {
  const summary = getMonthlySummary();

  // チーム別集計
  const teamStats: Record<Team, { meetings: number; contracts: number }> = {
    'B1': {
      meetings: mockCustomers.filter(c => c.team === 'B1').length,
      contracts: 12,
    },
    'B2': {
      meetings: mockCustomers.filter(c => c.team === 'B2').length,
      contracts: 11,
    },
  };

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* ページヘッダー */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary mb-1 sm:mb-2">
            実績サマリー
          </h1>
          <p className="text-sm sm:text-base text-text-secondary">
            今月の営業実績
          </p>
        </div>

        {/* メイン指標 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* 契約数 */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border-accent shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg sm:text-xl">📝</span>
              <span className="text-xs sm:text-sm text-text-secondary font-medium">契約数</span>
            </div>
            <p className="text-2xl sm:text-4xl font-bold text-primary">{summary.contracts}</p>
            <p className="text-[10px] sm:text-xs text-text-secondary mt-1">今月</p>
          </div>

          {/* 商談数 */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border-accent shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg sm:text-xl">🤝</span>
              <span className="text-xs sm:text-sm text-text-secondary font-medium">商談数</span>
            </div>
            <p className="text-2xl sm:text-4xl font-bold text-emerald-600">{summary.meetings}</p>
            <p className="text-[10px] sm:text-xs text-text-secondary mt-1">今月</p>
          </div>

          {/* 通話数 */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border-accent shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg sm:text-xl">📞</span>
              <span className="text-xs sm:text-sm text-text-secondary font-medium">通話数</span>
            </div>
            <p className="text-2xl sm:text-4xl font-bold text-blue-600">{summary.calls}</p>
            <p className="text-[10px] sm:text-xs text-text-secondary mt-1">今月</p>
          </div>

          {/* 契約率 */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border-accent shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg sm:text-xl">📊</span>
              <span className="text-xs sm:text-sm text-text-secondary font-medium">契約率</span>
            </div>
            <p className="text-2xl sm:text-4xl font-bold text-amber-600">{summary.conversionRate}%</p>
            <p className="text-[10px] sm:text-xs text-text-secondary mt-1">商談→契約</p>
          </div>
        </div>

        {/* チーム別実績 */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border-accent mb-6 sm:mb-8">
          <h2 className="text-sm sm:text-lg font-bold text-text-primary mb-4">チーム別実績</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* B1チーム */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">B1</span>
                </div>
                <span className="text-sm font-bold text-blue-700">B1 チーム</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] sm:text-xs text-blue-600 mb-1">現在商談中</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-700">{teamStats.B1.meetings}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-blue-600 mb-1">今月契約</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-700">{teamStats.B1.contracts}</p>
                </div>
              </div>
            </div>

            {/* B2チーム */}
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">B2</span>
                </div>
                <span className="text-sm font-bold text-emerald-700">B2 チーム</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] sm:text-xs text-emerald-600 mb-1">現在商談中</p>
                  <p className="text-xl sm:text-2xl font-bold text-emerald-700">{teamStats.B2.meetings}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-emerald-600 mb-1">今月契約</p>
                  <p className="text-xl sm:text-2xl font-bold text-emerald-700">{teamStats.B2.contracts}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 今日の注目ポイント */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border-accent">
          <h2 className="text-sm sm:text-lg font-bold text-text-primary mb-4">今日の注目</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <span className="text-lg">⚠️</span>
              <div>
                <p className="text-sm font-medium text-red-700">長時間商談アラート</p>
                <p className="text-xs text-red-600">2件の商談が60分を超えています。フォローが必要かもしれません。</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-lg">🎉</span>
              <div>
                <p className="text-sm font-medium text-green-700">契約間近</p>
                <p className="text-xs text-green-600">3件のHOT度Sランク商談が進行中です。</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-lg">📈</span>
              <div>
                <p className="text-sm font-medium text-blue-700">好調</p>
                <p className="text-xs text-blue-600">今月の契約数は先月同日比で+15%です。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
