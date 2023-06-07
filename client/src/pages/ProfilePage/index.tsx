import { Box, useMediaQuery } from '@mui/material'
import Navbar from 'components/Navbar'
import FriendListWidget from 'components/Widgets/FriendListWidget'
import MyPostWidget from 'components/Widgets/MyPostWidget'
import PostsWidget from 'components/Widgets/PostsWidget'
import UserWidget from 'components/Widgets/UserWidget'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { typeState, typeStateWN } from 'state'

const ProfilePage = () => {
  const [user, setUser] = useState<typeStateWN['user']>(null)
  const { userId } = useParams()
  const token = useSelector((state: typeState) => state.token)
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line

  if (!user) return null

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='2rem'
        justifyContent='center'
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={userId} pathPicture={user.pathPicture} />
          <Box m='2rem 0' />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget pathPicture={user.pathPicture} />
          <Box m='2rem 0' />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
