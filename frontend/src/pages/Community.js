import { Box, Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Unity, { UnityContext } from 'react-unity-webgl';

import styled from 'styled-components';

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
  width: 150px;
  height: 50px;
  border: 1px solid black;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 10px;
  left: 10px;
`;

function Community() {
  const navigate = useNavigate();

  return (
    <>
      <CommunityWrapper>
        <UnityWrapper>
          <Menu>
            <button
              style={{ width: '100%', height: '100%', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              🐸
            </button>
          </Menu>
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
