// // pages/Login.js
// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   Container,
//   Paper,
//   IconButton,
//   Stack,
//   Tooltip,
// } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = (role) => {
//     login('john', role);
//     navigate('/menu');
//   };

//   const roles = [
//     {
//       label: 'User',
//       icon: <PersonIcon fontSize="large" />,
//       color: 'primary',
//     },
//     {
//       label: 'Manager',
//       icon: <SupervisorAccountIcon fontSize="large" />,
//       color: 'secondary',
//     },
//     {
//       label: 'Admin',
//       icon: <AdminPanelSettingsIcon fontSize="large" />,
//       color: 'success',
//     },
//   ];

//   return (
//     <Container maxWidth="sm" sx={{ height: '100vh' }}>
//       <Box
//         sx={{
//           height: '100%',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Paper
//           elevation={6}
//           sx={{
//             width: '100%',
//             borderRadius: 3,
//             p: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             minHeight: { xs: 350, sm: 400 }, // Ensures visible height on mobile too
//             textAlign: 'center',
//           }}
//         >
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Login
//           </Typography>

//           <Typography variant="subtitle1" sx={{ mb: 4, color: 'text.secondary' }}>
//             Select a role to continue
//           </Typography>

//           <Stack direction="row" spacing={4} justifyContent="center">
//             {roles.map((role) => (
//               <Box key={role.label}>
//                 <Tooltip title={role.label}>
//                   <IconButton
//                     color={role.color}
//                     onClick={() => handleLogin(role.label)}
//                     sx={{
//                       flexDirection: 'column',
//                       border: '2px solid',
//                       borderColor: `${role.color}.main`,
//                       borderRadius: 2,
//                       p: 2,
//                       transition: 'transform 0.2s ease-in-out',
//                       '&:hover': {
//                         transform: 'scale(1.1)',
//                       },
//                     }}
//                   >
//                     {role.icon}
//                     <Typography variant="caption" mt={1}>
//                       {role.label}
//                     </Typography>
//                   </IconButton>
//                 </Tooltip>
//               </Box>
//             ))}
//           </Stack>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default Login;
// pages/Login.js
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
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
