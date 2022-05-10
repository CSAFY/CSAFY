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

import SlideToggleBtn from '../../components/atoms/studypage/SlideToggleBtn';

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

  
  const [toggle, setToggle] = useState(false);
  const toggleTime = () => {
    
    setToggle(!toggle);
  };
  
  const [studyDatas, setStudyData] = useRecoilState(studyData)
  const getData = async () => {
    axios({
      method: 'get',
      url: "https://csafy.com/api/v1/cs-service/study/list/get",
      headers: {
        Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTY2NzI5Mzg5NDI1NDU3NTg1NTgiLCJ1c2VyX3NlcSI6MzAsInVzZXJuYW1lIjoidGVzdGNjIiwidXNlcl9pZCI6IjExNjY3MjkzODk0MjU0NTc1ODU1OCIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE2NTIwNjkwODQsImV4cCI6MTY1MjI3MDY4NH0.L1pqHJcr43n107hOhz_9Hr_IwGxRPUl1-YD-I2ZbN6M"
      },
    })
    .then((res) => {
      setStudyData(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  }
  useEffect(() => {
    getData();
  }, []);

  const cateFilter = (data, index) => {
    if (nowKategorie === "전체"){
      return(
        <ThumbNailCard
            key={data.id}
            imgSrc={`https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg`}
            title={data.title}
            index={index}
            videoId={data.videoId}
            category2Id = {data.category2Id}
            categoryId={data.categoryId}
            favorites ={data.favorites}
            id = {data.id}
            seen = {data.seen}
            >
          </ThumbNailCard>
      )
    }else if (nowKategorie === data.categoryId) {
      return(
        <ThumbNailCard
            key={data.id}
            imgSrc={`https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg`}
            title={data.title}
            index={index}
            videoId={data.videoId}
            category2Id = {data.category2Id}
            categoryId={data.categoryId}
            favorites ={data.favorites}
            id = {data.id}
            seen = {data.seen}
            >
          </ThumbNailCard>
      )
    } 
  }
  
  const againCard = studyDatas.map((data, index) => 
    
      {
        if (toggle === false){
          return cateFilter(data, index)
        } else if (data.favorites === 1) {
          return cateFilter(data)
        }
      }
  )

  

  // <ThumbNailCard
  //           key={data.id}
  //           index={index}
  //           imgSrc={`https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg`}
  //           title={data.title}
  //           videoId={data.videoId}
  //           category2Id = {data.category2Id}
  //           categoryId={data.categoryId}
  //           favorites ={data.favorites}
  //           id = {data.id}
  //           seen = {data.seen}
  //           >
  //         </ThumbNailCard>


  // (
  //   <ThumbNailCard
  //   key={data.id}
  //   imgSrc={`https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg`}
  //   title={data.title}
  //   videoId={data.videoId}
  //   category2Id = {data.category2Id}
  //   favorites ={data.favorites}
  //   id = {data.id}
  //   seen = {data.seen}
  //   >
  // </ThumbNailCard>
  // )
  
  const categori = useRecoilValue(category)
  

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
            <SlideToggleBtn toggleTime={toggleTime} />
          </SwitchBox>
          
        </SelectLayOut>

        <FlexDiv>
          
          <CategoryList
            selectKategorie = {selectKategorie}
            categori = {categori}
            >
          </CategoryList>
          
          <CardDiv>
            {againCard}
          </CardDiv>
        </FlexDiv>
        
      </InSideLayOut>
    </LayOut>
  )
}
export default StudyFramePage;

