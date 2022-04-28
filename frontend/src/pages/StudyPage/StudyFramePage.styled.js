import styled from "styled-components";
import { fontSize, fontWeight } from "../../_foundation";


export const LayOut = styled.div`
  background: #fff;
  
`;

export const InSideLayOut = styled.div`
  width: 1232px;
  height: 1519px;
  margin: 0 104px;
  padding: 130px 5px 812px 0;
`

export const TitleName = styled.div`
  width: 111px;
  height: 30px;
  margin: 0 199px 5px 64px;
  font-family: SUIT;
  font-size: 24px;
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
  justify-content: center;
  align-items: center;
`;

export const KategorieLayOut = styled.div`
  min-width: 100px
`

export const FlexDiv = styled.div`
  display: flex;
`;

export const CardDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 1em;
  justify-items: center;
  align-items: center;
`