import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const Register = () => {
  const [form, setForm] = useState({ gmail: '', username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/me')
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('/api/register', form)
      toast.success('Registrasi berhasil! Silakan login.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Gagal registrasi')
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md text-center"
      >
        <FaUserPlus className="text-6xl text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Anda Sudah Login</h2>
        <p className="text-gray-600 mb-6">Halo, {user.username}. Anda sudah memiliki akun dan sedang login.</p>
        <Link 
          to="/mahasiswa" 
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ke Mahasiswa
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center">
          <FaUserPlus className="text-white text-5xl mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-white">Daftar Akun</h2>
          <p className="text-blue-100 mt-2">Buat akun baru untuk mengakses SIAKAD</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.gmail}
                onChange={e => setForm({...form, gmail: e.target.value})}
                required
                placeholder="contoh@email.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.username}
                onChange={e => setForm({...form, username: e.target.value})}
                required
                placeholder="username"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>
        
        <div className="px-6 pb-6 text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">Login di sini</Link>
        </div>
      </div>
    </div>
  )
}

export default Register