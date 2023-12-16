import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import PrivateRoute from './routes/PrivateRoute'

function App() {
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
