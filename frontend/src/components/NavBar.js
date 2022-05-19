/* eslint-disable */
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// RECOIL
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { LoginState } from '../recoils/LoginState';
import { Token } from '../recoils/Token';
import {
  keyWordData,
  fourWayRaceData,
  oxquizData,
  videoData,
  studyData,
  likeKeyWord,
} from '../recoils';
import { Userinfo } from '../recoils/Userinfo';
import { Username } from '../recoils/Username';
import { CurrentPage } from '../recoils/CurrentPage';
import { NavToggle } from '../recoils/NavToggle';

// COMPONENTS
import Modal from '@mui/material/Modal';
import AuthModal from './AuthModal';

// STYLED
import styled from 'styled-components';
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
import { Tooltip } from '@mui/material';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

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

const ProfileNormal = styled.img`
  width: 35px;
  height: 35px;
  background: #84c2ea;
  border-radius: 50%;
  // box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.8);
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;
const ProfileVip = styled.img`
  width: 35px;
  height: 35px;
  background: linear-gradient(to right bottom, #008ed0, #b5fcca);
  border-radius: 50%;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208);

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

// Navbar에 페이지 추가하려면 pages 안에 요소 추가
const pages = [
  { name: '일반 학습', link: 'StudyFramePage' },
  { name: '집중 학습', link: 'IntensivePage' },
  // { name: '채팅', link: 'chat' },
  { name: '면접 대비', link: 'interview' },
  // { name: '기술 스택', link: 'classification' },
  // { name: '메타버스', link: 'community' },
  // { name: '실력 테스트', link: 'CSTest' },
];
// 실력 테스트 드롭다운
const settings = [
  { name: '문제집', link: 'CSTest' },
  { name: '오답노트', link: 'reviewNote' },
];

