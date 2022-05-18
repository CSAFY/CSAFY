import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useRecoilValue, useSetRecoilState } from "recoil";
import { studyData, videoData } from "../../../recoils";

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import styled from "styled-components";

import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import StarIcon from '@mui/icons-material/Star';


export default function DrawerInList(props) {
  const [expanded, setExpanded] = React.useState(false);
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const studyDatas = useRecoilValue(studyData)
  const setVideo = useSetRecoilState(videoData);

  const onClickVideo = (event, data) => {
    props.isClick('left', false)
    
    setVideo(data)
  }

  const ListItems = (categoryId) =>  {
    return(
      studyDatas.slice(1).map((data, index) => {
        if (categoryId === data.categoryId){
          return(
            <ListItem button  key={index} onClick={(event) => {onClickVideo(event, {
              "imgSrc":`https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg`,
              "title": data.title,
              "videoId":data.videoId,
              "category2Id" : data.category2Id,
              "categoryId": data.categoryId,
              "favorites" : data.favorites,
              "id" : data.id,
              "seen" : data.seen })}} 
              sx={{ background: "#F5F5F5;",
               border: "solid 1px;",
               borderRadius: "15px;",
               marginTop: "5px;",
               margin:"10px 0 0 0;",
               display:" flex;",
               justifyContent: "space-between;"}}
              >
              {data.title} 
              <span>
              {data.seen === 1 ? 
                <CheckCircleOutlineSharpIcon 
                  color="success" 
                  sx={{width:`20px;`, height:`20px;`}}>
                </CheckCircleOutlineSharpIcon>: null}
              {data.favorites === 1 ? 
                <StarIcon color="warning" 
                sx={{width:`20px;`, height:`20px;`}} 
                ></StarIcon> : null}
              </span>
              {/* <ListItemText primary={data.title} /> */}
            </ListItem>
          )
        }
      })
    )
  }
  
  
  const DrawerInList = props.data.slice(1).map((categoryId, index) => 
    <Accordion 
      expanded={expanded === `panel${index + 1}`} 
      onChange={handleChange(`panel${index + 1}`)}
      key ={index}
      sx={{ margin: "0 auto 0 auto;",  boxShadow: "none;",
      backgroundColor: "rgba(0,0,0,0);"}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index + 1}bh-content`}
        id={`panel${index + 1}bh-header`}
        sx={{ margin:"10px 0 0 0;",borderRadius: "15px;",
        border: "solid 1px;",
        background: "#F5F5F5;",}}
      >
        <Typography sx={{ width: "90%;", flexShrink: 0,  display:"flex",
          justifyContent: "space-between;",fontWeight: "600;",}}>
          <span>
            {categoryId} 
          </span>
          <TextDiv>
            {studyDatas.filter(element => categoryId === element.categoryId).length}
          </TextDiv>
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ overflowY : "scroll;", maxHeight: "500px;"}}>
        
        {ListItems(categoryId)}
        
      </AccordionDetails>
    </Accordion>
  )
  
  return (
    <div>
      {DrawerInList}
    </div>
  );
}


const TextDiv = styled.div`  
  width: 45px;
  background-color: #E0EFF8;
  border-radius: 10px;
  color : dimgray;
  text-align: center;
`