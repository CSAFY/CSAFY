import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import styled from 'styled-components';
ChartJS.register(...registerables);

const BarGraph = styled.div`
  width: 596px;
  height: 298px;
  margin-right: 83px;

  // flex-grow: 2;
`;

const BarChart = ({ recentTest }) => {
  const getSum = corrects => Object.values(corrects).reduce((a, b) => a + b);
  const labels = recentTest.map(test => test.id).reverse();
  const scores = recentTest
    .map(test => Math.ceil((getSum(test.corrects) / getSum(test.totals)) * 100))
    .reverse();
  // console.log(d);
  const data = {
    labels,
    datasets: [
      {
        label: '모의고사 결과',
        data: scores,
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(54, 162, 235)'],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <BarGraph>
      <Bar data={data} options={options} />
    </BarGraph>
  );
};

export default BarChart;
