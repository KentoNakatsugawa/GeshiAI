import SeatCard from '../components/SeatCard';
import { mockCustomers, generateSeatsForTeam } from '../data/mockData';
import { Team } from '../types';

const Dashboard = () => {
  const seatsTeamB2 = generateSeatsForTeam('B2', mockCustomers);
  const seatsTeamB1 = generateSeatsForTeam('B1', mockCustomers);

  const teamB2Customers = mockCustomers.filter(c => c.team === 'B2');
  const teamB1Customers = mockCustomers.filter(c => c.team === 'B1');

  // チームリーダー情報
  const teamLeaders: Record<Team, string> = {
    'B1': '小西',
    'B2': '佐藤',
  };

  // チームセクションコンポーネント
  const TeamSection = ({ team, seats, customerCount }: { team: Team; seats: typeof seatsTeamB2; customerCount: number }) => {
    // 商談中の席のみをフィルタ
    const occupiedSeats = seats.filter(seat => seat.isOccupied);

    return (
      <div className="bg-white rounded-xl sm:rounded-2xl border border-border-accent overflow-hidden">
        {/* チームヘッダー */}
        <div className={`px-3 sm:px-6 py-2.5 sm:py-4 ${team === 'B1' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-emerald-500 to-emerald-600'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-sm sm:text-lg font-bold">{team}</span>
              </div>
              <div>
                <h2 className="text-sm sm:text-lg font-bold text-white">{team} チーム</h2>
                <p className="text-white/80 text-[10px] sm:text-xs">リーダー：{teamLeaders[team]}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl sm:text-3xl font-bold text-white">{customerCount}</span>
              <span className="text-white/80 text-xs sm:text-sm ml-1">名商談中</span>
            </div>
          </div>
        </div>

        {/* 座席グリッド */}
        <div className="p-3 sm:p-6">
          {occupiedSeats.length > 0 ? (
            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
              {occupiedSeats.map((seat) => (
                <SeatCard key={`${team}-${seat.seatNumber}`} seat={seat} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 text-text-secondary text-sm">
              現在商談中のお客様はいません
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Page Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary mb-1 sm:mb-2">
            商談テーブル
          </h1>
          <p className="text-sm sm:text-base text-text-secondary">
            リアルタイムで商談状況を確認できます
          </p>
        </div>

        {/* Total Count */}
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-border-accent mb-4 sm:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-lg font-bold text-text-primary">現在の商談数</h2>
              <p className="text-xs sm:text-sm text-text-secondary">全体</p>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-bold text-primary">
                {mockCustomers.length}
              </span>
              <span className="text-sm sm:text-lg text-text-secondary ml-1">件</span>
            </div>
          </div>
        </div>

        {/* Team Sections */}
        <div className="space-y-4 sm:space-y-8">
          <TeamSection team="B1" seats={seatsTeamB1} customerCount={teamB1Customers.length} />
          <TeamSection team="B2" seats={seatsTeamB2} customerCount={teamB2Customers.length} />
        </div>

        {/* Legend */}
        <div className="mt-4 sm:mt-8 bg-white rounded-xl p-3 sm:p-4 border border-border-accent">
          <h3 className="text-xs sm:text-sm font-medium text-text-primary mb-2 sm:mb-3">HOT度の説明</h3>
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-hot-s text-white text-[10px] sm:text-xs font-bold flex items-center justify-center">S</span>
              <span className="text-xs sm:text-sm text-text-secondary">最優先</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-hot-a text-white text-[10px] sm:text-xs font-bold flex items-center justify-center">A</span>
              <span className="text-xs sm:text-sm text-text-secondary">優先</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-hot-b text-white text-[10px] sm:text-xs font-bold flex items-center justify-center">B</span>
              <span className="text-xs sm:text-sm text-text-secondary">高</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-hot-c text-white text-[10px] sm:text-xs font-bold flex items-center justify-center">C</span>
              <span className="text-xs sm:text-sm text-text-secondary">中</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-hot-d text-white text-[10px] sm:text-xs font-bold flex items-center justify-center">D</span>
              <span className="text-xs sm:text-sm text-text-secondary">低</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-hot-e text-white text-[10px] sm:text-xs font-bold flex items-center justify-center">E</span>
              <span className="text-xs sm:text-sm text-text-secondary">様子見</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
