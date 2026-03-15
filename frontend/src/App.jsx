import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer' // import footer
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import MahasiswaList from './components/MahasiswaList'
import About from './components/About'
import Contact from './components/Contact'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto p-4 flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mahasiswa" element={
            <PrivateRoute>
              <MahasiswaList />
            </PrivateRoute>
          } />
        </Routes>
      </div>
      <Footer /> {/* Footer di luar container agar full width */}
    </div>
  )
}

export default App