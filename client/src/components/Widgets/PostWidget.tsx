import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material'
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import Friend from 'components/Friend'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends, setPost, typeState } from 'state'
import WidgetWrapper from './WidgetWrapper'
import mongoose from 'mongoose'

interface IProps {
  postId: mongoose.Types.ObjectId | string
  postUserId: mongoose.Types.ObjectId | string
  name: string
  description: string
  location: string
  pathPicture: string
  userPathPicture: string
  likes: Array<ILikes>
  comments: Array<string>
}
interface ILikes {
  _id: mongoose.Types.ObjectId | string
  check: boolean
}

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  pathPicture,
  userPathPicture,
  likes,
  comments,
}: IProps) => {
  const [isComments, setIsComments] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state: typeState) => state.token)
  const loggedInUserId = useSelector((state: typeState) => state.user._id)
  const isLiked =
    typeof loggedInUserId != 'undefined'
      ? Boolean(likes[loggedInUserId as keyof typeof likes])
      : null
  const likeCount = Object.keys(likes).length

  const { palette } = useTheme()
  const main = palette.secondary.main
  const primary = palette.primary.main

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    })
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }

  return (
    <WidgetWrapper m='2rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPathPicture={userPathPicture}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {pathPicture && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`http://localhost:3001/assets/${pathPicture}`}
        />
      )}
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap='0.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt='0.5rem'>
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  )
}

export default PostWidget
