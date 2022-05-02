import styled from "styled-components";

export const MyiFrame = styled.iframe`
  
  width: 1158px;
  height: 655px;
  allowfullscreen
  margin: 20px auto 0 auto;
  src : ${(props) => props.videoId}
  events:{
    onStateChange : ${(props) => props.onPlayerStateChange}
  }
  
`

export const FullLayOut = styled.div`
  background-color: #f8f8f8;
  height : 100%;
  padding: 10px 20px 20px 20px;
`

export const DetailLayOut = styled.div`
  height : 80%;
  margin: 20px 20px 20px 20px;
  padding: 22px 115px 98px 116px;
  border-radius: 31px;
  background-color: #fff;
  text-align: center;
`

export const TitleText = styled.div`
  width: 700px;
  height: 100px;
  margin: 20px 400px 20px 0px;
  font-family: SUIT;
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`

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
export const GridDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 1em;
    justify-items: center;
    align-items: center;
`;

export const RelatedQuestions = styled.div`
  width: 100%;
  height: 40px;
  margin: 10px 0 0 157px;
  font-family: SUIT;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`