const NavBar = () => {
  // Recoil
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [token, setToken] = useRecoilState(Token);
  const [toggle, setToggle] = useRecoilState(NavToggle);
  //reset용 recoil
  const resetKeyWordData = useResetRecoilState(keyWordData);
  const resetFourWayRaceData = useResetRecoilState(fourWayRaceData);
  const resetOXQuizData = useResetRecoilState(oxquizData);
  const resetVideoData = useResetRecoilState(videoData);
  const resetStudyData = useResetRecoilState(studyData);
  const resetLikeKeyWord = useResetRecoilState(likeKeyWord);

  const [userinfo, setUserinfo] = useRecoilState(Userinfo);
  const setUsername = useSetRecoilState(Username);
  const [currentPage, setCurrentPage] = useRecoilState(CurrentPage);

  // 실력테스트 anchor
  const [anchorElUser, setAnchorElUser] = useState(null);
  // const [toggle, setToggle] = useState(false);
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
    setToggle(true);
    // setCurrentPage('/');
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setToggle(false);
  };

  // MODAL
  const [state, setState] = useState('signup');
  const [modal, setModal] = useState(false);
  const handleModalOpen = () => {
    setState('login');
    setCurrentPage('/');
    setModal(true);
    setToggle(false);
  };
  const handleModalClose = () => setModal(false);

  // nav
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // 커뮤니티 페이지에서 네브바 안보이게 하기
  const location = useLocation();
  if (location.pathname === '/community') return null;

  // 로그아웃 관련
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    // Recoil
    setIsLoggedIn(false);
    setToken('');

    localStorage.removeItem('study_data_token');
    localStorage.removeItem('four_way_Race_data_token');
    localStorage.removeItem('keyWord_data_token');
    localStorage.removeItem('oxquiz_data_token');
    localStorage.removeItem('video_data_token');

    // Recoil
    setIsLoggedIn(false);
    setToken('');
    setUserinfo({});
    setUsername('');
    resetKeyWordData();
    resetFourWayRaceData();
    resetOXQuizData();
    resetVideoData();
    resetStudyData();
    resetLikeKeyWord();

    // 이동
    navigate('/');
    setCurrentPage('/');
    setToggle(false);
  };

  // console.log(userinfo.profile_image);

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
              setToggle(false);
            }}
          >
            <Link to="/">
              <img
                src="https://csafy-profile.s3.amazonaws.com/logo/logo_test.png"
                alt="Img"
                style={{
                  width: '110px',
                  height: '40px',
                  paddingTop: '10px',
                  backgroundColor: 'none',
                }}
              />
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
                      setToggle(false);
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
                      setToggle(false);
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

            {/* 실력테스트 */}
            <Tooltip title="Open settings">
              {toggle ? (
                <Button
                  onClick={handleOpenUserMenu}
                  sx={{
                    textAlign: 'center',
                    mx: 1,
                    my: 2,
                    color: '#006D9F',
                    fontWeight: 'bold',
                    display: 'block',
                    ':hover': {
                      color: '#006D9F',
                      bgcolor: '#ffffff',
                      // bgcolor: '#D5F2FC',
                    },
                  }}
                >
                  실력 테스트
                </Button>
              ) : (
                <Button
                  onClick={handleOpenUserMenu}
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
                  실력 테스트
                </Button>
              )}
            </Tooltip>
            {/* 실력테스트 드롭다운 메뉴 */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => {
                      navigate(`${setting.link}`);
                      setCurrentPage(setting.link);
                      // setToggle(false);
                    }}
                  >
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            {/* 메타버스 */}
            <Button
              onClick={() => {
                navigate(`/community`);
                setCurrentPage('/community');
                setToggle(false);
              }}
              sx={{
                textAlign: 'center',
                mx: 1,
                my: 2,
                color: 'black',
                display: 'flex',
                ':hover': {
                  color: '#006D9F',
                  bgcolor: '#ffffff',
                  // bgcolor: '#D5F2FC',
                },
              }}
            >
              메타버스
              <ViewInArIcon />
            </Button>
          </Box>

          {/* 반응형 - 좁은 화면 로고 */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
            onClick={() => {
              setCurrentPage('Home');
              setToggle(false);
            }}
          >
            <Link to="/">
              <img
                src="https://csafy-profile.s3.amazonaws.com/logo/logo_test.png"
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
            {/* {token ? (
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
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            ) : (
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
            )} */}
            {token && (
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
            )}

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
              <MenuItem
                onClick={() => {
                  navigate(`/community`);
                  setCurrentPage('community');
                }}
                sx={{
                  ':hover': {
                    color: '#006D9F',
                    bgcolor: '#ffffff',
                  },
                }}
              >
                <Typography textAlign="center">메타버스</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(`/cstest`);
                  setCurrentPage('cstest');
                }}
                sx={{
                  ':hover': {
                    color: '#006D9F',
                    bgcolor: '#ffffff',
                  },
                }}
              >
                <Typography textAlign="center">실력 테스트</Typography>
              </MenuItem>
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
            {isLoggedIn ? (
              <>
                {userinfo.is_vip === 'Y' ? (
                  <ProfileVip
                    src={`${userinfo.profile_image}`}
                    alt="profile"
                    onClick={() => {
                      navigate('/myPage');
                      setCurrentPage('/myPage');
                      setToggle(false);
                    }}
                  >
                    {/* <PermIdentityOutlinedIcon
                    // style={{ background: 'linear-gradient(#e66465, #9198e5)' }}
                    /> */}
                  </ProfileVip>
                ) : (
                  <ProfileNormal
                    src={`${userinfo.profile_image}`}
                    alt="profile"
                    onClick={() => {
                      navigate('/myPage');
                      setCurrentPage('/myPage');
                      setToggle(false);
                    }}
                  >
                    {/* <img
                      src={`${userinfo.profile_image}`}
                      alt="profile"
                      style={{
                        width: '35px',
                        height: '35px',
                      }}
                    /> */}
                    {/* <PermIdentityOutlinedIcon
                    // style={{ background: 'linear-gradient(#e66465, #9198e5)' }}
                    /> */}
                  </ProfileNormal>
                )}

                {/* <Button
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
                  onClick={handleLogout}
                >
                  로그아웃
                </Button> */}
              </>
            ) : (
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
                {/* {toggleLogin} */}
              </Button>
            )}

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
