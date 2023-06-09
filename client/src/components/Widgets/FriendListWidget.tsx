import { Box, Typography, useTheme } from '@mui/material'
import Friend from 'components/Friend'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends, typeState } from 'state'
import WidgetWrapper from './WidgetWrapper'
import mongoose from 'mongoose'

interface IProps {
  userId?: mongoose.Types.ObjectId | string
}

const FriendListWidget = ({ userId }: IProps) => {
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const token = useSelector((state: typeState) => state.token)
  const friends = useSelector((state: typeState) => state.user.friends)

  const getFriends = async () => {
    const response = await fetch(
      `https://mern-app-api-rho.vercel.app/users/${userId}/friends`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  useEffect(() => {
    getFriends()
  }, []) // eslint-disable-line

  return (
    <WidgetWrapper>
      <Typography
        color={palette.secondary.dark}
        variant='h5'
        fontWeight='500'
        sx={{ mb: '1.5rem' }}
      >
        Friend List
      </Typography>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        {friends.map((friend) => (
          <Friend
            key={friend._id as React.Key}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPathPicture={friend.pathPicture}
          />
        ))}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendListWidget
