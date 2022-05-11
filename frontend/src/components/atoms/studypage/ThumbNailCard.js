import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { videoData } from "../../../recoils";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';

import axios from 'axios';

import { useRecoilState } from "recoil";
import { studyData } from "../../../recoils";



function ThumbNailCard({index, categoryId, imgSrc, title, videoId,category2Id,favorites,id,seen}) {
  const setVideo = useSetRecoilState(videoData);

  const onClickCard = () => {
    const data = {
      "id" : id,
      "categoryId" : categoryId,
      "category2Id" : category2Id,
      "title" : title,
      "videoId" : videoId,
      "seen" : seen,
      "src" : imgSrc,
      "favorites" : favorites
    }
    setVideo(data)
  }

  const [favorite,setFavorit] =  useState(1)
  useEffect(()=>{
    setFavorit(favorites)
  }, [])
  const size = 30

  const [studyDatas, setStudyData] = useRecoilState(studyData)

  const ToggleFavorites = (bools) => {
    const JWT = window.localStorage.getItem("jwt")
    axios({
      method: 'post',
      url: `https://csafy.com/api/v1/cs-service/study/${id}/favorites`,
      headers: {
        Authorization: JWT
      },
    })
    .then((res) => {
      setFavorit(bools)
      let tmp_data = studyDatas.slice()
    
      const data = {
        "id" : id,
        "categoryId" : categoryId,
        "category2Id" : category2Id,
        "title" : title,
        "videoId" : videoId,
        "seen" : seen,
        "src" : imgSrc,
        "favorites" : (favorites + 1) % 2
      }
      tmp_data[index] = data
      setStudyData(tmp_data)
    })
    .catch(err =>{
      console.log(err)
    })
  }

  const ToggleStar = () => {
    if (favorite === 1){
      return(<StarIcon color="warning" sx={{width:`${size}px;`, height:`${size}px;`}} onClick={() => ToggleFavorites(0)}></StarIcon>)
    } else {
      return(<StarBorderIcon color="warning" sx={{width:`${size}px;`, height:`${size}px;`}} onClick={() => ToggleFavorites(1)}></StarBorderIcon>)
    }
  }

  const isEnd = () => {
    if(seen === 1){
      return(
        <CheckCircleOutlineSharpIcon color="success" sx={{width:`${size}px;`, height:`${size}px;`}}></CheckCircleOutlineSharpIcon>
      )
    }
  }

  return (
    <CardBox>
      <InforDiv>
        <CategoryShowDiv>
          {category2Id}
        </CategoryShowDiv>
        <span>
          {isEnd()}
          {ToggleStar()}
        </span>
      </InforDiv>
      
      
      <Link to="/StudyDetailPage"  style={{ color: 'inherit', textDecoration: 'none' }}  onClick={onClickCard}>
        <CutImg>
          <CardImg
          src={imgSrc}>

          </CardImg>

        </CutImg>
        

        <TextContainer>
          {title}
        </TextContainer>
      </Link>
      {favorite}
    </CardBox>
  )
}
export default ThumbNailCard

const CardBox = styled.div`
  width: 40%;
  min-width: 330px;
  height: 270px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin : 1em;
  border-radius: 15px;
  
  ${
    css`
    :hover{
      box-shadow: 0 8px 16px 0 rgba(0, 125, 207, 0.48);
    }
    `
  }
`

const TextContainer = styled.div`
  padding: 2px 16px;
  text-align: center;
  margin: 5px 0 0 0;
`
const CutImg = styled.div`
  width: 300px; 
  height: 166px; 
  overflow: hidden;
  margin: 10px auto 0 auto;
  
`
const CardImg = styled.img`
  width: 300px;
  margin: -29px 0px -100px 0px;
  src: ${(props) => props.src};
`
const InforDiv = styled.div`
  margin : 5px 20px 5px 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  justify-content: space-between;
`

const CategoryShowDiv = styled.div` 
  flex-grow: 0;
  padding: 4px 10px 4px 10px;
  border-radius: 48px;
  background-color: #84c2ea;
`