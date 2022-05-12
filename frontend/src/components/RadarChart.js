import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import styled from 'styled-components';
ChartJS.register(...registerables);

const RadarGraph = styled.div`
  width: 346px;
  height: 346px;
  margin-left: 37px;
`;

export const data = {
  labels: [
    '네트워크',
    '운영체제',
    '자료구조',
    '기타',
    '데이터베이스',
    '컴퓨터구조',
    '운영체제론',
  ],
  datasets: [
    {
      label: '학습 시간 분석',
      data: [65, 59, 90, 81, 56, 55, 40],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};
function RadarChart() {
  return (
    <RadarGraph>
      <Radar data={data} />
    </RadarGraph>
  );
}
export default RadarChart;
