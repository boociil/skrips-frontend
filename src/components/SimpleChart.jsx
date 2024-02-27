import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const SimpleChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Sample Data',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [65, 59, 80, 81, 56],
        },
      ],
    };

    setChartData(data);
  }, []);

  return (
    <div>
      {chartData.labels && chartData.labels.length > 0 ? (
        <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'category',
                labels: chartData.labels,
              },
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'Sample Bar Chart',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SimpleChart;
