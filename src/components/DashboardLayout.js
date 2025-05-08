import React from 'react';
import Sidebar from './Navbar';
import { Box, useMediaQuery } from '@mui/material';

const DashboardLayout = ({ children }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // marginLeft: isMobile ? 0 : '240px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
