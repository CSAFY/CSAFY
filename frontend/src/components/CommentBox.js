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
  comment,
  interviewSeq,
  createdAt,
  liked,
  likesCount,
  username,
}) {
  const [editToggle, setEditToggle] = useState(false);
  const [newComment, setNewComment] = useState('');

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
        `${defaultAPI}/cs-service/interview/${interviewSeq}/comment`,
        { comment: newComment },
        { headers: { Authorization: token } },
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  };
  const deleteComment = () => {
    const token = localStorage.getItem('jwt');
    axios
      .delete(`${defaultAPI}/cs-service/interview/1/comment`, null, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  };

  const [commentLike, setCommentLike] = useState(liked);
  useEffect(() => {
    setNewComment(comment);
  }, []);
  // console.log(liked);
  const handleLike = () => {
    if (commentLike) {
      console.log('liked->like');
      setCommentLike(liked);
    } else {
      console.log('like->liked');
      setCommentLike(!liked);
    }
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
            <Comment>{comment}</Comment>
          </>
        )}

        <ButtonBox>
          {commentLike ? (
            <>
              <ThumbUpIcon
                sx={{ width: '100%', mt: '15px', cursor: 'pointer' }}
                onClick={handleLike}
              />
              <p style={{ margin: '0', width: '100%', textAlign: 'center' }}>
                {likesCount}
              </p>
            </>
          ) : (
            <>
              <ThumbUpOffAltIcon
                sx={{ width: '100%', mt: '15px', cursor: 'pointer' }}
                onClick={handleLike}
              />
              <p style={{ margin: '0', width: '100%', textAlign: 'center' }}>
                {likesCount}
              </p>
            </>
          )}

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
