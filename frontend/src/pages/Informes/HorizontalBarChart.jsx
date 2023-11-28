import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const HorizontalBarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const defaultData = {
      labels: ['Label 1', 'Label 2', 'Label 3'], // Coloca etiquetas predeterminadas
      values: [0, 0, 0], // Coloca valores predeterminados
    };

    const actualData = data || defaultData;

    const labels = actualData.labels;
    const values = actualData.values;

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
            label: 'My First Dataset',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [data]);

  return <canvas id="horizontalBar" ref={chartRef}></canvas>;
};

export default HorizontalBarChart;
