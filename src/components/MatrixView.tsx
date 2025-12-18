import { useState } from 'react';
import { Customer, HotnessLevel, ActionStatus, hotnessOrder, actionStatusOrder, hotnessColors, hotnessTextColors } from '../types';
import { generateMatrixData } from '../data/mockData';

interface MatrixViewProps {
  customers: Customer[];
  onCellClick?: (hotness: HotnessLevel, status: ActionStatus, customers: Customer[]) => void;
  highlightedCustomer?: Customer | null;
  compact?: boolean;
}

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
    <div className={`bg-white rounded-2xl shadow-sm border border-border-accent ${compact ? 'p-4' : 'p-6'}`}>
      <h2 className={`font-bold text-text-primary ${compact ? 'text-base mb-4' : 'text-lg mb-6'}`}>
        {highlightedCustomer ? '現在の商談位置' : '商談マトリックス'}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={`${compact ? 'p-2 text-xs' : 'p-3 text-sm'} text-left font-medium text-text-secondary bg-bg-light rounded-tl-lg`}>
                HOT度 / 行動
              </th>
              {actionStatusOrder.map((status, index) => (
                <th
                  key={status}
                  className={`${compact ? 'p-2 text-[10px] min-w-[70px]' : 'p-3 text-xs min-w-[100px]'} text-center font-medium text-text-secondary bg-bg-light ${
                    index === actionStatusOrder.length - 1 ? 'rounded-tr-lg' : ''
                  }`}
                >
                  {status}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hotnessOrder.map((hotness, rowIndex) => (
              <tr key={hotness}>
                <td
                  className={`${compact ? 'p-2' : 'p-3'} font-bold text-center ${hotnessTextColors[hotness]} bg-bg-light ${
                    rowIndex === hotnessOrder.length - 1 ? 'rounded-bl-lg' : ''
                  }`}
                >
                  <span className={`inline-flex items-center justify-center ${compact ? 'w-6 h-6 text-xs' : 'w-8 h-8'} rounded-full ${hotnessColors[hotness]} text-white`}>
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
                      className={`${compact ? 'p-2' : 'p-3'} text-center border border-border-accent transition-all duration-200 ${
                        isHighlighted
                          ? 'animate-pulse-highlight bg-primary/20 border-primary border-2 shadow-lg'
                          : isSelected
                          ? 'bg-primary/10 border-primary'
                          : compact ? '' : 'hover:bg-bg-light cursor-pointer'
                      } ${isLast ? 'rounded-br-lg' : ''}`}
                    >
                      {isHighlighted ? (
                        <div className="relative">
                          <span className={`font-bold ${compact ? 'text-base' : 'text-lg'} text-primary animate-bounce-subtle`}>
                            {compact ? 'HERE' : '現在地'}
                          </span>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
                        </div>
                      ) : count > 0 ? (
                        <span className={`font-bold ${compact ? 'text-sm' : 'text-lg'} ${hotnessTextColors[hotness]}`}>
                          {count}人
                        </span>
                      ) : (
                        <span className={`text-text-secondary ${compact ? 'text-xs' : 'text-sm'}`}>-</span>
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
        <div className="mt-6 p-4 bg-bg-light rounded-xl">
          <h3 className="font-medium text-text-primary mb-3">該当顧客</h3>
          <div className="space-y-2">
            {(matrixData.get(selectedCell) || []).map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between bg-white p-3 rounded-lg border border-border-accent"
              >
                <div>
                  <span className="font-medium text-text-primary">{customer.customerName}</span>
                  <span className="text-sm text-text-secondary ml-3">担当: {customer.representativeName}</span>
                </div>
                <span className={`${hotnessColors[customer.hotness]} text-white text-xs font-bold px-2 py-1 rounded-full`}>
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
