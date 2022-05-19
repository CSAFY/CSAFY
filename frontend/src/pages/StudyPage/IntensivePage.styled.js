import styled from "styled-components";


export const FullLayOut = styled.div`
  min-width:1375px;
  background-color: #f6f7fb;
  height : 100%;
  min-height: 800px;
  padding: 50px 60px 20px 50px;
`

export const TitleName = styled.div`
  width: 111px;
  height: 30px;
  margin: 0 199px 5px 64px;
  font-family: SUIT;
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`;

export const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 1em;
  justify-items: center;
  align-items: center;
`;

export const FlexDiv = styled.div`
  display: flex;
  margin : 25px 0 40px 0;
`;

export const FlexDivs = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StudyDetailDiv = styled.div`
  width: 100%;
  height: 320px;
`

export const StudyDetailHr = styled.hr`
  
  margin: 32px 0px 21px 0px;
`

export const StudyDetailText = styled.div`
  font-size: 24px;
  height: 60px;
  width: 500px;
`

export const DetailLayOut = styled.div`
  height : 80vh;
  margin: 20px auto 20px auto;
  padding: 22px 115px 70px 115px;
  border-radius: 31px;
  
  text-align: center;
  width: 1200px;
`
// background-color: #fff;