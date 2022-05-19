import { MyiFrame,
  FullLayOut,
  DetailLayOut,
  TitleText,
  StudyDetailHr,
  ButtonBox,
  ArrowAndLabel,
  BtnText,
  CategoryShowDiv,
  FlexSpan,
  FlexSpanNon
 } from "./StudyDetailPage.styled"

import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { videoData, studyData } from "../../recoils";

import RelatedExam from "../../components/atoms/studypage/RelatedExam"
import RelatedQuestions from "../../components/atoms/studypage/RelatedQuestions"
import Drawer from "../../components/atoms/studypage/Drawer"
import YouTubeVideo from "../../components/atoms/studypage/YouTubeVideo"


import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';

import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

function StudyDetailPage() {

  const [videoDatas, setVideoDatas ]= useRecoilState(videoData)
  const [studyDatas, setStudyDatas] = useRecoilState(studyData)
  const [beforStudy, setBeforStudy] = useState(false)
  const [afterStudy, setAfterStudy] = useState(false)


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
  
  const clickBeforBtn = () => {
    let beforId = null
    if (videoDatas.id === 1){
      beforId = studyDatas[studyDatas.length - 1]
    }else {
      beforId = studyDatas[videoDatas.id - 2]
    }
    console.log(beforId)
    setVideoDatas(beforId)
  }

  const clickAfterBtn = () => {
    
    let afterId = null
    if (videoDatas.id === studyDatas.length){
      afterId = studyDatas[0]

    }else {
      afterId = studyDatas[videoDatas.id ]
    }
    console.log(afterId)
    setVideoDatas(afterId)
  }

  const ToggleFavorites = (bools) => {
    const JWT = window.localStorage.getItem("jwt")
    axios({
      method: 'post',
      url: `https://csafy.com/api/v1/cs-service/study/${videoDatas.id}/favorites`,
      headers: {
        Authorization: JWT
      },
    })
    .then((res) => {  
      const tmp = { ...videoDatas}
      tmp.favorites = bools
      setVideoDatas(tmp)

      let tmp_data = studyDatas.slice()
      tmp_data[tmp.id - 1] = tmp
      setStudyDatas(tmp_data)
    })
    .catch(err =>{
      console.log(err)
    })
  }


  return (
    <FullLayOut>
      <Drawer></Drawer>
      <DetailLayOut>
        
          <FlexSpanNon>
            <CategoryShowDiv>
              {videoDatas.categoryId}
            </CategoryShowDiv>
            <CategoryShowDiv>
              {videoDatas.category2Id}
            </CategoryShowDiv>
          </FlexSpanNon>
            
        <FlexSpan>
          <TitleText>
            {videoDatas.title}
          </TitleText>
          <span>
            {videoDatas.seen === 1? 
              <img src="images/check.png" alt="check" style={{width:`40px`, height:`40px`, marginRight: "15px"}}></img>
              : null}
            {videoDatas.favorites === 1?
              <img src="images/star.png" alt="star" 
                style={{width:`40px`, height:`40px`,cursor: "pointer"}} 
                onClick={() => ToggleFavorites(0)}></img>
              :<img src="images/nonstar.png" alt="nonstar" 
                style={{width:`40px`, height:`40px`, cursor: "pointer"}} 
                onClick={() => ToggleFavorites(1)}></img>}
          </span>
        </FlexSpan>
        <YouTubeVideo
          videoId={videoDatas.videoId}
          id={videoDatas.id}
          categoryId={videoDatas.categoryId}>
        </YouTubeVideo>
      
        <StudyDetailHr></StudyDetailHr>
        {/* <RelatedExam>
        </RelatedExam>

        <StudyDetailHr></StudyDetailHr>

        <RelatedQuestions>
        </RelatedQuestions> */}
        <ButtonBox>
          <ArrowAndLabel onClick={() => clickBeforBtn()}>
            <ArrowBackIcon sx={{width:"20px;", height : "20px;"}}></ArrowBackIcon>
            <BtnText >이전 강의</BtnText>
          </ArrowAndLabel>
          <ArrowAndLabel onClick={() => clickAfterBtn()}>
            <BtnText >다음 강의</BtnText>
            <ArrowForwardIcon sx={{width:"20px;", height : "20px;" }}></ArrowForwardIcon>
          </ArrowAndLabel>
          
        </ButtonBox>

      </DetailLayOut>
    </FullLayOut>
  
  )
}
export default StudyDetailPage

