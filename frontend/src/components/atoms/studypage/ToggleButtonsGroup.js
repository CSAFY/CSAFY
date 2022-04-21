import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup   from '@mui/material/ToggleButtonGroup';
import { useEffect, useRef, useState } from "react";

function ToggleButtonsGroup(props) {
  const [alignment, setAlignment] = useState('전체');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    props.selectKategorie(event.target.value)
  };
  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="전체" >
        전체
      </ToggleButton>
      <ToggleButton value="네트워크" >
        네트워크
      </ToggleButton>
      <ToggleButton value="보안" >
        보안
      </ToggleButton>
      <ToggleButton value="컴퓨터구조"  >
      컴퓨터구조
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
export default ToggleButtonsGroup;