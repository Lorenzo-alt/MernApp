import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material'
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import Dropzone from 'react-dropzone'
import UserImage from 'components/UserImage'
import WidgetWrapper from 'components/Widgets/WidgetWrapper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts, typeState } from 'state'

interface IProps {
  pathPicture?: string
}

const MyPostWidget = ({ pathPicture }: IProps) => {
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [post, setPost] = useState('')
  const { palette } = useTheme()
  const user = useSelector((state: typeState) => state.user)
  const token = useSelector((state: typeState) => state.token)
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')
  const mediumMain = palette.secondary.mediumMain
  const medium = palette.secondary.medium

  const handlePost = async () => {
    const formData = new FormData()
    formData.append('userId', user?._id as string)
    formData.append('description', post)
    if (image) {
      formData.append('picture', image)
      formData.append('pathPicture', image.name)
    }

    const response = await fetch('https://mern-app-api-rho.vercel.app/posts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    const posts = await response.json()
    dispatch(setPosts({ posts }))
    setImage(null)
    setPost('')
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap='1.5rem'>
        <UserImage image={pathPicture} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.secondary.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius='5px'
          mt='1rem'
          p='1rem'
        >
          <Dropzone
            accept={{ 'image/*': ['.jpg', '.jpeg', '.png'] }}
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p='1rem'
                  width='100%'
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: '15%' }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween gap='0.25rem' onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap='0.25rem'>
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap='0.25rem'>
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap='0.25rem'>
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap='0.25rem'>
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={
            post
              ? {
                color: palette.background.paper,
                backgroundColor: palette.primary.main,
                borderRadius: '3rem',
              }
              : {
                color: palette.background.paper,
                backgroundColor: palette.primary.light,
                borderRadius: '3rem',
              }
          }
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default MyPostWidget
