import { Typography, useTheme } from '@mui/material'
import WidgetWrapper from './WidgetWrapper'
import FlexBetween from 'components/FlexBetween'

const AdvertWidget = () => {
  const { palette } = useTheme()
  const dark = palette.secondary.dark
  const main = palette.secondary.main
  const medium = palette.secondary.medium

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant='h5' fontWeight='500'>
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width='100%'
        height='auto'
        alt='advert'
        src='https://mern-app-api-rho.vercel.app/assets/info4.jpg'
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}>RicardoLanches</Typography>
        <Typography color={medium}>ricardolanches.com</Typography>
      </FlexBetween>
      <Typography color={medium} m='0.5rem 0'>
        Your most loved and tasty hamburger place, come and try several options
        of handmade burgers.
      </Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget
