import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {
  const [form, setForm] = useState({ gmail: '', password: '' })
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
      await axios.post('/api/login', form)
      toast.success('Login berhasil')
      navigate('/mahasiswa')
    } catch (err) {
      toast.error('Login gagal: email atau password salah')
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
        <FaSignInAlt className="text-6xl text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Anda Sudah Login</h2>
        <p className="text-gray-600 mb-6">Halo, {user.username}. Anda sudah login. Silakan lanjutkan ke halaman mahasiswa.</p>
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
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Gmail</label>
          <input 
            type="email" 
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={form.gmail} 
            onChange={e => setForm({...form, gmail: e.target.value})} 
            required 
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={form.password} 
            onChange={e => setForm({...form, password: e.target.value})} 
            required 
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
        >
          {loading ? 'Memproses...' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-center">
        Belum punya akun? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
      </p>
    </div>
  )
}

export default Login