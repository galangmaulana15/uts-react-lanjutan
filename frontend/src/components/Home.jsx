import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaUsers, FaBook, FaChartLine, FaArrowRight, FaSignInAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import axios from 'axios'

const Home = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get('/api/me')
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-24 rounded-3xl shadow-2xl mb-16 relative"
      >
        <div className="absolute inset-0 bg-black opacity-10 rounded-3xl"></div>
        <div className="container mx-auto text-center relative z-10 px-4">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="text-6xl font-extrabold mb-4 drop-shadow-lg"
          >
            SIAKAD
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl mb-8 max-w-2xl mx-auto"
          >
            Sistem Informasi Akademik Mahasiswa Terintegrasi
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Link 
              to="/mahasiswa" 
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              <span>Lihat Data Mahasiswa</span>
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Fitur Unggulan */}
      <section className="grid md:grid-cols-3 gap-8 mb-16 px-4">
        {[
          { icon: FaUsers, title: 'Manajemen Mahasiswa', desc: 'Kelola data mahasiswa dengan mudah: tambah, edit, hapus, dan ubah status.', color: 'blue' },
          { icon: FaBook, title: 'Informasi Akademik', desc: 'Pantau IPK, jurusan, dan status aktif mahasiswa secara real-time.', color: 'green' },
          { icon: FaChartLine, title: 'Laporan & Statistik', desc: 'Dapatkan ringkasan data untuk kebutuhan analisis dan pelaporan.', color: 'purple' }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * idx, duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className={`bg-${item.color}-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}>
              <item.icon className={`text-4xl text-${item.color}-600`} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
            <p className="text-gray-600 text-center">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Statistik Cepat */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="bg-white p-8 rounded-xl shadow-lg mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Statistik Terkini</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">120</div>
            <div className="text-gray-600">Total Mahasiswa</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">98</div>
            <div className="text-gray-600">Mahasiswa Aktif</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-red-600 mb-2">22</div>
            <div className="text-gray-600">Mahasiswa Tidak Aktif</div>
          </div>
        </div>
      </motion.section>

      {/* Conditional CTA */}
      {!user ? (
        <motion.section 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="bg-gray-200 p-12 rounded-xl text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Siap Mengelola Data Mahasiswa?</h2>
          <p className="text-xl mb-6">Login sekarang untuk mengakses semua fitur.</p>
          <Link 
            to="/login" 
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            <FaSignInAlt className="mr-2" />
            Login
          </Link>
        </motion.section>
      ) : (
        <motion.section 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="bg-green-100 p-12 rounded-xl text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Selamat Datang, {user.username}!</h2>
          <p className="text-xl mb-6">Anda telah login. Silakan akses data mahasiswa.</p>
          <Link 
            to="/mahasiswa" 
            className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition transform hover:scale-105"
          >
            <FaUsers className="mr-2" />
            Lihat Mahasiswa
          </Link>
        </motion.section>
      )}
    </div>
  )
}

export default Home