// pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/service/auth.service';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';

const Register = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
    const {isSubmitting} = useSelector((state) => state.authReducer)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast('Passwords do not match', {
        icon: '⚠️',
        style: {
          // background: '#facc15', // amber-400
          color: '#000',
        },
      });
      return;
    }
    const payload = {
        username: formData.username,
        password: formData.password,
        role: 'user',
    }
    dispatch(register(payload)).then((res) => {
        if(res?.payload?.statusCode === 201){
            toast.success(res?.payload?.message);
            navigate('/login');
        }
    })  
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh' }}>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper sx={{ p: 4, borderRadius: 3, width: '100%' }}>
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                name="username"
                label="Username"
                fullWidth
                required
                onChange={handleChange}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                required
                onChange={handleChange}
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                required
                onChange={handleChange}
              />
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Register
              </LoadingButton>
              <Button onClick={() => navigate('/login')} color="secondary">
                Already have an account? Login
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
