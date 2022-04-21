import React from 'react';

// HEATMAP
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';

// STYLED
import styled from '@emotion/styled';

const MyPageWrapper = styled.div`
  height: 100vh;
`;

const NicknameWrapper = styled.div`
  height: 200px;
  margin-left: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserInfoWrapper = styled.div`
  height: 300px;
  margin-left: 3rem;

  display: flex;
`;
const UserInfo = styled.div`
  flex-grow: 1;
`;
const HeatMap = styled.div`
  flex-grow: 2;
  margin-right: 3rem;
  padding-top: rem;
`;

function MyPage() {
  // Heatmap
  const today = new Date();
  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  return (
    <>
      <MyPageWrapper>
        <NicknameWrapper>
          <h1>완두콩</h1>
          <div>🤢</div>
        </NicknameWrapper>
        <hr />

        <UserInfoWrapper>
          <UserInfo>
            <div>
              <h1>관심 분야</h1>
              <button>React</button>
              <button>Spring</button>
            </div>
            <div>
              <h1>즐겨찾기</h1>
              <button>Kakao</button>
            </div>
          </UserInfo>
          <HeatMap>
            <h1>학습 일지</h1>
            <CalendarHeatmap
              startDate={shiftDate(today, -150)}
              endDate={today}
              values={[
                { date: '2022-04-19', count: 1 },
                { date: '2022-04-20', count: 2 },
              ]}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-github-${value.count}`;
              }}
              showWeekdayLabels={true}

              // tooltip 사라지게 하는 방법...
              // tooltipDataAttrs={(value) => {
              //   if (value.count) {
              //     return {
              //       'data-tip': `${value.count} Contributions on ${value.date}`,
              //     };
              //   } else {
              //     return {
              //       'data-tip': `No Contribution`,
              //     };
              //   }
              // }}
            />
            <ReactTooltip />
          </HeatMap>
        </UserInfoWrapper>
      </MyPageWrapper>
    </>
  );
}

export default MyPage;
