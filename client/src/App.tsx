import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom'
import { LoginPage } from 'pages/LoginPage'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from 'theme'
import { typeState } from 'state'
import HomePage from 'pages/HomePage'
import ProfilePage from 'pages/ProfilePage'

function App() {
  const mode = useSelector((state: typeState) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state: typeState) => state.token))

  return (
    <div className='app'>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route
              path='home'
              element={isAuth ? <HomePage /> : <Navigate to='/' />}
            />
            <Route
              path='profile/:userId'
              element={isAuth ? <ProfilePage /> : <Navigate to='/' />}
            />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App
