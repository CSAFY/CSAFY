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
              sx={{ background: "#84c2ea;", border: " solid", marginTop: "5px"}}
              >
              <ListItemText primary={data.title} />
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
      sx={{ margin: "0 auto 0 auto;"}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index + 1}bh-content`}
        id={`panel${index + 1}bh-header`}
        sx={{ margin:"10px 0 0 0;"}}
      >
        <Typography sx={{ width: "90%;", flexShrink: 0,  }}>{categoryId} /{studyDatas.filter(element => categoryId === element.categoryId).length}</Typography>
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
