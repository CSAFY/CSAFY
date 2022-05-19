/* eslint-disable */
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
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        //   'rgba(255, 205, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(201, 203, 207, 0.2)',
        // ],
        // borderColor: [
        //   'rgb(255, 99, 132)',
        //   'rgb(255, 159, 64)',
        //   'rgb(255, 205, 86)',
        //   'rgb(75, 192, 192)',
        //   'rgb(54, 162, 235)',
        //   'rgb(153, 102, 255)',
        //   'rgb(201, 203, 207)',
        // ],
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
