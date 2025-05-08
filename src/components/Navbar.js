import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Box,
  Tooltip,
  useMediaQuery,
  useTheme,
  Divider,
  Badge,
  capitalize
} from '@mui/material'
import {
  Logout,
  Login,
  ShoppingCart,
  History,
  AccountCircle,
  Menu as MenuIcon
} from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userData'))
  const token = localStorage.getItem('token')
  const { cartCount } = useCart()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [accountAnchor, setAccountAnchor] = useState(null)
  const [mobileAnchor, setMobileAnchor] = useState(null)

  const handleMenuClose = () => {
    setAccountAnchor(null)
    setMobileAnchor(null)
  }

  const handleLogout = () => {
    if (token) {
      dispatch({ type: 'LOGOUT' })
      localStorage.clear()
    }
    navigate('/login')
    handleMenuClose()
  }

  return (
    <AppBar position="static" elevation={3} sx={{ bgcolor: 'primary.main' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
            letterSpacing: 1.2,
          }}
        >
          Food Delivery
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={(e) => setMobileAnchor(e.currentTarget)}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileAnchor}
                open={Boolean(mobileAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem component={Link} to="/orders" onClick={handleMenuClose}>
                  <Badge badgeContent={cartCount} color="error" sx={{ mr: 2 }}>
                    <ShoppingCart fontSize="small" />
                  </Badge>
                  <Typography variant="body2">Order Summary</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/history" onClick={handleMenuClose}>
                  <History fontSize="small" sx={{ mr: 2 }} />
                  <Typography variant="body2">Order History</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Tooltip title="Order Summary">
                <IconButton component={Link} to="/orders" color="inherit">
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Order History">
                <IconButton component={Link} to="/history" color="inherit">
                  <History />
                </IconButton>
              </Tooltip>
            </>
          )}

          <Tooltip title="Account">
            <IconButton onClick={(e) => setAccountAnchor(e.currentTarget)} color="inherit">
              <AccountCircle />
            </IconButton>
          </Tooltip>
          <Menu
  anchorEl={accountAnchor}
  open={Boolean(accountAnchor)}
  onClose={handleMenuClose}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  PaperProps={{
    elevation: 3,
    sx: {
      minWidth: 200,
      borderRadius: 2,
      mt: 1,
      py: 1,
      backgroundColor: '#fff'
    }
  }}
>
  <MenuItem disabled sx={{ opacity: 0.85 }}>
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Typography variant="subtitle2" color="text.primary">
        Signed in as
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <strong>{user?.username ? capitalize(user?.username) : 'Guest'}</strong>
      </Typography>
    </Box>
  </MenuItem>

  <Divider sx={{ my: 1 }} />

  <MenuItem onClick={handleLogout} sx={{ py: 1 }}>
    {token ? (
      <Logout fontSize="small" sx={{ mr: 1 }} />
    ) : (
      <Login fontSize="small" sx={{ mr: 1 }} />
    )}
    <Typography variant="body2">
      {user?.username ? 'Logout' : 'Login'}
    </Typography>
  </MenuItem>
</Menu>

        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
