//13.11. Transformando os dados do gráfico - 6'50"
import { Metric } from 'marcioasan-sdk';

export default function transformDataIntoAntdChart(data: Metric.MonthlyRevenuesExpenses) {
  return data
    .map((item) => {
      return [
        {
          yearMonth: item.yearMonth,
          value: item.totalRevenues,
          category: 'totalRevenues' as 'totalRevenues' | 'totalExpenses',
        },
        {
          yearMonth: item.yearMonth,
          value: item.totalExpenses,
          category: 'totalExpenses' as 'totalRevenues' | 'totalExpenses',
        },
      ];
    })
    .flat(); //13.11. Transformando os dados do gráfico - 10'50"
}
