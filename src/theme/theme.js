import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5733', // Warm Red for primary actions
    },
    secondary: {
      main: '#FF9800', // Bright Orange for secondary actions
    },
    success: {
      main: '#4CAF50', // Fresh Green for success and freshness
    },
    background: {
      default: '#f4f4f4', // Light background for a clean look
      paper: '#ffffff',  // White background for cards and sections
    },
    text: {
      primary: '#333333', // Dark gray text for readability
      secondary: '#666666', // Lighter gray for secondary text
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif', // Use a clean, modern font
    h1: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px', // Rounded buttons
          padding: '8px 24px',
          textTransform: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '10px', // Rounded dialog corners
        },
      },
    },
  },
});

export default theme;
