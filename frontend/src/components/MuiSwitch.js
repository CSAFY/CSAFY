import React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
// Recoil
import { useRecoilState } from 'recoil';
import { TimeLimit } from '../recoils/TimeLimit';

const IOSSwitch = styled(props => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        // backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        backgroundColor: theme.palette.mode === 'light' ? '#84c2ea' : '#008ed0',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    // backgroundColor: theme.palette.mode === 'dark' ? '#84c2ea' : '#84c2ea',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

function MuiSwitch() {
  const [timeLimit, setTimeLimit] = useRecoilState(TimeLimit);

  return (
    <IOSSwitch
      sx={{ m: 1 }}
      checked={timeLimit}
      onChange={() => setTimeLimit(!timeLimit)}
    />
  );
}

export default MuiSwitch;
