import { useEffect, useRef, useState }from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CusStudyLinearWithValueLabel(props) {
  const [progress, setProgress] = useState(0);

  

  useEffect(() => {
    setProgress(props.selectAnswerCNT/ props.maxSteps *100)
  }, [props.selectAnswerCNT])

  return (
    <Box sx={{ width: '80%;', margin: "10px auto 0 auto;" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
