import styled from "styled-components";

export const MyiFrame = styled.iframe`
  
  width: 1158px;
  height: 655px;
  allowfullscreen
  margin: 20px auto 0 auto;
  src : ${(props) => props.videoId}
  events: {
      'onReady': ${(props) => props.onPlayerReady},
      'onStateChange': ${(props) => props.onPlayerStateChange}
    }
  
`

export const FullLayOut = styled.div`
  background-color: #f8f8f8;
  height : 100%;
  padding: 10px 20px 20px 20px;
`

export const DetailLayOut = styled.div`
  height : 80%;
  margin: 20px auto 20px auto;
  padding: 22px 115px 98px 116px;
  border-radius: 31px;
  background-color: #fff;
  text-align: center;
  width: 1200px;
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

export const StudyDetailHr = styled.hr`
  
  margin: 32px 0px 21px 0px;
`