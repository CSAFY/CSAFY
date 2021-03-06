import { Button } from '@mui/material';
import React from 'react';

// REACT-REVEAL
import Fade from 'react-reveal/Fade';
import { useNavigate } from 'react-router-dom';

// STYLED
import styled from 'styled-components';

const HeroWrapper = styled.section`
  height: 100%;
  width: 100%;
  padding-top: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HeroContent = styled.div`
  width: 1232px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const HeroMain = styled.div``;
const HeroImage = styled.img`
  width: 1202px;
  height: 747px;
  flex-grow: 0;
`;

const DataWrapper = styled.section`
  height: 800px;
  width: 100%;

  padding-top: 200px;

  display: flex;
  justify-content: center;
`;
const DataContent = styled.div`
  width: 1232px;

  position: relative;
`;

const InfoWrapper = styled.section`
  width: 100%;
  height: 800px;
  background-color: #f1fcff;

  display: flex;
  justify-content: center;
`;
const InfoContent = styled.div`
  width: 1232px;

  position: relative;
`;
// const InfoImage = styled.img`
//   width: 663px;
//   height: 453px;
//   border: 1px solid black;

//   position: absolute;
//   top: 50px;
// `;

const MetaWrapper = styled.section`
  width: 100%;
  height: 800px;
  background-color: white;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const MetaContent = styled.div`
  width: 1232px;

  display: flex;
  align-items: center;
`;
const MetaImage = styled.img`
  width: 663px;
  height: 453px;
  border: 1px solid black;
`;

const PlusWrapper = styled.section`
  width: 100%;
  height: 800px;

  background-color: #d4effa;
  padding-top: 200px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PlusContent = styled.div`
  width: 1232px;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const PlusImage = styled.img`
  width: 80vw;
  height: 500px;

  margin-top: 5rem;
`;
const ButtonBox = styled.div`
  display: flex;

  margin-top: 2rem;
