import { Box, Button, Modal } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Unity, { UnityContext } from 'react-unity-webgl';

import { useRecoilState, useRecoilValue } from 'recoil';
import { Username } from '../recoils/Username';

import styled from 'styled-components';
import Hamburger from '../components/Hamburger';
import { Token } from '../recoils/Token';
import { defaultAPI } from '../utils/api';
import CommunityInterview from './CommunityInterview';
import ReactBurger from '../components/ReactBurger';

// Develop_mode
const unityContext = new UnityContext({
  loaderUrl: 'build/03.MetaStudy.loader.js',
  dataUrl: 'build/03.MetaStudy.data',
  frameworkUrl: 'build/03.MetaStudy.framework.js',
  codeUrl: 'build/03.MetaStudy.wasm',
  // 스크린샷 용
  webglContextAttributes: {
    preserveDrawingBuffer: true,
    alpha: true,
    antialias: true,
    depth: true,
    failIfMajorPerformanceCaveat: true,
    powerPreference: 'high-performance',
    premultipliedAlpha: true,
    stencil: true,
    desynchronized: true,
    xrCompatible: true,
  },
});
const CommunityWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const UnityWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: grey;

  position: relative;
`;
const Menu = styled.div`
  width: 200px;
  height: 200px;
  // border: 1px solid black;
  // background-color: white;

  // display: flex;
  // justify-content: center;
  // align-items: center;

  position: absolute;
  top: 0px;
  left: 10px;
`;

function Community() {
  const navigate = useNavigate();
  const [nickname, SetNickname] = useState('Noname'); // 유니티 내에서의 닉네임 = 안쓸수도 있음
  const username = useRecoilValue(Username); // 회원정보

  //

  const [token, setToken] = useRecoilState(Token);
  // // 1부터 10 사이 정수
  // const [randSeq, setRandSeq] = React.useState(
  //   Math.floor(Math.random() * 10 + 1),
  // );

  // 로딩 완료시 유저네임 -> 닉네임 옮기기
  useEffect(function() {
    unityContext.on('GetNickName', function(name) {
      if (name === 'start') {
        unityContext.send('NetworkManager', 'SetNickNameReact', username);
      } else {
        SetNickname(name);
      }
    });
  }, []);

  // 방 들어갔을때 작동, 방 이름 얻어오고 관련 로직 수행
  useEffect(() => {
    unityContext.on('GetRoomName', function(name) {
      console.log(name);
    });
  }, []);

  // 방 들어갔을때 작동, 방 이름 얻어오고 관련 로직 수행
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState('인성');
  useEffect(() => {
    unityContext.on('SetInteview', function(name) {
      if (name === '인성') {
        // 인성 문제 받아오기
        // getCharInterview();
        setCategory('character');
        axios
          .post(
            `${defaultAPI}/cs-service/interview/create`,
            {
              category: 'character',
              question: 1,
            },
            { headers: { Authorization: token } },
          )
          .then(res => {
            console.log(res);
            setInterviewInfo(res.data[0]);
          })
          .catch(err => console.error(err));
      } else {
        // 기술 문제 받아오기
        // openInterviewModal();
        // getTechInterview();
        setCategory('tech');

        axios
          .post(
            `${defaultAPI}/cs-service/interview/create`,
            {
              category: 'tech',
              question: 1,
            },
            { headers: { Authorization: token } },
          )
          .then(res => {
            console.log(res);
            setInterviewInfo(res.data[0]);
          })
          .catch(err => console.error(err));
      }
      // 모달 띄우기
      setModal(true);
    });
  }, []);

  // 메인로비 들어갔을때 작동, 해당 유저의 펫 정보를 보낸다.
  useEffect(() => {
    unityContext.on('GetPetInfo', function(name) {
      unityContext.send('PetManager', 'SetPetInfo', 'Pet11'); // 해당 유저의 펫 정보
    });
  }, []);

  // const getCharInterview = () => {
  //   axios
  //     .post(
  //       `${defaultAPI}/cs-service/interview/create`,
  //       {
  //         category: 'character',
  //         question: 1,
  //       },
  //       { headers: { Authorization: token } },
  //     )
  //     .then(res => {
  //       console.log(res);
  //       setInterviewInfo(res.data[0]);
  //     })
  //     .catch(err => console.error(err));
  // };
  // const getTechInterview = () => {
  //   axios
  //     .post(
  //       `${defaultAPI}/cs-service/interview/create`,
  //       {
  //         category: 'tech',
  //         question: 1,
  //       },
  //       { headers: { Authorization: token } },
  //     )
  //     .then(res => {
  //       console.log(res);
  //       setInterviewInfo(res.data[0]);
  //     })
  //     .catch(err => console.error(err));
  // };
  console.log(category);
  // test
  const [interviewInfo, setInterviewInfo] = React.useState({});
  const getInterviewInfo = () => {
    console.log(category);
    if (category === 'character') {
      axios
        .post(
          `${defaultAPI}/cs-service/interview/create`,
          {
            category: 'character',
            question: 1,
          },
          { headers: { Authorization: token } },
        )
        .then(res => {
          console.log(res);
          setInterviewInfo(res.data[0]);
        })
        .catch(err => console.error(err));
    } else {
      axios
        .post(
          `${defaultAPI}/cs-service/interview/create`,
          {
            category: 'tech',
            question: 1,
          },
          { headers: { Authorization: token } },
        )
        .then(res => {
          console.log(res);
          setInterviewInfo(res.data[0]);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <>
      <CommunityWrapper>
        <UnityWrapper>
          <Menu>
            {/* <button
              style={{
                width: '100%',
                height: '100%',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              🐸
            </button> */}
            {/* <Hamburger
              getInterviewInfo={getInterviewInfo}
              interviewInfo={interviewInfo}
            /> */}
            {/* <button onClick={() => setModal(!modal)}>test</button> */}
            <ReactBurger />
          </Menu>
          <div>
            <CommunityInterview
              modal={modal}
              setModal={setModal}
              getInterviewInfo={getInterviewInfo}
              interviewInfo={interviewInfo}
            />
          </div>
          <Unity
            style={{ width: '100%', height: '100%' }}
            // style={{ width: '640px !important', height: '480px !important' }}
            matchWebGLToCanvasSize={true}
            unityContext={unityContext}
          />
          {/* <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '40px',
              fontWeight: '600',
            }}
          >
            METABUS
          </div> */}
        </UnityWrapper>
      </CommunityWrapper>
    </>
  );
}

export default Community;
