import { useEffect, useRef, useState }from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CusLinearWithValueLabel(props) {
  const [progress, setProgress] = useState(0);

  

  useEffect(() => {
    setProgress(props.selectAnswerCNT/ props.maxSteps *100)
  }, [props.selectAnswerCNT])

  return (
    <Box sx={{ width: '95%', margin: "35px auto 0 auto" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
