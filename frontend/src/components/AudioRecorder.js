import React, { useState, useRef, useEffect } from 'react';
// MUI
import MicIcon from '@mui/icons-material/Mic';
import MicNoneIcon from '@mui/icons-material/MicNone';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PublishIcon from '@mui/icons-material/Publish';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// Styled
import styled from 'styled-components';

const IconDiv = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #d7e4ec;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function AudioRecorder({ cnt }) {
  const [stream, setStream] = useState({
    access: false,
    recorder: null,
    error: '',
  });

  const [recording, setRecording] = useState({
    active: false,
    available: false,
    url: '',
  });

  const chunks = useRef([]);

  function getAccess() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(mic => {
        let mediaRecorder;

        try {
          mediaRecorder = new MediaRecorder(mic, {
            mimeType: 'audio/webm',
          });
        } catch (err) {
          console.log(err);
        }

        const track = mediaRecorder.stream.getTracks()[0];
        track.onended = () => console.log('ended');

        mediaRecorder.onstart = function() {
          setRecording({
            active: true,
            available: false,
            url: '',
          });
        };

        mediaRecorder.ondataavailable = function(e) {
          console.log('data available');
          chunks.current.push(e.data);
        };

        mediaRecorder.onstop = async function() {
          console.log('stopped');

          const url = URL.createObjectURL(chunks.current[0]);
          chunks.current = [];

          setRecording({
            active: false,
            available: true,
            url,
          });
        };

        setStream({
          ...stream,
          access: true,
          recorder: mediaRecorder,
        });
      })
      .catch(error => {
        console.log(error);
        setStream({ ...stream, error });
      });
  }

  // useEffect(() => {
  //   getAccess();
  // }, []);
  useEffect(() => {
    getAccess();
    setToggleRecord(true);
    setDisabled(false);
  }, [cnt]);

  //
  const [toggleRecord, setToggleRecord] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const recordOn = () => {
    stream.recorder.start();
    setRecording({ ...recording, active: !recording.active });
    setToggleRecord(!toggleRecord);
  };
  const recordOff = () => {
    stream.recorder.stop();
    setToggleRecord(!toggleRecord);
    setDisabled(true);
  };
  const saveFile = () => {
    const FileSaver = require('file-saver');
    FileSaver.saveAs(recording.url, `${recording.url}`);
  };

  return (
    <div>
      {stream.access ? (
        <>
          {disabled ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <audio controls src={recording.url} />
              <IconDiv
                style={{
                  width: '50px',
                  height: '50px',
                  marginLeft: '10px',
                }}
              >
                <FileDownloadOutlinedIcon onClick={saveFile} fontSize="large" />
              </IconDiv>
            </div>
          ) : (
            <>
              {toggleRecord ? (
                <IconDiv>
                  <MicNoneIcon onClick={recordOn} fontSize="large" />
                </IconDiv>
              ) : (
                <IconDiv
                  style={{ boxShadow: '0 0 11px 1px rgba(0, 142, 208)' }}
                >
                  <MicIcon onClick={recordOff} fontSize="large" />
                </IconDiv>
              )}
            </>
          )}
        </>
      ) : (
        <IconDiv>
          <HourglassTopIcon />
        </IconDiv>
      )}
    </div>
  );
}
