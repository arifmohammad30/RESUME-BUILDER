import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#A4C3B2',
      light: '#CCE3DE',
      dark: '#8BA99A',
    },
    secondary: {
      main: '#CCE3DE',
      light: '#E6F1EF',
      dark: '#B3D1CB',
    },
    background: {
      default: '#F6FFF8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#4A5568',
    },
    divider: '#CCE3DE', // Mint blue for borders and dividers
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0.5rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          backgroundColor: '#FFFFFF',
          border: '1px solid #CCE3DE',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#CCE3DE',
            },
            '&:hover fieldset': {
              borderColor: '#A4C3B2',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#A4C3B2',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2C3E50',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#F6FFF8',
          borderRight: '1px solid #CCE3DE',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#EAF4F4',
          },
          '&.Mui-selected': {
            backgroundColor: '#CCE3DE',
            '&:hover': {
              backgroundColor: '#A4C3B2',
            },
          },
        },
      },
    },
  },
}); 