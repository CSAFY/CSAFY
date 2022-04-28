import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// MUI
// inherit 흰색 default 회색 primary 파랑 secondary 보라 error 빨강 info 파랑 success 초록 warning 주황 string 적용안됨
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

// MODAL
import Modal from '@mui/material/Modal';
import AuthModal from './AuthModal';

// STYLED
// import styled from 'styled-components';

const loginStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '517px',
  height: '697px',
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4,
};
const signupStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '517px',
  height: '834px',
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4,
};

// Navbar에 페이지 추가하려면 pages 안에 요소 추가
const pages = [
  { name: '일반 학습', link: 'StudyFramePage' },
  { name: '집중 학습', link: 'IntensivePage' },
  { name: '테스트', link: 'test' },
  { name: '면접 대비', link: 'page2' },
];

// const Logo = styled.img`
//   width: 45px;
//   height: 45px;
//   padding-top: 10px;
//   background-color: none;
// `;

const NavBar = () => {
  // MODAL
  const [state, setState] = useState('signup');
  const [modal, setModal] = useState(false);
  const handleModalOpen = () => {
    setState('login');
    setModal(true);
  };
  const handleModalClose = () => setModal(false);

  // nav
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('Home');

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        zIndex: theme => theme.zIndex.drawer + 1,
        // bgcolor: '#D5F2FC',
        bgcolor: '#ffffff',
        margin: '0',
      }}
    >
      <Container maxWidth="xl" style={{ minWidth: '400px' }}>
        <Toolbar disableGutters>
          {/* 반응형 - 넓은 화면 로고*/}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
            }}
            onClick={() => {
              setCurrentPage('Home');
            }}
          >
            <Link to="/">
              <img
                src="images/csafy.png"
                alt="Img"
                style={{
                  width: '110px',
                  height: '45px',
                  paddingTop: '10px',
                  backgroundColor: 'none',
                }}
              />
              {/* <Logo src="images/logo.ico" /> */}
            </Link>
          </Typography>
          {/* 반응형 - 넓은 화면 navbar */}
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                md: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              },
              mx: 3,
            }}
          >
            {pages.map(page => {
              if (page.link !== currentPage) {
                return (
                  <Button
                    key={page.name}
                    onClick={() => {
                      navigate(`/${page.link}`);
                      setCurrentPage(page.link);
                    }}
                    sx={{
                      textAlign: 'center',
                      mx: 1,
                      my: 2,
                      color: 'black',
                      display: 'block',
                      ':hover': {
                        color: '#006D9F',
                        bgcolor: '#ffffff',
                        // bgcolor: '#D5F2FC',
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={page.name}
                    onClick={() => {
                      navigate(`/${page.link}`);
                      setCurrentPage(page.link);
                    }}
                    sx={{
                      textAlign: 'center',
                      mx: 1,
                      my: 2,
                      color: '#006D9F ',
                      fontWeight: 'bold',
                      display: 'block',
                      ':hover': {
                        color: '#006D9F',
                        bgcolor: '#ffffff',
                        // bgcolor: '#D5F2FC',
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                );
              }
            })}
          </Box>

          {/* 반응형 - 좁은 화면 로고 */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            onClick={() => {
              setCurrentPage('Home');
            }}
          >
            <Link to="/">
              {/* <Logo src="images/logo.ico" /> */}
              <img
                src="images/csafy.png"
                alt="Img"
                style={{
                  width: '110px',
                  height: '45px',
                  paddingTop: '10px',
                  paddingLeft: '10px',
                  backgroundColor: 'none',
                }}
              />
            </Link>
          </Typography>
          {/* 반응형 - 좁은 화면 햄버거 */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <Button
              sx={{
                textAlign: 'center',
                mx: 1,
                my: 2,
                color: 'black',
                display: 'block',
                ':hover': {
                  color: '#006D9F',
                  bgcolor: '#ffffff',
                  // bgcolor: '#D5F2FC',
                },
              }}
              onClick={handleModalOpen}
            >
              로그인
            </Button>
            <Modal
              open={modal}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              {state === 'login' ? (
                <Box sx={loginStyle}>
                  <AuthModal
                    state={state}
                    setState={setState}
                    setModal={setModal}
                  />
                </Box>
              ) : (
                <Box sx={signupStyle}>
                  <AuthModal
                    state={state}
                    setState={setState}
                    setModal={setModal}
                  />
                </Box>
              )}
            </Modal>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="default"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                color: 'text.secondary',
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => {
                if (page.link !== currentPage) {
                  return (
                    <MenuItem
                      key={page.name}
                      onClick={() => {
                        navigate(`/${page.link}`);
                        setCurrentPage(page.link);
                      }}
                      sx={{
                        ':hover': {
                          color: '#006D9F',
                          bgcolor: '#ffffff',
                        },
                      }}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem
                      key={page.name}
                      onClick={() => {
                        navigate(`/${page.link}`);
                        setCurrentPage(page.link);
                      }}
                      sx={{
                        ':hover': {
                          color: '#006D9F',
                        },
                        color: '#006D9F ',
                        fontWeight: 'bold',
                        bgcolor: '#ffffff',
                      }}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>

          {/* 넓은 화면 로그인 버튼 */}
          <Box
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
              mx: 3,
            }}
          >
            <Button
              sx={{
                textAlign: 'center',
                mx: 1,
                my: 2,
                color: 'black',
                display: 'block',
                ':hover': {
                  color: '#006D9F',
                  bgcolor: '#ffffff',
                  // bgcolor: '#D5F2FC',
                },
              }}
              onClick={handleModalOpen}
            >
              로그인
            </Button>
            <Modal
              open={modal}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              {state === 'login' ? (
                <Box sx={loginStyle}>
                  <AuthModal
                    state={state}
                    setState={setState}
                    setModal={setModal}
                  />
                </Box>
              ) : (
                <Box sx={signupStyle}>
                  <AuthModal
                    state={state}
                    setState={setState}
                    setModal={setModal}
                  />
                </Box>
              )}
            </Modal>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
