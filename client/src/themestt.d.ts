import '@material-ui/core/styles'

declare module '@mui/material/styles' {
  interface PaletteColor {
    mediumMain?: string
    medium?: string
  }

  interface SimplePaletteColorOptions {
    mediumMain?: string
    medium?: string
  }
}
