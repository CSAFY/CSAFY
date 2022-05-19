/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import styled from 'styled-components';
ChartJS.register(...registerables);

const RadarGraph = styled.div`
  width: 420px;
  height: 420px;
  margin-left: 37px;
`;

function RadarChart({ analysisData }) {
  const [data, setData] = useState({
    labels: [
      '네트워크',
      '운영체제',
      '자료구조',
      '기타',
      '데이터베이스',
      '컴퓨터구조',
    ],
    datasets: [
      {
        label: '학습 포인트 분석',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    setData({
      labels: [
        '네트워크',
        '운영체제',
        '자료구조',
        '기타',
        '데이터베이스',
        '컴퓨터구조',
      ],
      datasets: [
        {
          label: '학습 포인트 분석',
          data: [
            parseInt(`${analysisData.scores.네트워크}`),
            parseInt(`${analysisData.scores.운영체제}`),
            parseInt(`${analysisData.scores.자료구조}`),
            parseInt(`${analysisData.scores.기타}`),
            parseInt(`${analysisData.scores.데이터베이스}`),
            parseInt(`${analysisData.scores.컴퓨터구조}`),
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const options = {
    scales: {
      r: {
        suggestedMin: 0,
        // suggestedMax: 100,
      },
    },
  };

  return (
    <RadarGraph>
      <Radar data={data} options={options} />
    </RadarGraph>
  );
}
export default RadarChart;
