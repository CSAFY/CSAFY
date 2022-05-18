import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup   from '@mui/material/ToggleButtonGroup';
import { useEffect, useRef, useState } from "react";
import { createTheme } from '@mui/material/styles';
import { useRecoilValue } from "recoil";
import { studyData } from "../../../recoils";
import styled from "styled-components";


function CategoryList(props) {
  const [alignment, setAlignment] = useState('전체');
  const studyDatas = useRecoilValue(studyData)

  const handleAlignment = (event, newAlignment) => {
    if(newAlignment !== null){
      setAlignment(newAlignment);
      props.selectKategorie(newAlignment)
    }
  };
  
  const btncolors = ['standard' , 'primary' , 'secondary' , 'error' , 'info' , 'success' , 'warning']

  const againToggleButton = props.categori.map((data, index) => 
    
    <ToggleButton
      key={index}
      value={data}
      color={btncolors[index % 7]}
      sx={{
        width: "180px;",
        fontSize: "17px;",
        fontFamily: "SUIT;",
        fontWeight: "600;",
        display:"flex",
        justifyContent: "space-between;",
        boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.2);",
        borderRadius: "15px;",
        backgroundColor: "#fff;",
        height: "60px;",
        border: "solid 1px rgba(0,0,0,0.08);",
        margin:"0 0 10px 0;"
        
        }}
      >
      
      <span>{data}</span> 
      <TextDiv>{data === "전체" ? studyDatas.length : studyDatas.filter(element => data === element.categoryId).length}</TextDiv>
    </ToggleButton>
    
  )
  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      color="primary"
      sx={{margin: "10px 0 0 0;", width: "180px;"}}
    >
      {againToggleButton}
    </ToggleButtonGroup>
  );
}
export default CategoryList;

const TextDiv = styled.div`  
  width: 45px;
  background-color: #E0EFF8;
  border-radius: 10px;
  color : dimgray;
`
