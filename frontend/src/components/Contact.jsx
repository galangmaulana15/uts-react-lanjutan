import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaChalkboardTeacher, FaEnvelope, FaPhone, FaGithub, FaLinkedin } from 'react-icons/fa'
import toast from 'react-hot-toast'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulasi pengiriman (bisa diganti dengan emailjs atau API)
    setTimeout(() => {
      toast.success('Pesan berhasil dikirim (simulasi)')
      setForm({ name: '', email: '', message: '' })
      setLoading(false)
    }, 1500)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-4"
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Hubungi Saya</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Info Kontak */}
        <motion.div 
          whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaUser className="text-4xl text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">Galang Ponco Maulana</p>
              <p className="text-gray-600">Fullstack Developer</p>
            </div>
          </div>

          <div className="space-y-4">
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition"
            >
              <FaMapMarkerAlt className="text-gray-500" />
              <span>Bandung, 15 Maret 2026</span>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition"
            >
              <FaCalendarAlt className="text-gray-500" />
              <span>Pelatihan: React Lanjutan</span>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition"
            >
              <FaChalkboardTeacher className="text-gray-500" />
              <span>Instruktur: Ikmal Fauzeni</span>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition"
            >
              <FaEnvelope className="text-gray-500" />
              <a href="mailto:galangponco123@gmail.com" className="text-blue-600 hover:underline">galangponco123@gmail.com</a>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition"
            >
              <FaPhone className="text-gray-500" />
              <span>+62 821-7071-4989</span>
            </motion.div>
          </div>

          <hr className="my-6" />

          {/* Social Media */}
          <div className="flex justify-center space-x-4">
            <a href="#" className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-900 transition">
              <FaGithub />
            </a>
            <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
              <FaLinkedin />
            </a>
            <a href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition">
              <FaEnvelope />
            </a>
          </div>
        </motion.div>

        {/* Form Kontak */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6">Kirim Pesan</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nama</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Pesan</label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Contact