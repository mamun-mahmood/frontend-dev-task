import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
// import Navbar from './components/Navbar'
import SignIn from './pages/SignIn'
import SignUp from './pages/Signup'

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <div className="h-screen flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
