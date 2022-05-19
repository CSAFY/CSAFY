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
  height: 91vh;
  padding: 10px 20px 20px 20px;
`

export const DetailLayOut = styled.div`
  height : 950px;
  margin: 20px auto 20px auto;
  padding: 22px 115px 98px 116px;
  border-radius: 31px;
  background-color: #fff;
  text-align: center;
  width: 1200px;
`

export const TitleText = styled.div`
  
  margin: 20px 0px 30px 0px;
  font-family: SUIT;
  font-size: 35px;
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

export const ButtonBox = styled.div`  
  display: flex;
  justify-content: space-between;
  margin: 40px 0 0 0;
`

export const ArrowAndLabel = styled.div`  
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const BtnText = styled.div`
  font-family: SUIT;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000;
`

export const CategoryShowDiv = styled.div` 
  flex-grow: 0;
  margin: 0 2px 0 2px;
  padding: 4px 10px 4px 10px;
  border-radius: 48px;
  background-color: #DEF9FF;
`
export const FlexSpan = styled.span`  
  display: flex;
  justify-content: space-between;
`

export const FlexSpanNon = styled.span`  
  display: flex;
  
`
