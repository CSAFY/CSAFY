import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';



import { useRecoilValue } from "recoil";
import { category } from "../../../recoils";

import DrawerInList from './DrawerInList';


export default function TemporaryDrawer() {

  const kategori = useRecoilValue(category)

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return ;
    }
    // console.log(event)
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width:  250 , 
        paddingTop: 10, 
        background: "#84c2ea;",
        height : "100%;",
      }}
      role="presentation"
      
    >
      <List>
        <DrawerInList
          isClick={toggleDrawer('left', false)}
          isKeyDown={toggleDrawer('left', false)}
          data={kategori}>
        </DrawerInList>
      </List>
      <Divider />

      
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment key={'left'}>
          <Button onClick={toggleDrawer('left', true)}>다른 강의 선택</Button>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}