import React from 'react';

// STYLED
import styled from 'styled-components';

const Company = styled.div`
  width: 390px;
  height: 181px;
  margin: 10px;
  border-radius: 20px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;

  position: relative;
`;
const CompanyImg = styled.img`
  width: 50px;
  height: 50px;

  position: absolute;
  top: 33px;
  left: 33px;
`;
const CompanyInfo = styled.div`
  height: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: absolute;
  top: 33px;
  left: 100px;
`;
const CompanyName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;
const CompanyLocation = styled.div`
  font-size: 10px;
  color: #6c6c6c;
`;
const StackInfo = styled.div`
  height: 34px;

  display: flex;
  align-items: center;

  position: absolute;
  top: 120px;
  left: 33px;
`;
const StackImg = styled.img`
  width: 34px;
  height: 34px;
  margin-right: 15px;
`;

function CompanyBox(props) {
  return (
    <Company>
      <CompanyImg src={props.img} />
      <CompanyInfo>
        <CompanyName>{props.company}</CompanyName>
        <CompanyLocation>{props.location}</CompanyLocation>
      </CompanyInfo>
      <StackInfo>
        {props.stacks.map((v, i) => (
          <StackImg key={i} src={v} />
        ))}
      </StackInfo>
    </Company>
  );
}

export default CompanyBox;
