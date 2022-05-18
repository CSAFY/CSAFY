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

import styled, {css} from "styled-components";

import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import StarIcon from '@mui/icons-material/Star';

import { useEffect, useRef, useState } from "react";


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
            <CusListItem button  key={index} onClick={(event) => {onClickVideo(event, {
              "imgSrc":`https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg`,
              "title": data.title,
              "videoId":data.videoId,
              "category2Id" : data.category2Id,
              "categoryId": data.categoryId,
              "favorites" : data.favorites,
              "id" : data.id,
              "seen" : data.seen })}} 
              // sx={{ background: "#F5F5F5;",
              //  border: "solid 1px;",
              //  borderRadius: "15px;",
              //  marginTop: "5px;",
              //  margin:"10px 0 0 0;",
              //  display:" flex;",
              //  justifyContent: "space-between;"}}
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
            </CusListItem>
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
      sx={{ margin: "0 auto 0 auto;", 
      backgroundColor: "rgba(0,0,0,0);",
      boxShadow: "0px 0px 0px 0px rgb(0 0 0 / 0%);"}}>
      <AccordionSummary
        
        aria-controls={`panel${index + 1}bh-content`}
        id={`panel${index + 1}bh-header`}
        sx={{ margin:"10px 20px 0 20px;",borderRadius: "15px;",
        border: "solid 1px;",
        background: "#F5F5F5;",
        }}
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
        sx={{ overflowY : "scroll;", maxHeight: "500px;", margin: "0 10px 0 20px;"}}>
        
        {ListItems(categoryId)}
        
      </AccordionDetails>
    </Accordion>
  )

  const [numClick, setNumClick] = useState("")

  useEffect(() => {
    console.log(props)
  }, [])

  const ppp = (categoryId) => {
    setNumClick(categoryId)
    console.log("numClick",numClick)
    console.log("categoryId", categoryId )
    console.log("categoryId === numClick", categoryId === numClick)
  }

  const Pppp = props.data.slice(1).map((categoryId, index) => 
    <Cont 
      key={index}
      status = {categoryId === numClick ? "N" : "Y"}
      >
       
      <BeforAccordion  onClick={() => ppp("")}>
        <CusSpanText>
          {categoryId} 
        </CusSpanText>
        <TextDiv>
          {studyDatas.filter(element => categoryId === element.categoryId).length}
        </TextDiv>
      </BeforAccordion> 
       <AfterAccordion onClick={() => ppp(categoryId)}>
        {categoryId} 
      </AfterAccordion>
      

      
    </Cont>

  )
  
  return (
    <div>
      {/* {DrawerInList} */}
      {Pppp}
    </div>
  );
}



const TextDiv = styled.div`  
  width: 26px;
  height: 23px;
  background-color: #E0EFF8;
  border-radius: 10px;
  text-align: center;
  font-family: SUIT;
  font-size: 15px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #404040;
  padding-top: 3px;
`
const CusListItem = styled.div`  
  background: #F5F5F5;
  border : solid 1px;
  margin-top:  5px;
  margin: 10px 0 0 0;
  display: flex;
  justify-content: space-between;
`
const BeforAccordion = styled.div` 
  width : 180px;
  height : 40px;
  margin : 0 auto 15px auto;
  background-color : #FFFFFF;
  border-radius: 11px;
  box-shadow: 0 0 7px 0 rgba(39, 110, 232, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding : 10px 10px 10px 10px;
  transition : 1s;
`

const AfterAccordion = styled.div` 
  width : 180px;
  height : 90px;
  margin : 0 auto 15px auto;
  background-color : #FFFFFF;
  border-radius: 11px;
  box-shadow: 0 0 7px 0 rgba(39, 110, 232, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding : 10px 10px 10px 10px;
  transition: margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`


const CusSpanText = styled.span`  
  font-family: SUIT;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`


const Cont = styled.div`
  
  height: 200px;
  background-color: #f4fbfe;
  transition-duration: 0.5s
  ${(props) => {
    if (props.status === "Y") {
      return css`
        {
          background-color: #42A7E8;
          color: #fff;
        }
      `;
    } else {
      return css`
        cursor: default;
      `;
    }
  }}
`

// ${(props) => {
//   if ( props.status === "Y"){
//     return css` 
//       {
//         ${BeforAccordion} {
//           display : hidden;
//           position : absolute
//         }
//         ${AfterAccordion} {
//           display : visible;
//           position : absolute
//         }
//       }
//     `
//   } else {
//     return css`
//       {
//         ${BeforAccordion} {
//           display : visible;
//           position : absolute
//         }
//         ${AfterAccordion} {
//           display : hidden;
//           position : absolute
//         }
//       }
//     `;
//   }
// }}
// ${BeforAccordion} {
//   position : absolute;
//   display : visible;
// }
// ${AfterAccordion} {
//   position : absolute;
//   display : hidden;
// }