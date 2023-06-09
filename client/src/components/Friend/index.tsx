import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFriends, typeState } from 'state'
import FlexBetween from 'components/FlexBetween'
import UserImage from 'components/UserImage'
import mongoose from 'mongoose'
import { useEffect } from 'react'

interface IProps {
  friendId: mongoose.Types.ObjectId | string
  name: string
  subtitle: string
  userPathPicture: string
}

const Friend = ({ friendId, name, subtitle, userPathPicture }: IProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: typeState) => state.user)
  const token = useSelector((state: typeState) => state.token)
  const friends = useSelector((state: typeState) => state.user.friends)

  // const getFriends = async () => {
  //   const response = await fetch(
  //     `https://mern-app-api-rho.vercel.app/users/${user._id}/friends`,
  //     {
  //       method: 'GET',
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   )
  //   const data = await response.json()
  //   dispatch(setFriends({ friends: data }))
  // }

  // useEffect(() => {
  //   getFriends()
  // }, []) // eslint-disable-line

  const { palette } = useTheme()
  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.secondary.main
  const medium = palette.secondary.medium

  const isFriend = friends.find((friend) => friend._id === friendId)

  const patchFriend = async () => {
    const response = await fetch(
      `https://mern-app-api-rho.vercel.app/users/${user?._id}/${friendId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={userPathPicture} size='55px' />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`)
            navigate(0)
          }}
        >
          <Typography
            color={main}
            variant='h5'
            fontWeight='500'
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize='0.75rem'>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  )
}

export default Friend
