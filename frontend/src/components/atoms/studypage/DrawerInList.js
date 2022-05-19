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

import CusStudyLinearWithValueLabel from "./CusStudyLinearWithValueLabel"

import { useEffect, useRef, useState } from "react";

import Tooltip from '@mui/material/Tooltip';


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
      studyDatas.filter(element => categoryId === element.categoryId).map((data, index) => {
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
            >
            <Tooltip title={data.title} placement="right-end"  sx={{fontSize: "35px"}}>
              <Contents>
                {index + 1}. {data.title} 
              </Contents>
            </Tooltip>
            
            <span style={{display: "flex", height: "100%", alignItems: "center", marginRight: "10px"}}>
            {data.seen === 1 ? 
              <img src="images/check.png" alt="check"
                style={{width:`17px`, height:`17px`}}>
              </img>: null}
            {data.favorites === 1 ? 
              <img src="images/star.png" alt="star"
              style={{width:`17px`, height:`17px`}} 
              ></img> : null}
            </span>
          </CusListItem>
        )
      })
    )
  }
  
  
  // const DrawerInList = props.data.slice(1).map((categoryId, index) => 
  //   <Accordion 
  //     expanded={expanded === `panel${index + 1}`} 
  //     onChange={handleChange(`panel${index + 1}`)}
  //     key ={index}
  //     sx={{ margin: "0 auto 0 auto;", 
  //     backgroundColor: "rgba(0,0,0,0);",
  //     boxShadow: "0px 0px 0px 0px rgb(0 0 0 / 0%);"}}>
  //     <AccordionSummary
        
  //       aria-controls={`panel${index + 1}bh-content`}
  //       id={`panel${index + 1}bh-header`}
  //       sx={{ margin:"10px 20px 0 20px;",borderRadius: "15px;",
  //       border: "solid 1px;",
  //       background: "#F5F5F5;",
  //       }}
  //     >
  //       <Typography sx={{ width: "90%;", flexShrink: 0,  display:"flex",
  //         justifyContent: "space-between;",fontWeight: "600;",}}>
  //         <span>
  //           {categoryId} 
  //         </span>
  //         <CntDiv>
  //           {studyDatas.filter(element => categoryId === element.categoryId).length}
  //         </CntDiv>
  //       </Typography>
  //     </AccordionSummary>
  //     <AccordionDetails
  //       sx={{ overflowY : "scroll;", maxHeight: "500px;", margin: "0 10px 0 20px;"}}>
        
  //       {ListItems(categoryId)}
        
  //     </AccordionDetails>
  //   </Accordion>
  // )
  
  const onClickBtn = (data) => {
    setNowCatego(data)
  }

  const [nowCatego, setNowCatego] = useState('')

  const AccordionDiv = props.data.slice(1).map((categoryId, index) => 
    <Cont key={index}>
      <Cdiv able={nowCatego === categoryId? true : false}>
        {nowCatego === categoryId ?
        <Opened onClick={()=> onClickBtn('')}>
          <OpenedCateTitle>
           {categoryId}
          </OpenedCateTitle>
          <CusStudyLinearWithValueLabel 
            selectAnswerCNT={studyDatas.filter(element => categoryId === element.categoryId).filter(element => 1 === element.seen).length}
            maxSteps={studyDatas.filter(element => categoryId === element.categoryId).length}></CusStudyLinearWithValueLabel>
          <OpenedCateParsent>
            {Math.round((studyDatas.filter(element => categoryId === element.categoryId).filter(element => 1 === element.seen).length / studyDatas.filter(element => categoryId === element.categoryId).length) * 100) } % 수강 완료
          </OpenedCateParsent>
        </Opened>
        :<Closed onClick={()=> onClickBtn(categoryId)}>
          <CategoryText  style={{width:"110px", textAlign: "center"}}>
            {categoryId}
          </CategoryText>
          <CntDiv>
            {studyDatas.filter(element => categoryId === element.categoryId).length}
          </CntDiv>
        </Closed>
        }
      </Cdiv>
      
      <AccordionItems able={nowCatego === categoryId? true : false}>
        <InsideDiv>
          {ListItems(categoryId)}
        </InsideDiv>
      </AccordionItems>
      
    </Cont>

  )
  
  return (
    <div>
      {AccordionDiv}
    </div>
  );
}

