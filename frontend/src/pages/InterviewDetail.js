import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';
import { defaultAPI } from '../utils/api';
import axios from 'axios';

import { Button } from '@mui/material';
import CommentBox from '../components/CommentBox';

// STYLED
import styled from 'styled-components';
const DetailWrapper = styled.div`
  width: 100%;
  height: 2000px;
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
  height: 1020px;

  position: absolute;
  top: 789px;
  left: 50%;
  transform: translate(-50%);
`;
const MyComment = styled.div`
  width: 740px;
  height: 230px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;

  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%);
`;
const CommentInput = styled.textarea`
  width: 600px;
  height: 100px;
  font-size: 20px;
  padding: 15px;

  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%);
`;
const CommentList = styled.div`
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
  const { interviewSeq } = useParams();

  const { state } = useLocation();
  console.log(state);
  // console.log(interviewSeq);
  const [isLiked, setIsLiked] = useState(state.liked);

  const handleLikes = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      axios
        .post(
          `${defaultAPI}/cs-service/interview/${interviewSeq}/likes`,
          null,
          { headers: { Authorization: token } },
        )
        .then(res => {
          console.log(res);
          setIsLiked(!isLiked);
        })
        .catch(err => console.error(err));
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  // 댓글
  const [myComment, setMyComment] = useState('');
  const handleComment = e => {
    setMyComment(e.target.value);
  };
  const saveComment = e => {
    const token = localStorage.getItem('jwt');
    // 수정은 put, 삭제는 delete - interview/{commentId}/comment
    axios
      .post(
        `${defaultAPI}/cs-service/interview/${interviewSeq}/comment`,
        { comment: myComment },
        { headers: { Authorization: token } },
      )
      .then(res => {
        console.log(res);
        getComment();
        setMyComment('');
      })
      .catch(err => console.error(err));
  };
  // 댓글 수정

  // 다른사람 댓글
  const getComment = () => {
    const token = localStorage.getItem('jwt');
    axios
      .get(`${defaultAPI}/cs-service/interview/${interviewSeq}/comment`, null, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log(res);
        setCommentData(res.data);
      })
      .catch(err => console.error(err));
  };
  useEffect(() => {
    getComment();
  }, []);
  const [commentData, setCommentData] = useState([]);

  return (
    <DetailWrapper>
      <DetailContent>
        <DetailBox>
          {state.category === '인성' ? (
            <AttitudeCategory>{state.category}</AttitudeCategory>
          ) : (
            <TechCategory>{state.category}</TechCategory>
          )}
          <Content>Q. {state.question}</Content>
          <Likes>
            {isLiked ? (
              <ThumbUpIcon
                color="primary"
                sx={{ marginRight: '10px', cursor: 'pointer' }}
                onClick={handleLikes}
              />
            ) : (
              <ThumbUpOffAltIcon
                color="primary"
                sx={{ marginRight: '10px', cursor: 'pointer' }}
                onClick={handleLikes}
              />
            )}

            {state.interviewLikes}
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
                <CommentBox key={it.id} {...it} />
              ))}
            </CommentList>
          )}
        </Board>
      </DetailContent>
    </DetailWrapper>
  );
}

export default InterviewDetail;
