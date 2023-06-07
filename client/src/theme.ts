import { PaletteMode} from '@mui/material'

/* eslint-disable*/
interface ColorTokens {
  [key: string]: {
    [key: number]: string
  }
}
// color design tokens export
export const colorTokens: ColorTokens = {
  grey: {
    0: '#FFFFFF',
    10: '#F6F6F6',
    50: '#F0F0F0',
    100: '#E0E0E0',
    200: '#C2C2C2',
    300: '#A3A3A3',
    400: '#858585',
    500: '#666666',
    600: '#4D4D4D',
    700: '#333333',
    800: '#1A1A1A',
    900: '#0A0A0A',
    1000: '#000000',
  },
  primary: {
    50: '#f5e6ff',
    100: '#eacdfe',
    200: '#d69bfd',
    300: '#bf64fc',
    400: '#ab32fb',
    500: '#9600fa',
    600: '#7100bd',
    700: '#4d0080',
    800: '#25003d',
    900: '#0f001a',
  },
}

// mui theme settings
export const themeSettings = (mode: PaletteMode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            secondary: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              paper: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            secondary: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              paper: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ['Rubik', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  }
}
