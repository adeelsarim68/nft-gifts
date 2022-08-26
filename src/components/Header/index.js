import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ethers } from 'ethers';
import { Tooltip, Avatar } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaidIcon from '@mui/icons-material/Paid';
import MetaMaskOnboarding from '@metamask/onboarding';

import './index.css'

const ResponsiveAppBar = () => {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [WalletAddress, setWalletAddress] = useState();
  const [WalletBalance, setWalletBalance] = useState();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function fetchMyAddress() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const accounts = await provider.send('eth_requestAccounts', []);
    setWalletAddress(accounts);
    const balance = await provider.getBalance(accounts[0]);
    setWalletBalance(ethers.utils.formatEther(balance));
  }

  useEffect(() => {
    fetchMyAddress();
  }, []);


  async function handleCreatContract() {
    const response = await fetch(
      'https://thentic.tech/api/nfts/contract',
      {
        body: JSON.stringify({
          key: process.env.REACT_APP_KEY,
          chain_id: process.env.REACT_APP_CHAIN_ID,
          name: 'nftContract',
          short_name: 'myContract',
          redirect_url: 'https://www.google.com',
          webhook_url: 'https://us-central1-knightweb3.cloudfunctions.net/addContract'
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    ).then((response) => response.json())
      .then((data) => {
        console.log(data, 'data')
        debugger
        const url = data.transaction_url;
        window.location.href = url;
      });
    console.log(response)
  }

  //MetaMaskWallet Extension Button
  useEffect(() => {
    const onboarding = new MetaMaskOnboarding();
    const btn = document.querySelector('.onboard');
    const statusText = document.querySelector('.h1');
    const { ethereum } = window;

    const isMetaMaskInstalled = () => {
      return Boolean(ethereum && ethereum.isMetaMask);
    };

    let connected = () => {
      statusText.innerHTML = 'Connected!';
      btn.style.display = 'none';
    };

    async function connectWallet() {
      return await ethereum.request({ method: 'eth_accounts' });
    }

    const onClickInstallMetaMask = () => {
      onboarding.startOnboarding();
    };
    if (btn) {
      btn.addEventListener('click', async () => {
        // btn.style.backgroundColor = '#FFD450';

        try {
          const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
          });
          connected(accounts);
        } catch (error) {
          console.error(error);
        }
      });
    }
    const MetaMaskClientCheck = () => {
      if (!isMetaMaskInstalled()) {
        statusText.innerText = 'You need to Install a Wallet !';
        btn.innerText = 'Install MetaMask';
        // btn.style.backgroundColor = '#FFD450';
        btn.onclick = onClickInstallMetaMask;
      } else {
        connectWallet().then((accounts) => {
          if (accounts && accounts[0] > 0) {
            connected(accounts);
          } else {
            statusText.innerHTML = '';
            // btn.style.display = 'none';
            btn.innerText = 'Connect MetaMask';
          }
        });
      }
    };
    MetaMaskClientCheck();
  }, []);

  return (
    <AppBar position='static' sx={{ bgcolor: '#21232A' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <CardGiftcardIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GIFTS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link style={{ textDecoration: 'none' }} to='/my-nfts'>MY NFT</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link style={{ textDecoration: 'none' }} to='/mint-nft'>MINT NFT</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link style={{ textDecoration: 'none' }} to='/'>MARKET PLACE</Link>
              </MenuItem>
            </Menu>
          </Box>

          <CardGiftcardIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NFTS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* <Link style={{ textDecoration: 'none', color: 'white', marginRight: '25px' }} to='/'>MARKET PLACE</Link> */}
            <Link style={{ textDecoration: 'none', color: 'white', marginRight: '25px' }} to='/mint-nft'>MINT NFT</Link>
            <Link style={{ textDecoration: 'none', color: 'white', marginRight: '25px' }} to='/my-nfts'>MY NFT</Link>
          </Box>
          <button
            className='metaMaskButton'
            onClick={handleCreatContract}
          >
            Creat Contract
          </button>

          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <Box sx={{ mx: 3 }}>
              <Typography>
                <span
                  style={{ fontSize: '9px', color: 'red' }}
                  className='h1'
                ></span>
              </Typography>
              <button
                className='onboard metaMaskButton'
              ></button>
            </Box>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt='Remy Sharp'
                  src='https://res.cloudinary.com/teepublic/image/private/s--DVJyzCco--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_484849,e_outline:48/co_484849,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1536020712/production/designs/3104958_1.jpg'
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Box sx={{ display: 'flex' }}>
                  <AccountBalanceWalletIcon
                    sx={{ flexGrow: 1 }}
                  ></AccountBalanceWalletIcon>
                  {WalletAddress ? (
                    <Typography>&nbsp;{WalletAddress}</Typography>
                  ) : (
                    <Typography>&nbsp;Connect Wallet</Typography>
                  )}
                </Box>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Box sx={{ display: 'flex', mx: 0 }}>
                  <PaidIcon sx={{ flexGrow: 1 }}></PaidIcon>
                  {WalletBalance ? (
                    <Typography>
                      <strong>&nbsp;{WalletBalance} ETH</strong>
                    </Typography>
                  ) : (
                    <Typography>&nbsp;0.00 ETH</Typography>
                  )}
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
