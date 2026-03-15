import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaHome, FaInfoCircle, FaEnvelope, FaUsers, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white mt-12"
    >
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Deskripsi */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <FaHome className="mr-2" />
              SIAKAD
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Sistem Informasi Akademik Mahasiswa yang modern, cepat, dan mudah digunakan. Kelola data mahasiswa dengan efisien.
            </p>
          </div>

          {/* Navigasi Cepat */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-blue-400 pb-2">Navigasi</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition flex items-center">
                  <FaHome className="mr-2 text-sm" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100 hover:text-white transition flex items-center">
                  <FaInfoCircle className="mr-2 text-sm" /> About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-white transition flex items-center">
                  <FaEnvelope className="mr-2 text-sm" /> Contact
                </Link>
              </li>
              <li>
                <Link to="/mahasiswa" className="text-blue-100 hover:text-white transition flex items-center">
                  <FaUsers className="mr-2 text-sm" /> Mahasiswa
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-blue-400 pb-2">Kontak</h4>
            <ul className="space-y-2 text-blue-100">
              <li>Email: galangponco123@gmail.com</li>
              <li>Telp: +62 812-3456-7890</li>
              <li>Alamat: Bandung, Jawa Barat</li>
            </ul>
          </div>

          {/* Sosial Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-blue-400 pb-2">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition">
                <FaGithub size={20} />
              </a>
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-600 mt-8 pt-6 text-center text-blue-200 text-sm">
          <p>&copy; {currentYear} SIAKAD. Dibangun dengan Hati yang terdalam oleh Galang Ponco Maulana untuk UTS React Lanjutan 2026.</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer