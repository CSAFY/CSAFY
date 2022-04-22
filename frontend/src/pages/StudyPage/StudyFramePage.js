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
import YouTubeUrl from "../../utils/api"
import axios from 'axios';

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
    
  }


  
  const [youTubeData, setYouTubeData] = useState([])
  const getData = async () => {
    const params = {
      key: 'AIzaSyAZCj6i0rNEKAniu2mB9EAB3GgNePaJQEM',
      part:'snippet',
      // 선택한 영화 제목
      q: "스파이더맨",
      type: 'video',
    }
    axios({
      method: 'get',
      url: "https://www.googleapis.com/youtube/v3/search",
      params,
    })
    .then((res) => {
      console.log(res.data.items)
      setYouTubeData(res.data.items)
    })
    .catch(err =>{
      console.log(err)
    })
  }
  useEffect(() => {
    getData();
  }, []);
  
  const againCard = youTubeData.map((data) => 
    
    <KateImgCard
      key={data.id.videoId}
      imgSrc={data.snippet.thumbnails.high.url}
      text={data.snippet.title}
       >
      
    </KateImgCard>
  )
  
  
  

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
          {againCard}
        </CardDiv>
      </FlexDiv>
      
    </LayOut>
  )
}
export default StudyFramePage;

