import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaHome, FaInfoCircle, FaEnvelope, FaUsers, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    axios.get('/api/me')
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
  }, [location]) // tambahkan location sebagai dependency

  const logout = async () => {
    await axios.post('/api/logout')
    setUser(null)
    navigate('/')
  }
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
            <FaHome className="text-3xl" />
            <span>SIAKAD</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition flex items-center space-x-1">
              <FaHome />
              <span>Home</span>
            </Link>
            <Link to="/about" className="hover:text-blue-200 transition flex items-center space-x-1">
              <FaInfoCircle />
              <span>About</span>
            </Link>
            <Link to="/contact" className="hover:text-blue-200 transition flex items-center space-x-1">
              <FaEnvelope />
              <span>Contact</span>
            </Link>
            
            {user ? (
              <>
                <Link to="/mahasiswa" className="hover:text-blue-200 transition flex items-center space-x-1">
                  <FaUsers />
                  <span>Mahasiswa</span>
                </Link>
                <span className="text-sm bg-blue-600 px-3 py-1 rounded-full">
                  {user.username}
                </span>
                <button 
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition flex items-center space-x-1">
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition">
                  <FaUserPlus />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar