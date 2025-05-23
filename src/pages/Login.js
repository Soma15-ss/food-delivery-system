import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Stack
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync } from '../redux/service/auth.service'
import toast from 'react-hot-toast'
import { LoadingButton } from '@mui/lab'

const Login = () => {
  
  // const { login } = useAuth();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({ username: '', password: '' })
  const {isSubmitting} = useSelector((state)=> state.authReducer)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // login(formData.username);
    dispatch(loginAsync(formData)).then(res => {
      if (res?.payload?.statusCode === 200) {
        toast.success(res?.payload?.message)
        localStorage.setItem('token', res?.payload?.token)
        localStorage.setItem('userData', JSON.stringify(res?.payload?.user))
        navigate('/')
      } else {
        toast.error(res?.payload?.message)
      }
    })
  }

  return (
    <Container maxWidth='sm' sx={{ height: '100vh' }}>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Paper sx={{ p: 4, borderRadius: 3, width: '100%' }}>
          <Typography variant='h4' gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                name='username'
                label='Username'
                fullWidth
                required
                onChange={handleChange}
              />
              <TextField
                name='password'
                label='Password'
                type='password'
                fullWidth
                required
                onChange={handleChange}
              />
              <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                Login
              </LoadingButton>
              <Button onClick={() => navigate('/register')} color='secondary'>
                Don't have an account? Register
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login
