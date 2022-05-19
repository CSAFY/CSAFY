import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import styled from "styled-components";



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
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    // <Box
    //   sx={{ width:  250 , 
    //     paddingTop: 10, 
    //     background: "#84c2ea;",
    //     height : "100%;",
    //   }}
    //   role="presentation"
      
    // >
    //   
    //     <DrawerInList
    //       isClick={toggleDrawer('left', false)}
    //       isKeyDown={toggleDrawer('left', false)}
    //       data={kategori}>
    //     </DrawerInList>
    //     gdgd
    //   </List>
    //   <Divider />
    // </Box>
    <DrawerDiv >
      <List>
        <DrawerInList
          isClick={toggleDrawer('left', false)}
          isKeyDown={toggleDrawer('left', false)}
          data={kategori}>
        </DrawerInList>
      </List>
      <Divider />
    </DrawerDiv>
  );

  return (
    <div>
      {
        <React.Fragment key={'left'}>
          <img src="images/clicksidebar.png" alt="clicksidebar" style={{position: "absolute",
            top: "50%",
            left: "0px", cursor: "pointer"}} onClick={toggleDrawer('left', true)}></img>
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

const DrawerDiv = styled.div` 
  width : 250px; 
  padding-top: 100px; 
  background-color: #E5E5E5;
  height : 100%;
`