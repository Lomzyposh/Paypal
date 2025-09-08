import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SecurityCheck from './pages/SecurityCheck'
import InputCode from './pages/InputCode'
import Loader from './components/Loader'
import { LoaderContext } from './contexts/LoaderContext'

const App = () => {

  const { showLoader, setShowLoader } = useContext(LoaderContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {showLoader &&
        <Loader />
      }
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/securityCheck' element={<SecurityCheck />} />
        <Route path='/InputCode' element={<InputCode />} />
      </Routes>
    </div>
  )
}

export default App