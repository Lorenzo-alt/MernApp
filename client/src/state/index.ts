import { PaletteMode } from '@mui/material'
import { createSlice } from '@reduxjs/toolkit'
import mongoose from 'mongoose'

interface IUser {
  _id: mongoose.Types.ObjectId | string
  firstName: string
  lastName: string
  email: string
  password: string
  pathPicture: string
  friends: Array<IUser>
  location: string
  occupation: string
  viewedProfile: number
  impressions: number
}

interface IPost {
  _id: mongoose.Types.ObjectId | string
  userId: string
  firstName: string
  lastName: string
  location: string
  description: string
  pathPicture: string
  userPathPicture: string
  likes: Array<ILikes>
  comments: Array<string>
}

interface ILikes {
  _id: mongoose.Types.ObjectId | string
  check: boolean
}

export interface typeState {
  mode: PaletteMode
  user: IUser
  token: string
  posts: IPost[]
}

export interface typeStateWN {
  mode: PaletteMode
  user: IUser | null
  token: string | null
  posts: IPost[]
}

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
} as typeStateWN

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends
      } else {
        console.error('user friends non-existent :(')
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post
        return post
      })
      state.posts = updatedPosts
    },
  },
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions

export default authSlice.reducer
