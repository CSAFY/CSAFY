import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { defaultAPI } from '../utils/api';
// Recoil
import { useRecoilState } from 'recoil';
import { LoginState } from '../recoils/LoginState';
import { Token } from '../recoils/Token';

// STYLED
import styled from 'styled-components';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

const Box = styled.div`
  width: 740px;
  height: 140px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;

  margin: 20px;

  position: relative;
`;
const UserInfo = styled.div`
  position: absolute;
  top: 10px;
  left: 25px;
`;
const DateInfo = styled.div`
  position: absolute;
  top: 30px;
  left: 25px;
`;
const Comment = styled.div`
  width: 610px;
  height: 55px;
  border: 1px solid black;

  padding-top: 10px;
  padding-left: 10px;

  position: absolute;
  bottom: 10px;
  left: 25px;
`;
const CommentInput = styled.input`
  width: 620px;
  height: 80px;
  padding: 0;
  border: 1px solid black;

  position: absolute;
  top: 10px;
  left: 25px;
`;
const ButtonBox = styled.div`
  width: 60px;
  height: 119px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: rgba(0, 142, 208, 0.1);

  position: absolute;
  top: 10px;
  right: 15px;
`;

function CommentBox({
  id,
  comment,
  interviewSeq,
  createdAt,
  liked,
  likesCount,
  username,
  getComment,
}) {
  // Recoil
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [token, setToken] = useRecoilState(Token);
  const [likeCount, setLikeCount] = useState(likesCount);

  // 댓글 정보 가져오기
  const [commentInfo, setCommentInfo] = useState({});
  console.log(commentInfo);

  const handleLike = () => {
    setCommentLikeData({ id });
    getCommentLikeData({ id });
    getCommentData({ id });
  };
  const getCommentData = ({ id }) => {
    axios
      .get(`${defaultAPI}/cs-service/interview/${id}/comment/info`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log('🐕', res);
        setCommentInfo(res.data);
      })
      .catch(err => console.error(err));
  };
  useEffect(() => {
    getCommentData({ id });
  }, []);

  // 좋아요 정보 가져오기
  const getCommentLikeData = ({ id }) => {
    axios
      .get(`${defaultAPI}/cs-service/interview/${id}/comment/likes`)
      .then(res => {
        console.log('commentLikeData', res);
        setLikeCount(res.data.commentLikes);
      })
      .catch(err => console.error(err));
  };
  // // 좋아요 클릭 여부
  // const [isClicked, setIsClicked] = useState(liked);
  // useEffect(() => {
  //   getCommentLikeData();
  // }, []);
  // useEffect(() => {
  //   getCommentData(id);
  // }, [isClicked]);

  // 좋아요 정보 수정
  const setCommentLikeData = ({ id }) => {
    axios
      .post(`${defaultAPI}/cs-service/interview/${id}/comment/likes`, null, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log('settedCommentLikeData', res);
        getCommentLikeData({ id });
      })
      .catch(err => console.error(err));
  };

  /////

  const [editToggle, setEditToggle] = useState(false);
  const [newComment, setNewComment] = useState(comment);

  // 수정 관련
  const toggleComment = () => {
    setEditToggle(!editToggle);
    // 수정은 put, 삭제는 delete - interview/{commentId}/comment
    if (editToggle) {
      editComment();
    }
  };
  const editComment = () => {
    const token = localStorage.getItem('jwt');
    axios
      .put(
        `${defaultAPI}/cs-service/interview/${id}/comment`,
        { comment: newComment },
        { headers: { Authorization: token } },
      )
      .then(res => {
        console.log(res);
        setNewComment(res.data.comment);
      })
      .catch(err => console.error(err));
  };
  // console.log(newComment);
  // 삭제
  const deleteComment = () => {
    const token = localStorage.getItem('jwt');
    axios
      .delete(`${defaultAPI}/cs-service/interview/${id}/comment`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log(res);
        getComment();
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <Box>
        {editToggle ? (
          <CommentInput
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
        ) : (
          <>
            <UserInfo>{username}</UserInfo>
            <DateInfo>{createdAt.substr(0, 10)}</DateInfo>
            <Comment>{newComment}</Comment>
          </>
        )}

        <ButtonBox>
          {commentInfo.liked ? (
            <>
              <ThumbUpIcon
                sx={{ width: '100%', mt: '15px', cursor: 'pointer' }}
                onClick={handleLike}
              />
              <p style={{ margin: '0', width: '100%', textAlign: 'center' }}>
                {commentInfo.commentLikesCount}
              </p>
            </>
          ) : (
            <>
              <ThumbUpOffAltIcon
                sx={{ width: '100%', mt: '15px', cursor: 'pointer' }}
                onClick={handleLike}
              />
              <p style={{ margin: '0', width: '100%', textAlign: 'center' }}>
                {commentInfo.commentLikesCount}
              </p>
            </>
          )}
          {/* {isLiked ? (
            <>
              <ThumbUpIcon
                sx={{ width: '100%', mt: '15px', cursor: 'pointer' }}
                onClick={handleLike}
              />
              <p style={{ margin: '0', width: '100%', textAlign: 'center' }}>
                {commentLike}
              </p>
            </>
          ) : (
            <>
              <ThumbUpOffAltIcon
                sx={{ width: '100%', mt: '15px', cursor: 'pointer' }}
                onClick={handleLike}
              />
              <p style={{ margin: '0', width: '100%', textAlign: 'center' }}>
                {commentLike}
              </p>
            </>
          )} */}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '18px',
            }}
          >
            {editToggle ? (
              <EditIcon
                color="primary"
                sx={{ cursor: 'pointer' }}
                onClick={toggleComment}
              />
            ) : (
              <EditIcon sx={{ cursor: 'pointer' }} onClick={toggleComment} />
            )}
            <ClearIcon sx={{ cursor: 'pointer' }} onClick={deleteComment} />
          </div>
        </ButtonBox>
      </Box>
    </div>
  );
}

export default CommentBox;
