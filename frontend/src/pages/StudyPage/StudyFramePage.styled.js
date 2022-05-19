import styled from "styled-components";


export const LayOut = styled.div`
  background: #fff;
  
`;

export const InSideLayOut = styled.div`
  width: 90%;
  height: 1150px;
  margin: 0 104px 0 90px;
  padding: 30px 0 30px 0;
`

export const TitleName = styled.div`
  width: 300px;
  height: 50px;
  margin: 0 auto 0 30px;
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
  justify-content: right;
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
  height: 950px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: flex-start;
  overflow-y : scroll;
  padding: 10px 0 0 7px;
  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`

export const SwitchBox = styled.div`
  
  margin : 0 0 10px 300px;
`;

