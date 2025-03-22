import './App.css'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Navbar from './Components/Navbar'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Error from './Components/Error'
import Home from './Components/Home'
import { ToastContainer } from 'react-toastify'

function App() {  

  const [showNav,setShowNav] = useState(false); 

  const onHit = ()=>{
    setShowNav(location.pathname === "/home" );
  }

  return (
    <>         

<div>
        
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>

      {showNav && <Navbar/>}
      <HashRouter>
        <Routes>
          <Route path="login" element={<Login onHit = {onHit} />} />
          <Route path="signup" element={<Signup onHit = {onHit} />} />
          <Route path="home" element={<Home onHit = {onHit}/>} />
          <Route path="/" element={<Error />} />
          <Route path='*' element={<Error></Error>} />
        </Routes>
      </HashRouter>
              
    </>
  )
}

export default App
