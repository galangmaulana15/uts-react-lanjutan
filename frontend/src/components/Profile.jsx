import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa'

const Profile = () => {
  const { user } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col items-center">
          <FaUserCircle className="text-6xl text-blue-600 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Profil User</h1>
          <p className="text-gray-600">Informasi akun Anda</p>
        </div>
        <div className="mt-6 space-y-3">
          <p><span className="font-semibold">Username:</span> {user?.username}</p>
          <p><span className="font-semibold">ID:</span> {user?.id}</p>
          {/* Bisa ditambah data lain jika ada */}
        </div>
      </div>
    </motion.div>
  )
}

export default Profile