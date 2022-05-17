import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup   from '@mui/material/ToggleButtonGroup';
import { useEffect, useRef, useState } from "react";
import { createTheme } from '@mui/material/styles';
import { useRecoilValue } from "recoil";
import { studyData } from "../../../recoils";


function CategoryList(props) {
  const [alignment, setAlignment] = useState('전체');
  const studyDatas = useRecoilValue(studyData)

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    props.selectKategorie(event.target.value)
  };
  
  const btncolors = ['standard' , 'primary' , 'secondary' , 'error' , 'info' , 'success' , 'warning']

  const againToggleButton = props.categori.map((data, index) => 
    
    <ToggleButton
      key={index}
      value={data}
      color={btncolors[index % 7]}
      sx={{width: "160px;", fontSize: "17px;",  fontFamily: "SUIT;", fontWeight: "600;"}}
      >
      
      {data} {data === "전체" ? studyDatas.length : studyDatas.filter(element => data === element.categoryId).length}
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
      sx={{margin: "10px 0 0 0;", width: "160px;"}}
    >
      
      {againToggleButton}
    </ToggleButtonGroup>
  );
}
export default CategoryList;