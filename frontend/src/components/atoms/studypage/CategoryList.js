import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup   from '@mui/material/ToggleButtonGroup';
import { useEffect, useRef, useState } from "react";
import { createTheme } from '@mui/material/styles';
import { useRecoilValue } from "recoil";
import { studyData } from "../../../recoils";
import styled, { css }  from "styled-components";

// import { createTheme } from '@mui/material/styles';


function CategoryList(props) {
  const [alignment, setAlignment] = useState('전체 학습');
  const studyDatas = useRecoilValue(studyData)

  // const handleAlignment = (event, newAlignment) => {
  //   if(newAlignment !== null){
  //     setAlignment(newAlignment);
  //     props.selectKategorie(newAlignment)
  //   }
  // };

  // const againToggleButton = props.categori.map((data, index) => 
  //   <ToggleButton
  //     className='ToggleButton'
  //     key={index}
  //     value={data}
  //     // color= {theme}
  //     // disableFocusRipple= {true}
  //     // disableRipple = {true}
  //     sx={{
  //       width: "180px;",
  //       fontSize: "17px;",
  //       fontFamily: "SUIT;",
  //       fontWeight: "600;",
  //       display:"flex",
  //       justifyContent: "space-between;",
  //       boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.2);",
  //       borderRadius: "15px;",
  //       borderTopLeftRadius: "30px;",
  //       height: "60px;",
  //       border: "solid 1px rgba(0,0,0,0.08);",
  //       margin:"0 0 10px 0;"
  //       }}
  //     >
  //     <span>{data}</span> 
  //     <TextDiv>{data === "전체" ? studyDatas.length : studyDatas.filter(element => data === element.categoryId).length}</TextDiv>
  //   </ToggleButton>
  // )

  const onClickBTN = (data) => {
    console.log(data)
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
    // <ToggleButtonGroup
    //   orientation="vertical"
    //   value={alignment}
    //   exclusive
    //   onChange={handleAlignment}
    //   aria-label="text alignment"
      
    //   sx={{margin: "10px 0 0 0;", width: "180px;"}}
    // >
    //   {againToggleButton}
    // </ToggleButtonGroup>
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