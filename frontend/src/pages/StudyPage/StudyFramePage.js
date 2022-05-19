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

import { useLocation  } from 'react-router';
import { useEffect, useRef, useState } from "react";
import CategoryList from "../../components/atoms/studypage/CategoryList"
import ThumbNailCard from "../../components/atoms/studypage/ThumbNailCard"

import SlideToggleBtn from '../../components/atoms/studypage/SlideToggleBtn';

import axios from 'axios';

import { useRecoilState, useRecoilValue } from "recoil";
import { studyData, category } from "../../recoils";

import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function StudyFramePage() {
  const [nowKategorie, setKategorie] = useState("전체 학습")

  const selectKategorie = (event) => {
    setKategorie(event)
  }

  const [toggle, setToggle] = useState(false);
  const toggleTime = () => {
    setToggle(!toggle);
  };
  
  const [studyDatas, setStudyData] = useRecoilState(studyData)
  const categori = useRecoilValue(category)


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

  let navigate = useNavigate();

  const checkLogin=() => {
    const checking = Swal.fire({
      icon: 'error',
      title: '로그인을 해주세요!',
      text: '서비스를 이용하려면 로그인이 필요합니다.',
    })
    .then(() => {
      navigate("/");
    })
    return checking
  }

  useEffect(() => {
    const JWT = window.localStorage.getItem("jwt")
    if (JWT === null ) {
      checkLogin()
    } else {
      console.log("good")
    }
  }, [])

  const location = useLocation();
  useEffect(() => {
    getData();
  }, [location.pathname]);
  
  // const cateFilter = (data, index) => {
  //   if (nowKategorie === "전체 학습"){
  //     return(
  //       <ThumbNailCard
  //           key={data.id}
  //           imgSrc={`https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg`}
  //           title={data.title}
  //           index={index}
  //           videoId={data.videoId}
  //           category2Id = {data.category2Id}
  //           categoryId={data.categoryId}
  //           favorites ={data.favorites}
  //           id = {data.id}
  //           seen = {data.seen}
  //           >
  //         </ThumbNailCard>
  //     )
  //   }else if (nowKategorie == data.categoryId) {
  //     return(
  //       <ThumbNailCard
  //           key={data.id}
  //           imgSrc={`https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg`}
  //           title={data.title}
  //           index={index}
  //           videoId={data.videoId}
  //           category2Id = {data.category2Id}
  //           categoryId={data.categoryId}
  //           favorites ={data.favorites}
  //           id = {data.id}
  //           seen = {data.seen}
  //           >
  //         </ThumbNailCard>
  //     )
  //   } 
  // }
  
  const againCard = studyDatas.map((data, index) => 
      {
        if (toggle === false){
          if (nowKategorie === "전체 학습"){
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
          }else if (nowKategorie == data.categoryId) {
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
        } else if (data.favorites === 1) {
          if (nowKategorie === "전체 학습"){
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
          }else if (nowKategorie == data.categoryId) {
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
      }
  )
  return (
    <LayOut>
      <InSideLayOut>
        {/* <TitleName>
          {nowKategorie}
        </TitleName>
        <SelectLayOut>
          <SwitchBox>
            즐겨찾기
            <SlideToggleBtn toggleTime={toggleTime} />
          </SwitchBox>
        </SelectLayOut> */}

        <FlexDiv>
          <CategoryList
            selectKategorie = {selectKategorie}
            categori = {categori}
            >
          </CategoryList>
          <div>
          <TitleName>
            {nowKategorie}
          </TitleName>
          <SelectLayOut>
            <SwitchBox>
              즐겨찾기
              <SlideToggleBtn toggleTime={toggleTime} />
            </SwitchBox>
          </SelectLayOut>
            <CardDiv>
              {againCard}
            </CardDiv>
          </div>
        </FlexDiv>
        
      </InSideLayOut>
    </LayOut>
  )
}
export default StudyFramePage;

