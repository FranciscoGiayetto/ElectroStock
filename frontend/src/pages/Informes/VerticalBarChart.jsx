import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const VerticalBarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    const labels = data.map(item => item.box_nombre);
    const values = data.map(item => item.cantidad_logs_rotos);

    const ctx = chartRef.current.getContext('2d');

    // Destruye el gráfico anterior si existe
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Cantidad de Logs Rotos',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [data]);

  return <canvas id="verticalBar" ref={chartRef}></canvas>;
};

export default VerticalBarChart;
