import MatrixView from '../components/MatrixView';
import { mockCustomers } from '../data/mockData';

const MatrixPage = () => {
  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            商談マトリックス
          </h1>
          <p className="text-text-secondary">
            HOT度と行動ステータスで商談状況を分析します
          </p>
        </div>

        {/* Matrix View - 最上部に配置 */}
        <MatrixView customers={mockCustomers} />

        {/* Legend */}
        <div className="mt-6 bg-white rounded-xl p-4 border border-border-accent">
          <h3 className="text-sm font-medium text-text-primary mb-3">使い方</h3>
          <ul className="text-sm text-text-secondary space-y-2">
            <li>• マトリックスのセルをクリックすると、該当する顧客のリストが表示されます</li>
            <li>• 縦軸はHOT度（顧客の温度感）、横軸は現在の行動ステータスを表します</li>
            <li>• 数字は各セルに該当する顧客数を示しています</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MatrixPage;
