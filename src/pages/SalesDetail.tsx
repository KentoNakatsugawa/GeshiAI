import { useParams, Link } from 'react-router-dom';
import { mockCustomers, mockMeetingHistory } from '../data/mockData';
import { hotnessColors } from '../types';
import MatrixView from '../components/MatrixView';

const SalesDetail = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const customer = mockCustomers.find((c) => c.id === customerId);
  const history = mockMeetingHistory.filter((h) => h.customerId === customerId);

  if (!customer) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            顧客が見つかりません
          </h1>
          <Link
            to="/"
            className="inline-block bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            ダッシュボードに戻る
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          ダッシュボードに戻る
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Customer Header */}
            <div className="bg-white rounded-2xl p-6 border border-border-accent">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary mb-1">
                    {customer.customerName}
                  </h1>
                  <p className="text-text-secondary">{customer.team}チーム / 座席 {customer.seatNumber}</p>
                </div>
                <span
                  className={`${hotnessColors[customer.hotness]} text-white text-lg font-bold px-4 py-2 rounded-full`}
                >
                  HOT度 {customer.hotness}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-bg-light rounded-xl p-4">
                  <p className="text-sm text-text-secondary mb-1">担当者名</p>
                  <p className="font-medium text-text-primary">
                    {customer.representativeName}
                  </p>
                </div>
                <div className="bg-bg-light rounded-xl p-4">
                  <p className="text-sm text-text-secondary mb-1">現在の行動</p>
                  <p className="font-medium text-text-primary">{customer.status}</p>
                </div>
                <div className="bg-bg-light rounded-xl p-4 col-span-2">
                  <p className="text-sm text-text-secondary mb-1">HOT度</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`${hotnessColors[customer.hotness]} text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center`}
                    >
                      {customer.hotness}
                    </span>
                    <span className="font-medium text-text-primary">
                      {customer.hotness === 'S' && '最優先'}
                      {customer.hotness === 'A' && '優先'}
                      {customer.hotness === 'B' && '高'}
                      {customer.hotness === 'C' && '中'}
                      {customer.hotness === 'D' && '低'}
                      {customer.hotness === 'E' && '様子見'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl p-6 border border-border-accent">
              <h2 className="text-lg font-bold text-text-primary mb-4">アクション</h2>
              <div className="flex flex-wrap gap-3">
                <button className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors">
                  HOT度を更新
                </button>
                <button className="bg-white text-primary border border-primary px-6 py-2 rounded-full font-medium hover:bg-primary/5 transition-colors">
                  行動を更新
                </button>
                <button className="bg-white text-text-secondary border border-border-accent px-6 py-2 rounded-full font-medium hover:bg-bg-light transition-colors">
                  メモを追加
                </button>
              </div>
            </div>

            {/* Meeting History */}
            <div className="bg-white rounded-2xl p-6 border border-border-accent">
              <h2 className="text-lg font-bold text-text-primary mb-4">商談履歴</h2>
              {history.length > 0 ? (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="border-l-4 border-primary pl-4 py-2"
                    >
                      <p className="text-sm text-text-secondary mb-1">
                        {formatDate(item.date)}
                      </p>
                      <p className="text-text-primary mb-2">{item.notes}</p>
                      <div className="bg-bg-light rounded-lg p-3">
                        <p className="text-sm text-text-secondary">次回アクション</p>
                        <p className="text-text-primary font-medium">
                          {item.nextAction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-secondary text-center py-8">
                  商談履歴はまだありません
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Matrix View */}
          <div>
            <MatrixView
              customers={mockCustomers}
              highlightedCustomer={customer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDetail;
