//13.10. Instalando a biblioteca de gráficos, 13.11. Transformando os dados do gráfico
import { Area, AreaConfig } from '@ant-design/charts';
import { format } from 'date-fns';
//import ptBR from 'date-fns/esm/locale/pt-BR/index.js';

import { MetricService } from 'marcioasan-sdk';
import { useEffect } from 'react';
import { useState } from 'react';
import transformDataIntoAntdChart from '../../core/utils/transformDataIntoAntdChart';

export default function CompanyMetrics() {
  const [data, setData] = useState<
    {
      yearMonth: string;
      value: number;
      category: 'totalRevenues' | 'totalExpenses';
    }[]
  >([]);

  useEffect(() => {
    MetricService.getMonthlyRevenuesExpenses().then(transformDataIntoAntdChart).then(setData);
  }, []);

  const config: AreaConfig = {
    data,
    height: 400,
    color: ['#0099ff', '#274060'],
    areaStyle: { fillOpacity: 1 },
    xField: 'yearMonth',
    yField: 'value',
    seriesField: 'category',
    legend: {
      itemName: {
        formatter(legend) {
          return legend === 'totalRevenues' ? 'Receitas' : 'Despesas';
        },
      },
    },
    xAxis: {
      label: {
        formatter(item) {
          return format(new Date(item), 'MM/yyyy');
          //return format(new Date(item), 'MMMM/yyyy', { locale: ptBR }); //13.14. Configurando a label do eixo horizontal
        },
      },
    },
    point: {
      size: 5,
      shape: 'circle',
    },
  };
  return <Area {...config} />;
}
