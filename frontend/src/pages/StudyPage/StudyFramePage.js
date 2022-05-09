import { LayOut,
  TitleName,
  SearchBox,
  SelectLayOut,
  KategorieLayOut,
  FlexDiv,
  InSideLayOut,
  CardDiv,
  SwitchBox
 } from "./StudyFramePage.styled"
import { useEffect, useRef, useState } from "react";
import CategoryList from "../../components/atoms/studypage/CategoryList"
import ThumbNailCard from "../../components/atoms/studypage/ThumbNailCard"

import MuiSwitch from '../../components/MuiSwitch';

import YouTubeUrl from "../../utils/api"
import axios from 'axios';

import { useRecoilState, useRecoilValue } from "recoil";
import { studyData, category } from "../../recoils";

function StudyFramePage() {
  const [nowKategorie, setKategorie] = useState("전체")
  const selectKategorie = (event) => {
    setKategorie(event)
  }

  const [searchValue, setSearchValue] = useState("")
  const onChange = (event) =>{
    setSearchValue(event.target.value)
  }

  
  
  
  
  const [studyDatas, setStudyData] = useRecoilState(studyData)
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
      
      setStudyData(res.data.items)
    })
    .catch(err =>{
      console.log(err)
    })
  }
  useEffect(() => {
    getData();
  }, []);

  // const qq = async () => {
  //   axios({
  //     method: 'get',
  //     url: "https://csafy.com/api/v1/cs-service/study/list/get",
  //     headers: {
  //       Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTY2NzI5Mzg5NDI1NDU3NTg1NTgiLCJ1c2VyX3NlcSI6MzAsInVzZXJuYW1lIjoidGVzdGNjIiwidXNlcl9pZCI6IjExNjY3MjkzODk0MjU0NTc1ODU1OCIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE2NTIwNjkwODQsImV4cCI6MTY1MjI3MDY4NH0.L1pqHJcr43n107hOhz_9Hr_IwGxRPUl1-YD-I2ZbN6M"
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res.data)
  // [{category2Id: "소분류1"
  // categoryId: "대분류1"
  // favorites: 1
  // id: 1
  // seen: 1
  // title: "test1"
  // videoId: "testURL1"},
  // {category2Id: "소분류1"
  // categoryId: "대분류1"
  // favorites: 1
  // id: 1
  // seen: 1
  // title: "test1"
  // videoId: "testURL1"},]
  //   })
  //   .catch(err =>{
  //     console.log(err)
  //   })
  // }
  // useEffect(() => {
  //   qq();
  // }, []);
  
  
  const againCard = studyDatas.map((data) => 
    
      <ThumbNailCard
        key={data.id.videoId}
        imgSrc={`https://i.ytimg.com/vi/${data.id.videoId}/hqdefault.jpg`}
        title={data.snippet.title}
        videoId={data.id.videoId}
        >
      </ThumbNailCard>
  )
  
  const categori = useRecoilValue(category)
  const [toggle, setToggle] = useState(false);
  const toggleTime = () => {
    console.log(toggle);
    setToggle(!toggle);
  };

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

          <SwitchBox>
            즐겨찾기
            <MuiSwitch toggleTime={toggleTime} />
          </SwitchBox>
          

        </SelectLayOut>

        
        <FlexDiv  >
          <KategorieLayOut>
            <CategoryList
              selectKategorie = {selectKategorie}
              categori = {categori}
              >
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

