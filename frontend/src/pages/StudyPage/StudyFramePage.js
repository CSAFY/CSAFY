import { LayOut,
  TitleName
 } from "./StudyFramePage.styled"
import { useEffect, useRef, useState } from "react";

function StudyFramePage() {
  const [nowState, setNowState] = useState("전체")
  return (
    <LayOut>
      <TitleName>
        {nowState}
      </TitleName>
    </LayOut>
  )
}
export default StudyFramePage;

