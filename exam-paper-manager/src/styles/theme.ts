import { createTheme } from '@mui/material/styles';
import type { Theme, PaletteMode } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      light?: string;
      main: string;
      dark?: string;
      contrastText?: string;
    };
  }
}

// Create a theme instance
const getTheme = (mode: PaletteMode): Theme => {
  const isLight = mode === 'light';
  
  return createTheme({
    shape: {
      borderRadius: 8,
    },
    spacing: 8,
    palette: {
      mode,
      primary: {
        main: isLight ? '#1976d2' : '#90caf9',
        light: isLight ? '#42a5f5' : '#e3f2fd',
        dark: isLight ? '#1565c0' : '#42a5f5',
        contrastText: isLight ? '#fff' : 'rgba(0, 0, 0, 0.87)',
      },
      secondary: {
        main: isLight ? '#9c27b0' : '#ce93d8',
        light: isLight ? '#ba68c8' : '#f3e5f5',
        dark: isLight ? '#7b1fa2' : '#ab47bc',
        contrastText: isLight ? '#fff' : 'rgba(0, 0, 0, 0.87)',
      },
      error: {
        main: isLight ? '#d32f2f' : '#f44336',
        light: isLight ? '#ef5350' : '#e57373',
        dark: isLight ? '#c62828' : '#d32f2f',
        contrastText: '#fff',
      },
      warning: {
        main: isLight ? '#ed6c02' : '#ffa726',
        light: isLight ? '#ff9800' : '#ffb74d',
        dark: isLight ? '#e65100' : '#f57c00',
        contrastText: isLight ? '#fff' : 'rgba(0, 0, 0, 0.87)',
      },
      info: {
        main: isLight ? '#0288d1' : '#29b6f6',
        light: isLight ? '#03a9f4' : '#4fc3f7',
        dark: isLight ? '#01579b' : '#0288d1',
        contrastText: isLight ? '#fff' : 'rgba(0, 0, 0, 0.87)',
      },
      success: {
        main: isLight ? '#2e7d32' : '#66bb6a',
        light: isLight ? '#4caf50' : '#81c784',
        dark: isLight ? '#1b5e20' : '#388e3c',
        contrastText: isLight ? '#fff' : 'rgba(0, 0, 0, 0.87)',
      },
      background: {
        default: isLight ? '#f5f7fa' : '#121212',
        paper: isLight ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: isLight ? 'rgba(0, 0, 0, 0.87)' : '#ffffff',
        secondary: isLight ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
        disabled: isLight ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.5)',
      },
      divider: isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
      action: {
        active: isLight ? 'rgba(0, 0, 0, 0.54)' : '#fff',
        hover: isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
        selected: isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.16)',
        disabled: isLight ? 'rgba(0, 0, 0, 0.26)' : 'rgba(255, 255, 255, 0.3)',
        disabledBackground: isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
      },
      custom: {
        light: '#f3e5f5',
        main: isLight ? '#9c27b0' : '#ba68c8',
        dark: isLight ? '#7b1fa2' : '#9c27b0',
        contrastText: '#fff',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.01562em',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.2,
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
        lineHeight: 1.2,
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.2,
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.2,
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.2,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            minHeight: '100vh',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: isLight ? '#f1f1f1' : '#2d2d2d',
            },
            '&::-webkit-scrollbar-thumb': {
              background: isLight ? '#c1c1c1' : '#555',
              borderRadius: '4px',
              '&:hover': {
                background: isLight ? '#a8a8a8' : '#777',
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          contained: {
            '&:hover': {
              boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            '&:hover': {
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small' as const,
          fullWidth: true,
          variant: 'outlined' as const,
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'currentColor',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? '#ffffff' : '#1e1e1e',
            color: isLight ? 'rgba(0, 0, 0, 0.87)' : '#ffffff',
            boxShadow: isLight 
              ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
              : '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            ...(isLight ? {} : { backgroundColor: '#1e1e1e' }),
          },
        },
      },
    },
  });
};

export const lightTheme = getTheme('light');
export const darkTheme = getTheme('dark');
