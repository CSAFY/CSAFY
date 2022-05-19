import styled from "styled-components";

function RelatedExam() {
  const ExampleCard = (
    <ExamBox>
      <ExamText>
        입문자를 위한 문제
      </ExamText>
      <ExamContent>
        컴퓨터 구조에 대해 알아봅시다.
        CPU, GPU, 등등등등
      </ExamContent>
    </ExamBox>
  )
  return(
    <StudyDetailDiv>
        <StudyDetailText>
          관련 모의고사
        </StudyDetailText>
        <GridDiv>
          {ExampleCard}
          {ExampleCard}
          {ExampleCard}
        </GridDiv>
      </StudyDetailDiv>
  )
}
export default RelatedExam

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
`
const ExamBox = styled.div`
  width: 270px;
  height: 182px;
  padding: 27px 23.9px 26px 30px;
  border-radius: 8px;
  background-color: #f4fbfe;
`

const ExamText = styled.div`
  width: 100%;
  height: 50px;
  flex-grow: 0;
  margin: 0 81.1px 9px 0;
  font-family: SUIT;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`


const ExamContent = styled.div`
  width: 80%;
  height: 70px;
  flex-grow: 0;
  margin: 9px 0 21px;
  font-family: SUIT;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #98a8b9;
`
