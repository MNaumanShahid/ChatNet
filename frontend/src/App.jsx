import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import { Signup } from './pages/signup'
import { SignIn } from './pages/signin'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />

        </Routes>
      </BrowserRouter>
  )
}

export default App
