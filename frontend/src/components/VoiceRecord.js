/* eslint-disable */
import React, { useCallback, useEffect, useRef, useState } from 'react';
// MUI
import MicIcon from '@mui/icons-material/Mic';
import MicNoneIcon from '@mui/icons-material/MicNone';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PublishIcon from '@mui/icons-material/Publish';

//사용자 정의 Hook - for Timer
const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);
  const intervalRef = useRef(null);
  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, ms);
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);
  const reset = useCallback(() => {
    setCount(0);
    stop();
  }, []);
  return { count, start, stop, reset };
};

//
function VoiceRecord() {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();

  const [disabled, setDisabled] = useState(true);

  const onRecAudio = () => {
    start();
    // setDisabled(true);

    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function(e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function(track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function(e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지 했을 때
  const [audio, setAudio] = useState('');
  const offRecAudio = () => {
    // stop();
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function(e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function(track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();

    onSubmitAudioFile();
  };

  const onSubmitAudioFile = () => {
    if (audioUrl) {
      // console.log(audioUrl);
      // blob 파일
      console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
      setAudio(new Audio(URL.createObjectURL(audioUrl)));
    }
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], 'soundBlob', {
      lastModified: new Date().getTime(),
      type: 'audio',
    });

    setDisabled(false);
    // setToggleUpload(false);
    // setToggle(true);
    console.log(sound); // File 정보 출력
  };
  // console.log(audio);
  const saveFile = () => {
    const FileSaver = require('file-saver');
    FileSaver.saveAs(
      URL.createObjectURL(audioUrl),
      `${URL.createObjectURL(audioUrl)}`,
    );
  };

  //
  const [toggle, setToggle] = useState(true);
  const [toggleUpload, setToggleUpload] = useState(true);
  // console.log(toggle, toggleUpload);

  const play = () => {
    // console.log(audio);
    // const audio = new Audio(URL.createObjectURL(audioUrl));
    if (toggle) {
      audio.loop = false;
      audio.volume = 1;
      audio.play();
      setToggle(!toggle);
    } else {
      console.log('pause');
      audio.pause();
      setToggle(!toggle);
    }
  };

  // Timer
  //시, 분, 초를 state로 저장
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, stop, reset } = useCounter(0, 1000);
  // 타이머 기능
  const timer = () => {
    const checkMinutes = Math.floor(count / 60);
    const hours = Math.floor(count / 3600);
    const minutes = checkMinutes % 60;
    const seconds = count % 60;
    setCurrentHours(hours);
    setCurrentSeconds(seconds);
    setCurrentMinutes(minutes);
  };

  // count의 변화에 따라 timer 함수 랜더링
  useEffect(timer, [count]);
  // useEffect(() => {
  //   return () => end();
  // }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#d7e4ec',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {disabled ? (
          <>
            {onRec ? (
              <MicIcon fontSize="large" color="primary" onClick={onRecAudio} />
            ) : (
              // <button onClick={onRecAudio}>녹음</button>

              <MicNoneIcon
                fontSize="large"
                color="primary"
                onClick={offRecAudio}
              />
            )}
          </>
        ) : (
          <>
            {toggleUpload ? (
              <PublishIcon
                onClick={() => {
                  onSubmitAudioFile();
                  saveFile();
                  setToggleUpload(false);
                }}
              />
            ) : (
              <>
                {toggle ? (
                  <PlayArrowIcon
                    fontSize="large"
                    color="primary"
                    onClick={play}
                  />
                ) : (
                  <StopIcon fontSize="large" color="primary" onClick={play} />
                )}
              </>
            )}
          </>

          // <button onClick={play}>재생</button>
        )}
      </div>
      {/* left: 50%; transform: translate(-50%); */}
      <div
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '50%',
          transform: 'translate(-50%)',
        }}
      >
        {currentHours < 10 ? `0${currentHours}` : currentHours}:
        {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:
        {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </div>
    </div>
  );
}

export default VoiceRecord;
