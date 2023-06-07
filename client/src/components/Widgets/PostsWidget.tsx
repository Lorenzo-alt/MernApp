import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts, typeState } from 'state'
import PostWidget from './PostWidget'
import mongoose from 'mongoose'

interface IProps {
  userId?: string | mongoose.Types.ObjectId
  isProfile?: boolean
}

const PostsWidget = ({ userId, isProfile = false }: IProps) => {
  const dispatch = useDispatch()
  const posts = useSelector((state: typeState) => state.posts)
  const token = useSelector((state: typeState) => state.token)

  const getPosts = async () => {
    const response = await fetch('https://mern-app-api-rho.vercel.app/posts', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  const getUserPosts = async () => {
    const response = await fetch(
      `https://mern-app-api-rho.vercel.app/posts/${userId}/posts`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  useEffect(() => {
    if (isProfile) {
      getUserPosts()
    } else {
      getPosts()
    }
  }, []) // eslint-disable-line

  return (
    <>
      {posts.map(
        (
          {
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            pathPicture,
            userPathPicture,
            likes,
            comments,
          },
          index
        ) => (
          <PostWidget
            key={typeof _id === 'string' ? _id : index}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            pathPicture={pathPicture}
            userPathPicture={userPathPicture}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  )
}

export default PostsWidget
