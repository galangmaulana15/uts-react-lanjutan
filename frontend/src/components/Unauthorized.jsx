import { Link } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Unauthorized = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[70vh] flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
        <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaLock className="text-5xl text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Akses Dibatasi</h1>
        <p className="text-gray-600 mb-6">
          Maaf, Anda harus login terlebih dahulu untuk mengakses halaman ini.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Unauthorized