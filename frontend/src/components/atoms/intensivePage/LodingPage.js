import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

function LodingPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      카테고리와 학습방법을 선택해 주세요
    </div>
  )
}
export default LodingPage
