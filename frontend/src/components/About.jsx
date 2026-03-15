import { motion } from 'framer-motion'
import { FaUserGraduate, FaMapMarkerAlt, FaCalendarAlt, FaLaptopCode, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa'
import { SiTailwindcss, SiPostgresql, SiExpress, SiJavascript } from 'react-icons/si'

const About = () => {
  const technologies = [
    { icon: FaReact, name: 'React', color: 'text-blue-500' },
    { icon: FaNodeJs, name: 'Node.js', color: 'text-green-600' },
    { icon: SiExpress, name: 'Express', color: 'text-gray-600' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: 'text-blue-800' },
    { icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-500' },
    { icon: FaDatabase, name: 'PostgreSQL', color: 'text-blue-700' },
    { icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-500' },
    { icon: FaLaptopCode, name: 'Full Stack', color: 'text-purple-600' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-4"
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Tentang Pengembang</h1>
      
      {/* Profile Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32"></div>
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start -mt-16">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-white p-2 rounded-full shadow-lg"
            >
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-1 rounded-full">
                <FaUserGraduate className="text-7xl text-white md:text-8xl" />
              </div>
            </motion.div>
            
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold text-gray-800">Galang Ponco Maulana</h2>
              <p className="text-xl text-blue-600 mb-4">Fullstack Developer & Mahasiswa</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span>Bandung, 15 Maret 2026</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <FaCalendarAlt className="text-blue-500" />
                  <span>Pelatihan: React Lanjutan</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <FaLaptopCode className="text-blue-500" />
                  <span>Instruktur: Ikmal Fauzeni</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-6" />

          <p className="text-gray-700 leading-relaxed text-center md:text-left">
            Saya adalah pengembang aplikasi ini, dibangun sebagai proyek UTS React Lanjutan 2026. 
            Dengan pengalaman dalam React, Node.js, dan PostgreSQL, saya berusaha menghadirkan solusi 
            manajemen akademik yang modern dan mudah digunakan. Aplikasi ini mengimplementasikan 
            autentikasi JWT, CRUD, serta manajemen status mahasiswa.
          </p>
        </div>
      </motion.div>

      {/* Tech Stack Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Teknologi yang Digunakan</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
            >
              <tech.icon className={`text-5xl mb-2 ${tech.color}`} />
              <span className="text-sm font-medium text-gray-700">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-center"
      >
        <div className="bg-blue-50 p-6 rounded-xl shadow-md">
          <div className="text-4xl font-bold text-blue-600">3+</div>
          <div className="text-gray-600">Tahun Pengalaman</div>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow-md">
          <div className="text-4xl font-bold text-green-600">10+</div>
          <div className="text-gray-600">Proyek Selesai</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default About