import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import { Signup } from './pages/signup'
import { SignIn } from './pages/signin'
import { Profile } from './pages/profile'
import { Home } from './pages/Home'
import { UserProfile } from './pages/UserProfile'
import { Settings } from './pages/Settings'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
