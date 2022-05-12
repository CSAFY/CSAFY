import styled from "styled-components";
import { fontSize, fontWeight } from "../../_foundation";


export const LayOut = styled.div`
  background: #fff;
  
`;

export const InSideLayOut = styled.div`
  width: 90%;
  height: 1800px;
  margin: 0 104px 0 104px;
  padding: 80px 0 30px 0;
`

export const TitleName = styled.div`
  width: 300px;
  height: 60px;
  margin: 0 auto 5px 12%;
  font-family: SUIT;
  font-size: 35px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`;

export const SearchBox = styled.input`
  weight: 300px;
  height: 50px;
`;

export const SelectLayOut = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const KategorieLayOut = styled.div`
  width:140px;
`

export const FlexDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: start;
  
`;

export const CardDiv = styled.div`
  width: 1150px;
  height : 1650px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 1em;
  justify-items: center;
  align-items: flex-start;
  overflow : scroll;
`

export const SwitchBox = styled.div`
  
  margin : 0 0 0 300px;
`;