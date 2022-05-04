import React, { useEffect, useState } from 'react';
// STYLED
import styled from 'styled-components';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

const Box = styled.div`
  width: 740px;
  height: 100px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;

  margin: 20px;

  position: relative;
`;
const Comment = styled.div`
  width: 620px;
  height: 80px;
  border: 1px solid black;

  position: absolute;
  top: 10px;
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
  height: 80px;
  border: 1px solid black;

  position: absolute;
  top: 10px;
  right: 25px;
`;

function CommentBox({ content, commentId }) {
  const [editToggle, setEditToggle] = useState(false);
  const [comment, setComment] = useState('');

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
        `https://k6a102.p.ssafy.io/api/v1/cs-service/interview/${commentId}/comment`,
        { comment },
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
      .delete(
        `https://k6a102.p.ssafy.io/api/v1/cs-service/interview/${commentId}/comment`,
        null,
        { headers: { Authorization: token } },
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    setComment(content);
  }, []);

  return (
    <div>
      <Box>
        {editToggle ? (
          <CommentInput
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        ) : (
          <Comment>{content}</Comment>
        )}

        <ButtonBox>
          <ThumbUpIcon sx={{ width: '100%', mt: '5px' }} />
          <p style={{ margin: '0', width: '100%', textAlign: 'center' }}>13</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '8px',
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
