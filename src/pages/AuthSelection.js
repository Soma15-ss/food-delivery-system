// pages/AuthSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Stack,
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const AuthSelection = () => {
  const navigate = useNavigate();

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
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: 'center',
            width: '100%',
            background: 'linear-gradient(135deg, #ffcc80 0%, #ffe0b2 100%)',
          }}
        >
          <RestaurantMenuIcon sx={{ fontSize: 60, color: '#ff7043', mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome to Food Delivery
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Please login or register to continue
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#f4511e' } }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                color: '#ff7043',
                borderColor: '#ff7043',
                '&:hover': { borderColor: '#f4511e', color: '#f4511e' },
              }}
            >
              Register
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthSelection;
