import { LayOut,
  TitleName,
  SearchBox,
  SelectLayOut,
  KategorieLayOut,
  FlexDiv,
  CardDiv
 } from "./StudyFramePage.styled"
import { useEffect, useRef, useState } from "react";
import BasicButton from "../../components/atoms/studypage/BasicButton"
// import ToggleButton from "../../components/atoms/studypage/ToggleButton"
import ToggleButtonsGroup from "../../components/atoms/studypage/ToggleButtonsGroup"
import KateImgCard from "../../components/atoms/studypage/KateImgCard"


function StudyFramePage() {
  const [nowKategorie, setKategorie] = useState("전체")
  const selectKategorie = (event) => {
    setKategorie(event)
  }

  const [searchValue, setSearchValue] = useState("")
  const onChange = (event) =>{
    setSearchValue(event.target.value)
  }

  const onBasicBtnlick = () => {
    console.log("hihi")
  }

  
  

  return (
    <LayOut>
      <TitleName>
        {nowKategorie}
      </TitleName>
      <SelectLayOut>
        <SearchBox
          placeholder="Search…"
          value={searchValue}
          onChange={onChange}>
        </SearchBox>
        

        <BasicButton
          children="필터"
          onClick={onBasicBtnlick}
          able={"Y"}
          >
        </BasicButton>
        

      </SelectLayOut>

      {/*  */}
      <FlexDiv  >
        <KategorieLayOut>
          <ToggleButtonsGroup
            selectKategorie = {selectKategorie}>

          </ToggleButtonsGroup>
        </KategorieLayOut>

        <CardDiv>
          <KateImgCard
            imgSrc={"logo512.png"}>

          </KateImgCard>
          <KateImgCard
            imgSrc={"logo512.png"}>

          </KateImgCard>
          <KateImgCard
            imgSrc={"logo512.png"}>

          </KateImgCard>
          <KateImgCard
            imgSrc={"logo512.png"}>

          </KateImgCard>
          <KateImgCard
            imgSrc={"logo512.png"}>

          </KateImgCard>
        </CardDiv>
      </FlexDiv>
      
    </LayOut>
  )
}
export default StudyFramePage;

