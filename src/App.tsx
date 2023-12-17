import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import PrivateRoute from './routes/PrivateRoute'
import checkAuth from './utils/auth'
import { useAppDispatch } from './redux/hooks'
import { setUser } from './redux/features/user/userSlice'

function App() {
  const {
    isLoggedIn,
    email,
    token
  } = checkAuth()
  const dispatch = useAppDispatch()
  if (isLoggedIn) {
    dispatch(
      setUser({
        isLoggedIn: true,
        email,
        token
      })
    )
  }


  return (
    <BrowserRouter>
      <div className="h-screen w-screen">
        <Routes>
          <Route path="/" element={<Home />} >
            <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="users" element={<PrivateRoute><Users /></PrivateRoute>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
