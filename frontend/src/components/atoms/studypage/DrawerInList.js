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

  const onClickVideo = ({imgSrc, title, videoId}) => {
    // props.isClick()
    const tmp = {
      "videoId" : videoId,
      "title" : title,
      "src" : imgSrc
    }
    console.log(tmp)
    // setVideo(tmp)
  }

  const ttt = (event, index) => { 
    props.isClick('left', false)
    console.log(event)
    console.log(index)
  }

  const ListItems = studyDatas.map((data, index) => 
    
      <ListItem button  key={index} onClick={ttt} >
        <ListItemText primary={data.snippet.title} />
      </ListItem>
    
  )
  
  
  const DrawerInList = props.data.map((data, index) => 
    <Accordion 
      expanded={expanded === `panel${index + 1}`} 
      onChange={handleChange(`panel${index + 1}`)}
      key ={index}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index + 1}bh-content`}
        id={`panel${index + 1}bh-header`}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>{data}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        
        {ListItems}
        
      </AccordionDetails>
    </Accordion>
  
  )
  
  return (
    <div>
      {DrawerInList}
    </div>
  );
}