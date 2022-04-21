import styled from "styled-components";
import { fontSize, fontWeight } from "../../_foundation";


export const LayOut = styled.div`
  background: rgba(150, 150, 150, 0.5);
  height: 100vh;
`;

export const TitleName = styled.div`
  font-size: ${fontSize.h4};
  font-weight: ${fontWeight.medium};
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