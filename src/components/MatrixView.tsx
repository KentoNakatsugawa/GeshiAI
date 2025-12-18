import { useState } from 'react';
import { Customer, HotnessLevel, ActionStatus, hotnessOrder, actionStatusOrder, hotnessColors, hotnessTextColors } from '../types';
import { generateMatrixData } from '../data/mockData';

interface MatrixViewProps {
  customers: Customer[];
  onCellClick?: (hotness: HotnessLevel, status: ActionStatus, customers: Customer[]) => void;
  highlightedCustomer?: Customer | null;
  compact?: boolean;
}

// モバイル用の短縮ラベル
const shortStatusLabels: Record<ActionStatus, string> = {
  'クロージング': 'CL',
  '入金確認': '入金',
  '納車流れ': '納車',
  '初期スコア車両提示': '車両',
  'スコアプレゼン': 'SP',
  'ヒアリング': 'HR',
};

const MatrixView = ({ customers, onCellClick, highlightedCustomer, compact = false }: MatrixViewProps) => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const matrixData = generateMatrixData(customers);

  const handleCellClick = (hotness: HotnessLevel, status: ActionStatus) => {
    const key = `${hotness}-${status}`;
    const cellCustomers = matrixData.get(key) || [];
    setSelectedCell(selectedCell === key ? null : key);
    if (onCellClick) {
      onCellClick(hotness, status, cellCustomers);
    }
  };

  const getCellCount = (hotness: HotnessLevel, status: ActionStatus): number => {
    const key = `${hotness}-${status}`;
    return matrixData.get(key)?.length || 0;
  };

  // ハイライトされたセルかどうかを判定
  const isHighlightedCell = (hotness: HotnessLevel, status: ActionStatus): boolean => {
    if (!highlightedCustomer) return false;
    return highlightedCustomer.hotness === hotness && highlightedCustomer.status === status;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-border-accent ${compact ? 'p-3 sm:p-4' : 'p-3 sm:p-6'}`}>
      <h2 className={`font-bold text-text-primary ${compact ? 'text-sm sm:text-base mb-2 sm:mb-3' : 'text-base sm:text-lg mb-3 sm:mb-4'}`}>
        {highlightedCustomer ? '現在の商談位置' : '商談マトリックス'}
      </h2>

      {/* 軸の説明 */}
      <div className={`flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4 ${compact ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'} text-text-secondary`}>
        <div className="flex items-center gap-1">
          <span className="font-medium">縦軸:</span>
          <span className="text-primary font-bold">HOT度</span>
          <span className="hidden xs:inline">(S〜E)</span>
        </div>
        <span>×</span>
        <div className="flex items-center gap-1">
          <span className="font-medium">横軸:</span>
          <span className="text-primary font-bold">行動</span>
          <span className="hidden xs:inline">(ステータス)</span>
        </div>
      </div>

      <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
        <table className="w-full border-collapse min-w-[320px]">
          <thead>
            <tr>
              <th className={`${compact ? 'p-1 sm:p-2 text-[10px] sm:text-xs' : 'p-1.5 sm:p-3 text-[10px] sm:text-sm'} text-left font-medium text-text-secondary bg-bg-light rounded-tl-lg w-12 sm:w-auto`}>
                <span className="hidden sm:inline">HOT度</span>
                <span className="sm:hidden">HOT</span>
              </th>
              {actionStatusOrder.map((status, index) => (
                <th
                  key={status}
                  className={`${compact ? 'p-1 sm:p-2 text-[8px] sm:text-[10px]' : 'p-1.5 sm:p-3 text-[9px] sm:text-xs'} text-center font-medium text-text-secondary bg-bg-light ${
                    index === actionStatusOrder.length - 1 ? 'rounded-tr-lg' : ''
                  }`}
                  title={`行動: ${status}`}
                >
                  <span className="sm:hidden">{shortStatusLabels[status]}</span>
                  <span className="hidden sm:inline">{status}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hotnessOrder.map((hotness, rowIndex) => (
              <tr key={hotness}>
                <td
                  className={`${compact ? 'p-1 sm:p-2' : 'p-1.5 sm:p-3'} font-bold text-center ${hotnessTextColors[hotness]} bg-bg-light ${
                    rowIndex === hotnessOrder.length - 1 ? 'rounded-bl-lg' : ''
                  }`}
                >
                  <span className={`inline-flex items-center justify-center ${compact ? 'w-5 h-5 sm:w-6 sm:h-6 text-[10px] sm:text-xs' : 'w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm'} rounded-full ${hotnessColors[hotness]} text-white`}>
                    {hotness}
                  </span>
                </td>
                {actionStatusOrder.map((status, colIndex) => {
                  const count = getCellCount(hotness, status);
                  const key = `${hotness}-${status}`;
                  const isSelected = selectedCell === key;
                  const isHighlighted = isHighlightedCell(hotness, status);
                  const isLast = rowIndex === hotnessOrder.length - 1 && colIndex === actionStatusOrder.length - 1;

                  return (
                    <td
                      key={key}
                      onClick={() => !compact && handleCellClick(hotness, status)}
                      className={`${compact ? 'p-1 sm:p-2' : 'p-1.5 sm:p-3'} text-center border border-border-accent transition-all duration-200 ${
                        isHighlighted
                          ? 'animate-pulse-highlight bg-primary/20 border-primary border-2 shadow-lg'
                          : isSelected
                          ? 'bg-primary/10 border-primary'
                          : compact ? '' : 'hover:bg-bg-light cursor-pointer'
                      } ${isLast ? 'rounded-br-lg' : ''}`}
                    >
                      {isHighlighted ? (
                        <div className="relative">
                          <span className={`font-bold ${compact ? 'text-xs sm:text-base' : 'text-sm sm:text-lg'} text-primary animate-bounce-subtle`}>
                            {compact ? '●' : '現在地'}
                          </span>
                          <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-ping" />
                        </div>
                      ) : count > 0 ? (
                        <span className={`font-bold ${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-lg'} ${hotnessTextColors[hotness]}`}>
                          {count}
                        </span>
                      ) : (
                        <span className={`text-text-secondary ${compact ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'}`}>-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 選択されたセルの顧客リスト（コンパクトモードでない場合のみ表示） */}
      {!compact && selectedCell && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-bg-light rounded-xl">
          <h3 className="font-medium text-text-primary mb-2 sm:mb-3 text-sm sm:text-base">該当顧客</h3>
          <div className="space-y-2">
            {(matrixData.get(selectedCell) || []).map((customer) => (
              <div
                key={customer.id}
                className="flex flex-col xs:flex-row xs:items-center justify-between bg-white p-2 sm:p-3 rounded-lg border border-border-accent gap-1 xs:gap-0"
              >
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-text-primary text-sm sm:text-base block xs:inline">{customer.customerName}</span>
                  <span className="text-xs sm:text-sm text-text-secondary xs:ml-3 block xs:inline truncate">担当: {customer.representativeName.replace(/^B[12]\s/, '')}</span>
                </div>
                <span className={`${hotnessColors[customer.hotness]} text-white text-xs font-bold px-2 py-1 rounded-full self-start xs:self-auto`}>
                  {customer.hotness}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixView;
