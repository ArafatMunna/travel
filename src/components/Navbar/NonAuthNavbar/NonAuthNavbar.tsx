import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import PersonIcon from '@mui/icons-material/Person'
import {Box, Menu, MenuItem} from '@mui/material'

import routes from 'routes'
import NmsLogo from 'images/nms.png'
import useAuthToken from 'hooks/persisted/useAuthToken'

import {RightElement} from './NonAuthNavbar.styles'

const NonAuthNavbar = () => {
  const location = useLocation()
  const navigation = useNavigate()
  const {authToken, removeAuthToken} = useAuthToken()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleClose = (callback?: () => void) => {
    setAnchorElUser(null)
    if (callback) callback()
  }

  const isActive = React.useCallback(
    (pathname?: string) => location.pathname === pathname,
    [location.pathname],
  )

  return (
    <AppBar position='fixed' sx={{boxShadow: 'none', background: '#5fcfcf'}}>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          disableRipple
          onClick={() => navigation(routes.home.to)}
        >
          <img src={NmsLogo} height={20} width={30} />
          <Typography
            variant='h4'
            ml={2}
            sx={{
              display: {xs: 'none', sm: 'block'}, // hide on xs, show on sm and up
            }}
          >
            Travify
          </Typography>
        </IconButton>
        <RightElement>
          <Typography
            component='a'
            variant='subtitle2'
            color='#FFFFFF'
            sx={{
              cursor: 'pointer',
              fontWeight: isActive(routes.home.to) ? 600 : 400,
              color: isActive(routes.home.to) ? '#ffb74d' : 'inherit',
            }}
            onClick={() => navigation(routes.home.to)}
            mr={1}
          >
            Home
          </Typography>

          <Typography
            component='a'
            variant='subtitle2'
            color='#FFFFFF'
            sx={{
              cursor: 'pointer',
              fontWeight: isActive(routes.about.to) ? 600 : 400,
              color: isActive(routes.about.to) ? '#ffb74d' : 'inherit',
            }}
            onClick={() => navigation(routes.about.to)}
            mr={1}
          >
            About us
          </Typography>

          <Box sx={{flexGrow: 0}}>
            <IconButton onClick={event => setAnchorElUser(event.currentTarget)} sx={{p: 0}}>
              <PersonIcon sx={{fontSize: 40, color: '#FFFFFF'}} />
            </IconButton>

            <Menu
              sx={{mt: '45px', p: 0}}
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
              onClose={() => setAnchorElUser(null)}
            >
              {authToken ? (
                <>
                  <MenuItem sx={{minWidth: 180}} onClick={() => handleClose(removeAuthToken)}>
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    sx={{
                      minWidth: 180,
                    }}
                    selected={isActive(routes.login.to)}
                    onClick={() => handleClose(() => navigation(routes.login.to))}
                  >
                    <Typography textAlign='center'>Login</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleClose(() => navigation(routes.register.to))}
                    selected={isActive(routes.register.to)}
                  >
                    <Typography textAlign='center'>Register</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </RightElement>
      </Toolbar>
    </AppBar>
  )
}

export default NonAuthNavbar
