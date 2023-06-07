import { Box, useMediaQuery } from '@mui/material'
import Navbar from 'components/Navbar'
import UserWidget from 'components/Widgets/UserWidget'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends, typeState } from 'state'
import MyPostWidget from 'components/Widgets/MyPostWidget'
import PostsWidget from 'components/Widgets/PostsWidget'
import AdvertWidget from 'components/Widgets/AdvertWidget'
import FriendListWidget from 'components/Widgets/FriendListWidget'
import { useEffect } from 'react'

const HomePage = () => {
  const dispatch = useDispatch()
  const token = useSelector((state: typeState) => state.token)
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
  const user = useSelector((state: typeState) => state.user)

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${user._id}/friends`,
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
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={user?._id} pathPicture={user?.pathPicture} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget pathPicture={user?.pathPicture} />
          <PostsWidget userId={user._id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis='26%'>
            <AdvertWidget />
            <Box m='2rem 0' />
            <FriendListWidget userId={user._id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
