import { LayOut,
  TitleName,
  SearchBox,
  SelectLayOut,
  KategorieLayOut,
  FlexDiv,
  InSideLayOut,
  CardDiv
 } from "./StudyFramePage.styled"
import { useEffect, useRef, useState } from "react";
import BasicButton from "../../components/atoms/studypage/BasicButton"
import CategoryList from "../../components/atoms/studypage/CategoryList"
import ThumbNailCard from "../../components/atoms/studypage/ThumbNailCard"

import YouTubeUrl from "../../utils/api"
import axios from 'axios';

import { useRecoilState } from "recoil";
import { studyData } from "../../recoils";

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
  
  

  
  const [youTubeData, setYouTubeData] = useRecoilState(studyData)
  const getData = async () => {
    const params = {
      key: 'AIzaSyD0YhR64cx9_iaWnxKXPTxt39BVigDbFyw',
      part:'snippet',
      // 선택한 영화 제목
      q: "스파이더맨",
      type: 'video',
    }
    axios({
      method: 'get',
      url: YouTubeUrl,
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
    
      <ThumbNailCard
        key={data.id.videoId}
        imgSrc={data.snippet.thumbnails.high.url}
        title={data.snippet.title}
        videoId={data.id.videoId}
        >
      </ThumbNailCard>
  )
  
  
  

  return (
    <LayOut>
      <InSideLayOut>
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

        
        <FlexDiv  >
          <KategorieLayOut>
            <CategoryList
              selectKategorie = {selectKategorie}>

            </CategoryList>
          </KategorieLayOut>

          <CardDiv>
            {againCard}
          </CardDiv>
        </FlexDiv>
        
      </InSideLayOut>
    </LayOut>
  )
}
export default StudyFramePage;

