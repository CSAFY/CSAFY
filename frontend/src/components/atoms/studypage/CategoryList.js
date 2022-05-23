
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { studyData } from "../../../recoils";
import styled, { css }  from "styled-components";




function CategoryList(props) {
  const [alignment, setAlignment] = useState('전체 학습');
  const studyDatas = useRecoilValue(studyData)

  const onClickBTN = (data) => {
    setAlignment(data)
    props.selectKategorie(data)
  }

  const toggle = props.categori.map((data, index) => 
      <ToggleBtn 
        key={index}
        onClick={() => onClickBTN(data)}
        able={data === alignment ? "Y" : "N"}>
        <span style={{width:"135px"}}>{data}</span> 
        <TextDiv>{data === "전체 학습" ? 
          studyDatas.length 
          : studyDatas.filter(element => data === element.categoryId).length}
        </TextDiv>
      </ToggleBtn>
  )


  return (
    <div>
      {toggle}
    </div>
  );
}
export default CategoryList;

const TextDiv = styled.div`  
  width: 30px;
  height: 30px;
  background-color: #E0EFF8;
  border-radius: 10px;
  font-weight : 0;
  font-size : 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ToggleBtn = styled.button` 
  width : 180px;
  font-size : 17px;
  font-family : SUIT;
  font-weight : 600;
  display : flex;
  justify-content : flex-start;
  border-radius: 11px;
  height : 60px;
  margin : 0 0 10px 0;
  align-items: center;
  background-color: #f4fbfe;
  border: none;
  
  cursor: pointer;
  ${(props) => {
    if (props.able === "Y") {
      return css`
        {
          background-color: #42A7E8;
          color: #fff;
          
          ${TextDiv}{
            background-color: #008ED0;
          }
        }
      `;
    } else {
      return css`
        
      `;
    }
  }}
`