const CategoryText = styled.span`  
  width: 110px; 
  text-align: center;
  font-family: SUIT;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
`


const CntDiv = styled.div`  
  width: 30px;
  height: 30px;
  background-color: #E0EFF8;
  border-radius: 10px;
  font-weight : 0;
  font-size : 14px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: SUIT;
  font-size: 13px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  
  color: #404040;
`
const CusListItem = styled.div`  
  height: 35px;
  margin-top:  5px;
  margin: 10px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
`


const Opened = styled.div` 
  
  width : 80%;


  height: 90px;
  cursor: pointer;
  background: #F5F5F5;
  backface-visibility : hidden;
  margin: 10px 26px 0 26px;
  border-radius: 11px;
  box-shadow: 0 0 7px 0 rgba(39, 110, 232, 0.15);
  background-color: #fff;
`

const Closed = styled.div` 
  display : flex;
  align-items : center;
  justify-content: space-around;
  width : 80%;
  cursor: pointer;
  
  height: 54px;
  
  background: #F5F5F5;
  backface-visibility : hidden;
  margin: 10px 26px 0 26px;
  border-radius: 11px;
  box-shadow: 0 0 7px 0 rgba(39, 110, 232, 0.15);
  background-color: #fff;
`

const Cdiv = styled.div`  
  width : 100%;
  
  ${(props) => {
    if ( props.able === true){
      return css` 
        {
          margin: 20px auto 0 auto;
          height : 20px;
          ${Opened} {
            display : visible;
            position : absolute
          }
          ${Closed} {
            display : hidden;
            position : absolute
          }
        }
      `
    } else {
      return css`
        {
          margin: 20px auto 0 auto;
          height : 40px;
          ${Opened} {
            display : hidden;
            position : absolute
          }
          ${Closed} {
            display : visible;
            position : absolute
          }
        }
      `;
    }
  }}

`

const InsideDiv = styled.div` 
  width: 100%;
  height: 97%;
  overflow-y: scroll; 
`


const AccordionItems = styled.div` 
  width : 76%;
  height : 0;
  margin: 15px 26px 0 26px;
  padding :5px 00px 0 10px;
  background-color: #fff;
  
  border-radius: 11px;
  background-color: #fff;
  transition: height 0.35s ease;
  ${(props) => {
    if (props.able === true) {
      return css`
        {
          height : 400px;
          padding-top : 80px;
        }
      `;
    } else {
      return css`
        cursor: default;
      `;
    }
  }}
`

const Contents = styled.div`
  width: 120px;  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const OpenedCateTitle = styled.div`
  margin-top: 15px;  
  font-family: SUIT;
  font-size: 19px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000;
`

const OpenedCateParsent = styled.div`  
  margin-top: 5px;
  font-family: SUIT;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000;
`



const Cont = styled.div`
  display : flex;
  posotion : relative;
  flex-direction : column;
  justify-content : center;
`




// height: 200px;
//   background-color: #f4fbfe;
//   transition-duration: 0.5s
//   ${(props) => {
//     if (props.status === "Y") {
//       return css`
//         {
//           background-color: #42A7E8;
//           color: #fff;
//         }
//       `;
//     } else {
//       return css`
//         cursor: default;
//       `;
//     }
//   }}

// ${(props) => {
//   if ( props.status === "Y"){
//     return css` 
//       {
//         ${Opened} {
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
//         ${Opened} {
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
// ${Opened} {
//   position : absolute;
//   display : visible;
// }
// ${AfterAccordion} {
//   position : absolute;
//   display : hidden;
// }