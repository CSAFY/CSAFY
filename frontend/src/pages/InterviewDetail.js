/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { defaultAPI } from '../utils/api';
import axios from 'axios';

// Recoil
import { useRecoilState } from 'recoil';
import { LoginState } from '../recoils/LoginState';
import { Token } from '../recoils/Token';

// COMPONENTS
import CommentBox from '../components/CommentBox';

// STYLED
import styled from 'styled-components';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Button } from '@mui/material';

const DetailWrapper = styled.div`
  width: 100%;
  // height: 100vh;
  // width: 100vw;
  // height: 100%;

  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
`;
const DetailContent = styled.div`
  width: 1232px;

  position: relative;
`;

const DetailBox = styled.div`
  width: 840px;
  height: 530px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 135px;
  left: 50%;
  transform: translate(-50%);
`;

const Content = styled.div`
  font-size: 30px;
  font-weight: 600;

  text-align: center;
`;
const Likes = styled.div`
  position: absolute;
  right: 20px;
  bottom: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AttitudeCategory = styled.div`
  width: 78px;
  height: 31px;
  border-radius: 18px;
  background-color: #def9ff;
  font-size: 18px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 20px;
  top: 20px;
`;
const TechCategory = styled.div`
  width: 78px;
  height: 31px;
  border-radius: 18px;
  background-color: #d2fae2;
  font-size: 18px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 20px;
  top: 20px;
`;

const Board = styled.div`
  width: 840px;

  position: absolute;
  top: 789px;
  left: 50%;
  transform: translate(-50%);
`;
const MyComment = styled.div`
  width: 740px;
  height: 230px;
  // border-radius: 9px;
  // box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  // background-color: #fff;

  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%);
`;
const CommentInput = styled.textarea`
  width: 680px;
  // width: 100%;
  height: 100px;
  font-size: 20px;
  padding: 15px;

  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  border: none;

  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%);
`;
const CommentList = styled.div`
  width: 710px;
  position: absolute;
  top: 325px;
  left: 50%;
  transform: translate(-50%);
`;

const Comment = styled.div`
  width: 620px;
  height: 80px;
  border: 1px solid black;

  position: absolute;
  top: 10px;
  left: 25px;
`;
const ButtonBox = styled.div`
  width: 60px;
  height: 80px;
  border: 1px solid black;

  position: absolute;
  top: 10px;
  right: 25px;
`;

function InterviewDetail() {
  // Recoil
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [token, setToken] = useRecoilState(Token);
  const { interviewSeq } = useParams();

  // 면접 질문 관련
  const [interviewInfo, setInterviewInfo] = useState({});
  // 좋아요 정보 가져오기(갱신)
  const getInterviewInfo = () => {
    axios
      .get(`${defaultAPI}/cs-service/interview/${interviewSeq}/info`, {
        headers: { Authorization: token },
      })
      .then(res => {
        setInterviewInfo(res.data);
      })
      .catch(err => console.error(err));
  };
  // console.log('🐕', interviewInfo);
  // 좋아요 눌렀을 때
  const handleLikes = () => {
    axios
      .post(`${defaultAPI}/cs-service/interview/${interviewSeq}/likes`, null, {
        headers: { Authorization: token },
      })
      .then(res => {
        // isliked 갱신
        getInterviewInfo();
      })
      .catch(err => console.error(err));
  };

  // 댓글 관련
  const [myComment, setMyComment] = useState('');
  const handleComment = e => {
    setMyComment(e.target.value);
  };
  const saveComment = e => {
    // 수정은 put, 삭제는 delete - interview/{commentId}/comment
    axios
      .post(
        `${defaultAPI}/cs-service/interview/${interviewSeq}/comment`,
        { comment: myComment },
        { headers: { Authorization: token } },
      )
      .then(res => {
        // console.log(res);
        getComment();
        setMyComment('');
      })
      .catch(err => console.error(err));
  };

  // 댓글 목록 가져오기
  const getComment = () => {
    axios
      .get(`${defaultAPI}/cs-service/interview/${interviewSeq}/comment`, null, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log('🎃', res);
        setCommentData(res.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getComment();
    getInterviewInfo();
  }, []);

  const [commentData, setCommentData] = useState([]);
  const pageHeight = 1000 + commentData.length * 200;

  console.log(commentData);
  return (
    <DetailWrapper
      style={{
        height: `${pageHeight}px`,
      }}
    >
      <DetailContent>
        <DetailBox>
          {interviewInfo.category === '인성' ? (
            <AttitudeCategory>{interviewInfo.category}</AttitudeCategory>
          ) : (
            <TechCategory>{interviewInfo.category}</TechCategory>
          )}
          <Content>Q. {interviewInfo.question}</Content>
          <Likes>
            {interviewInfo.liked ? (
              <ThumbUpIcon
                color="primary"
                sx={{
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
                onClick={handleLikes}
              />
            ) : (
              <ThumbUpOffAltIcon
                color="primary"
                sx={{
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
                onClick={handleLikes}
              />
            )}
            {interviewInfo.interviewLikes}
          </Likes>
        </DetailBox>
        <Board>
          <MyComment>
            <CommentInput
              type="text"
              placeholder="좋은 질문이군요!"
              value={myComment}
              onChange={handleComment}
            />
            <Button
              sx={{
                width: '100px',
                height: '40px',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#fff',
                bgcolor: '#008ED0',
                ':hover': {
                  color: '#006D9F',
                  bgcolor: '#D5F2FC',
                },

                position: 'absolute',
                bottom: '15px',
                right: '15px',
              }}
              onClick={saveComment}
            >
              댓글 등록
            </Button>
          </MyComment>
          {commentData && (
            <CommentList>
              {commentData.map(it => (
                <CommentBox key={it.id} {...it} getComment={getComment} />
              ))}
            </CommentList>
          )}
        </Board>
      </DetailContent>
    </DetailWrapper>
  );
}

export default InterviewDetail;
