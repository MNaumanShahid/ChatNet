import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import { Signup } from './pages/signup'
import { SignIn } from './pages/signin'
import { Profile } from './pages/profile'
import { Home } from './pages/Home'
import { UserProfile } from './pages/UserProfile'
import { Settings } from './pages/Settings'
import { Explore } from './pages/explore'
import ContextProvider from './gemini-context/context'

function App() {

  return(
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