`;

function BeforeLogin() {
  const navigate = useNavigate();
  return (
    <>
      <HeroWrapper>
        <HeroContent>
          <HeroMain>
            <div
              style={{
                width: '598px',
                height: '140px',
                fontSize: '56px',
                fontWeight: 'bold',
                margin: '0 0 39px',
              }}
            >
              <p style={{ margin: 'auto' }}>????????? CS ??????</p>
              <p style={{ margin: 'auto' }}>???????????? ???????????? ??? ??????!</p>
            </div>
            <div
              style={{
                width: '341px',
                height: '92px',
                margin: '39px 128px 0 129px',
                fontSize: '18px',
              }}
            >
              <p style={{ margin: 'auto' }}>
                ??????????????? ?????? ??????, CS ?????? ??????
              </p>
              <p style={{ margin: 'auto' }}>
                ??????????????? ????????? ??????????????? ??? ????????????????
              </p>
              <br />
              <p style={{ margin: 'auto' }}>
                ???????????? ????????????
                <strong style={{ color: '#008ED0', fontWeight: '800' }}>
                  C;SAFY
                </strong>
                ?????? ??????????????????.
              </p>
            </div>
          </HeroMain>
          <Button
            variant="contained"
            sx={{
              width: '182px',
              height: '53px',
              textAlign: 'center',
              display: 'block',
              margin: '51px 74px 52px 37px',
              border: '1px solid contained',
              borderRadius: '100px',
              backgroundColor: '#008ed0',

              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              // ':hover': {
              //   color: '#008ed0',
              //   bgcolor: 'white',
              // },
            }}
          >
            ?????? ????????????
          </Button>
          <HeroImage src="images/heroimg.png" alt="Img" />
        </HeroContent>
      </HeroWrapper>
      <DataWrapper>
        <DataContent>
          <div style={{ position: 'absolute', top: '100px' }}>
            <p
              style={{
                margin: '0',
                color: '#008ED0',
                width: '198px',
                height: '23px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              ?????? ?????? ?????? ?????????
            </p>
            <p
              style={{
                width: '343px',
                height: '50px',
                fontSize: '40px',
                fontWeight: '800',

                margin: '7px 147px 14px 0',
              }}
            >
              ?????? ?????? ????????? ??????
            </p>
            <div
              style={{
                width: '490px',
                height: '46px',
                fontSize: '18px',
                color: '#a7a8a9',
              }}
            >
              <p style={{ margin: 'auto' }}>
                ???????????? ?????? ????????? ???????????? ????????? ?????? ????????? ????????????
                ????????????
              </p>
              <p style={{ margin: 'auto' }}>
                ?????? ?????? ???????????? ?????? ???????????? ????????? ??? ??? ????????????.
              </p>
            </div>
          </div>
          <Fade right>
            <img
              src="images/graph1.png"
              alt="Graph1"
              style={{
                position: 'absolute',
                right: '74px',
                width: '375px',
                height: '375px',
              }}
            />
            <img
              src="images/graph2.png"
              alt="Graph2"
              style={{
                position: 'absolute',
                top: '300px',
                left: '219px',
                width: '686px',
                height: '311px',
              }}
            />
            <img
              src="images/card1.png"
              alt="Card1"
              style={{
                position: 'absolute',
                top: '450px',
                right: '91px',
                width: '362px',
                height: '188px',
              }}
            />
          </Fade>
        </DataContent>
      </DataWrapper>
      <InfoWrapper>
        <InfoContent>
          <Fade left>
            <img
              src="images/info1.png"
              alt="Info1"
              style={{
                position: 'absolute',
                top: '50px',
                left: '50px',
                width: '627px',
                height: '431px',
              }}
            />
            <img
              src="images/info2.png"
              alt="Info2"
              style={{
                position: 'absolute',
                top: '400px',
                left: '100px',
                width: '497px',
                height: '389px',
              }}
            />
            <img
              src="images/info3.png"
              alt="Info3"
              style={{
                position: 'absolute',
                top: '400px',
                right: '230px',
                width: '374px',
                height: '288px',
              }}
            />
          </Fade>
          <div style={{ position: 'absolute', top: '100px', right: '10px' }}>
            <p
              style={{
                width: '198px',
                height: '23px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#008ED0',
                margin: '0 249px 6px 0',
              }}
            >
              ?????? ?????? ???????????? ??????
            </p>
            <div
              style={{
                width: '264px',
                height: '100px',
                fontSize: '40px',
                fontWeight: '800',
              }}
            >
              <p style={{ margin: '0' }}>????????? ?????? ??????</p>
              <p style={{ margin: '0' }}>????????? ?????? ??????</p>
            </div>
            <div
              style={{
                width: '447px',
                height: '69px',
                margin: '13px 0 0',
                fontSize: '18px',
                color: '#9d9d9d',
              }}
            >
              <p style={{ margin: 'auto' }}>
                ?????? ???????????? ???????????? ????????? ?????? ????????? ????????? ??? ????????????.
              </p>
              <p style={{ margin: 'auto' }}>
                ????????? ????????? ???????????? ?????? ????????? ??????????????? ??????
              </p>
              <p style={{ margin: 'auto' }}>
                ????????? ?????? ????????? ?????? ??? ????????????.
              </p>
            </div>
          </div>
        </InfoContent>
      </InfoWrapper>
      <MetaWrapper>
        <MetaContent>
          <div style={{ width: '50%' }}>
            <p
              style={{
                width: '198px',
                height: '23px',
                margin: '0 249px 8px 0',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#008ED0',
              }}
            >
              ????????? + ???????????? ?????? ??????
            </p>
            <div
              style={{
                width: '334px',
                height: '100px',
                margin: '8px 113px 13px 0',
                fontSize: '40px',
                fontWeight: '800',
              }}
            >
              <p style={{ margin: 'auto' }}>???????????? ????????? ??????</p>
              <p style={{ margin: 'auto' }}>?????? ?????? ?????? ??????</p>
            </div>
            <div
              style={{
                width: '447px',
                height: '69px',
                margin: '13px 0 0 ',
                fontSize: '18px',
                color: '#9d9d9d',
              }}
            >
              <p style={{ margin: 'auto' }}>
                ?????? ???????????? ???????????? ????????? ?????? ????????? ????????? ??? ????????????.
              </p>
              <p style={{ margin: 'auto' }}>
                ????????? ????????? ???????????? ?????? ????????? ??????????????? ??????
              </p>
              <p style={{ margin: 'auto' }}>
                ????????? ?????? ????????? ?????? ??? ????????????.
              </p>
            </div>
          </div>
          <Fade right>
            <MetaImage src="images/Meta.png" alt="Meta" />
          </Fade>
        </MetaContent>
      </MetaWrapper>
      <PlusWrapper>
        <PlusContent>
          <div>
            <p
              style={{
                width: '567px',
                height: '69px',
                margin: '0 112px 25px 111px',
                fontSize: '55px',
                fontWeight: '800',
                color: '#008ecf',
              }}
            >
              ?????? ????????????, CS ?????????
            </p>
            <div
              style={{
                width: '790px',
                height: '50px',
                margin: '25px 0 0',
                fontSize: '20px',
                color: ' #008ecf',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: 'auto' }}>
                C;SAFY??? PC, ????????????, ???????????? ?????? ???????????? ?????? ?????? ????????????
                ????????? ???????????? ??? ????????????.
              </p>
              <p style={{ margin: 'auto' }}>
                ????????? ????????? ?????? ?????? ????????? ?????????, ????????? ???????????????.
              </p>
            </div>
          </div>
          <Fade bottom>
            <PlusImage src="images/plusImg.png" alt="PlusAlpha" />
          </Fade>
          <ButtonBox>
            <Button
              variant="contained"
              sx={{
                width: '194px',
                height: '53px',
                textAlign: 'center',
                display: 'block',
                margin: '0 38px',
                border: '1px solid contained',
                borderRadius: '100px',
                // ':hover': {
                //   color: '#008ed0',
                //   bgcolor: 'white',
                // },
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              ?????? ????????????
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '194px',
                height: '53px',
                textAlign: 'center',
                display: 'block',
                margin: '0 38px',
                border: '1px solid contained',
                borderRadius: '100px',
                // ':hover': {
                //   color: '#008ed0',
                //   bgcolor: 'white',
                // },
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#fff',
              }}
              onClick={() => navigate('/community')}
            >
              ???????????? ????????????
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '194px',
                height: '53px',
                textAlign: 'center',
                display: 'block',
                margin: '0 38px',
                border: '1px solid contained',
                borderRadius: '100px',
                // ':hover': {
                //   color: '#008ed0',
                //   bgcolor: 'white',
                // },
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              ????????? ?????? ????????????
            </Button>
          </ButtonBox>
        </PlusContent>
      </PlusWrapper>
    </>
  );
}

export default BeforeLogin;
