import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { defaultAPI } from '../utils/api';

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
  ///// 좋아요 관련 테스트용
  console.log(
    'from InterviewDetail ----------->',
    'id:',
    id,
    'liked:',
    liked,
    'likesCount:',
    likesCount,
  );
  const [likeCount, setLikeCount] = useState(likesCount);
  // 좋아요 정보 가져오기
  const getCommentLikeData = () => {
    axios
      .get(`${defaultAPI}/cs-service/interview/${id}/comment/likes`)
      .then(res => {
        console.log('commentLikeData', res);
        setLikeCount(res.data.commentLikes);
      })
      .catch(err => console.error(err));
  };
  // useEffect(() => {
  //   getCommentLikeData();
  // }, []);
  // 좋아요 클릭 여부
  const [isClicked, setIsClicked] = useState(liked);
  // 좋아요 정보 수정
  const setCommentLikeData = () => {
    const token = localStorage.getItem('jwt');
    axios
      .post(`${defaultAPI}/cs-service/interview/${id}/comment/likes`, null, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log('settedCommentLikeData', res);
        setIsClicked(!isClicked);
        getCommentLikeData();
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

  // // 댓글 좋아요
  // const [commentLike, setCommentLike] = useState(likesCount);

  // // console.log(liked, likesCount, commentLike);
  // const [isLiked, setIsLiked] = useState(liked);

  // const handleLike = () => {
  //   const token = localStorage.getItem('jwt');
  //   axios
  //     .post(`${defaultAPI}/cs-service/interview/${id}/comment/likes`, null, {
  //       headers: { Authorization: token },
  //     })
  //     .then(res => {
  //       console.log(res);
  //       getSpecificCommentLikes();
  //       setIsLiked(!isLiked);
  //     })
  //     .catch(err => console.error(err));
  // };
  // const getSpecificCommentLikes = () => {
  //   axios
  //     .get(`${defaultAPI}/cs-service/interview/${id}/comment/likes`)
  //     .then(res => {
  //       console.log('🐸🎃', res);
  //       setCommentLike(res.data.commentLikes);
  //     })
  //     .catch(err => console.error(err));
  // };
  // console.log(commentLike, likesCount);

  // useEffect(() => {
  //   getSpecificCommentLikes();
  // }, [isLiked]);

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
          {isClicked ? (
            <>
              <ThumbUpIcon
                sx={{ width: '100%', mt: '15px', cursor: 'pointer' }}
                onClick={setCommentLikeData}
              />
              <p style={{ margin: '0', width: '100%', textAlign: 'center' }}>
                {likeCount}
              </p>
            </>
          ) : (
            <>
              <ThumbUpOffAltIcon
                sx={{ width: '100%', mt: '15px', cursor: 'pointer' }}
                onClick={setCommentLikeData}
              />
              <p style={{ margin: '0', width: '100%', textAlign: 'center' }}>
                {likeCount}
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
