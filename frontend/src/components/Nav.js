import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// MUI
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
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
// STYLED
// import styled from 'styled-components';

// SearchBar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid #84c2ea',
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  // color: 'default',
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'default',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

// Navbar에 페이지 추가하려면 pages 안에 요소 추가
const pages = [
  { name: '테스트', link: 'test' },
  { name: '페이지 1', link: 'page1' },
  { name: '페이지 2', link: 'page2' },
];

// const Logo = styled.img`
//   width: 45px;
//   height: 45px;
//   padding-top: 10px;
//   background-color: none;
// `;

const Nav = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('Home');

  const handleOpenNavMenu = (event) => {
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
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: '#D5F2FC',
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
                src="images/logo.ico"
                alt="Img"
                style={{
                  width: '45px',
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
                justifyContent: 'center',
                alignItems: 'center',
              },
              mx: 3,
            }}
          >
            {pages.map((page) => {
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
                        bgcolor: '#D5F2FC',
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
                        bgcolor: '#D5F2FC',
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
                src="images/logo.ico"
                alt="Img"
                style={{
                  width: '45px',
                  height: '45px',
                  paddingTop: '10px',
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
                border: '1px solid black',
                display: 'block',
                ':hover': {
                  color: '#006D9F',
                  bgcolor: '#D5F2FC',
                },
              }}
              onClick={() => {
                navigate('/signup');
                setCurrentPage('signup');
              }}
            >
              회원가입
            </Button>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="default"
              // inherit 흰색 default 회색 primary 파랑 secondary 보라 error 빨강 info 파랑 success 초록 warning 주황 string 적용안됨
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
              {pages.map((page) => {
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
                      }}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>

          {/* 회원가입 / 로그인 버튼 */}
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
            <Search>
              <SearchIconWrapper>
                <SearchIcon style={{ color: 'grey' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Button
              sx={{
                textAlign: 'center',
                mx: 1,
                my: 2,
                color: 'black',
                display: 'block',
                ':hover': {
                  color: '#006D9F',
                  bgcolor: '#D5F2FC',
                },
              }}
            >
              로그인
            </Button>
            <Button
              sx={{
                textAlign: 'center',
                mx: 1,
                my: 2,
                color: 'black',
                border: '1px solid black',
                display: 'block',
                ':hover': {
                  color: '#006D9F',
                  bgcolor: '#D5F2FC',
                },
              }}
              onClick={() => {
                navigate('/signup');
                setCurrentPage('signup');
              }}
            >
              회원가입
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
