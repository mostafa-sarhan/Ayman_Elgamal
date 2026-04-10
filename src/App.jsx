import './App.css'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'

import Home from './component/Home'
import Booking from './component/Booking'
import Contact from './component/Contact'
import Services from './component/Services'
import About from './component/About'
import ProtectedRoute from './component/ProtectedRoute'
import Dashboard from './dashboard/Dashboard'
import VisitPage from './dashboard/VisitPage'
import PatientDetailsPage from './dashboard/PatientDetailsPage'
import Login from './component/Login'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />

        {/* 🔥 مهم جدًا */}

        <Route path='/dashboard/*' element={
          <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>}
        />

        <Route path='/About' element={<About />} />
        <Route path='/Services' element={<Services />} />
        <Route path='/Booking' element={<Booking />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/visit/:phone' element={<VisitPage />} />
        <Route path='/patients/:phone/details' element={<PatientDetailsPage />} />
      </Routes>
    </>
  )
}

export default App