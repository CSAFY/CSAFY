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
    const JWT = window.localStorage.getItem("jwt")
    
    axios({
      method: 'get',
      url: "https://csafy.com/api/v1/cs-service/study/list/get",
      headers: {
        Authorization: JWT
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
  
  // https://i.ytimg.com/vi/-M_S50Ga384/hqdefault.jpg
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

  
  const categori = useRecoilValue(category)
  

  return (
    <LayOut>
      <InSideLayOut>
        <TitleName>
          {nowKategorie}
        </TitleName>
        <SelectLayOut>
          {/* <SearchBox
            placeholder="Search…"
            value={searchValue}
            onChange={onChange}>
          </SearchBox> */}

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

