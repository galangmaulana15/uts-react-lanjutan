import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaSearch, FaEye, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const MahasiswaList = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [form, setForm] = useState({ name: '', nim: '', jurusan: '', ipk: '', isActive: true })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null) // for detail modal
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // Filter data based on search
    const filtered = data.filter(m => 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.nim.toLowerCase().includes(search.toLowerCase()) ||
      m.jurusan.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredData(filtered)
  }, [search, data])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/mahasiswa')
      setData(res.data)
      setFilteredData(res.data)
    } catch (err) {
      toast.error('Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`/api/mahasiswa/${editingId}`, form)
        toast.success('Data berhasil diupdate')
      } else {
        await axios.post('/api/mahasiswa', form)
        toast.success('Data berhasil ditambahkan')
      }
      setForm({ name: '', nim: '', jurusan: '', ipk: '', isActive: true })
      setEditingId(null)
      fetchData()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Terjadi kesalahan')
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`/api/mahasiswa/${id}`)
        toast.success('Data dihapus')
        fetchData()
      } catch (err) {
        toast.error('Gagal menghapus')
      }
    }
  }

  const handleToggle = async (id) => {
    try {
      await axios.patch(`/api/mahasiswa/${id}/toggle`)
      toast.success('Status berhasil diubah')
      fetchData()
    } catch (err) {
      toast.error('Gagal mengubah status')
    }
  }

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      nim: item.nim,
      jurusan: item.jurusan,
      ipk: item.ipk,
      isActive: item.isactive
    })
    setEditingId(item.id)
  }

  const handleViewDetail = (item) => {
    setSelectedMahasiswa(item)
    setShowModal(true)
  }

  // Hitung statistik
  const total = data.length
  const active = data.filter(m => m.isactive).length
  const inactive = total - active

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"
        ></motion.div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Daftar Mahasiswa</h1>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500"
        >
          <div className="text-3xl font-bold text-blue-600">{total}</div>
          <div className="text-gray-600">Total Mahasiswa</div>
        </motion.div>
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500"
        >
          <div className="text-3xl font-bold text-green-600">{active}</div>
          <div className="text-gray-600">Mahasiswa Aktif</div>
        </motion.div>
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500"
        >
          <div className="text-3xl font-bold text-red-600">{inactive}</div>
          <div className="text-gray-600">Mahasiswa Tidak Aktif</div>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama, NIM, atau jurusan..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setSearch('')}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-3 rounded-lg transition"
        >
          Reset
        </button>
      </div>

      {/* Form Tambah/Edit */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">{editingId ? 'Edit' : 'Tambah'} Mahasiswa</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nama" className="border p-2 rounded" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input type="text" placeholder="NIM" className="border p-2 rounded" value={form.nim} onChange={e => setForm({...form, nim: e.target.value})} required />
          <input type="text" placeholder="Jurusan" className="border p-2 rounded" value={form.jurusan} onChange={e => setForm({...form, jurusan: e.target.value})} required />
          <input type="number" step="0.01" placeholder="IPK" className="border p-2 rounded" value={form.ipk} onChange={e => setForm({...form, ipk: e.target.value})} required />
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} />
            <span>Aktif</span>
          </label>
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              {editingId ? 'Update' : 'Simpan'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', nim: '', jurusan: '', ipk: '', isActive: true }); }} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabel Mahasiswa */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nama</th>
              <th className="border p-2">NIM</th>
              <th className="border p-2">Jurusan</th>
              <th className="border p-2">IPK</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(m => (
              <motion.tr 
                key={m.id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hover:bg-gray-100 transition"
              >
                <td className="border p-2">{m.name}</td>
                <td className="border p-2">{m.nim}</td>
                <td className="border p-2">{m.jurusan}</td>
                <td className="border p-2">{m.ipk}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded text-white ${m.isactive ? 'bg-green-500' : 'bg-red-500'}`}>
                    {m.isactive ? 'Aktif' : 'Tidak Aktif'}
                  </span>
                </td>
                <td className="border p-2 text-center space-x-2">
                  <button onClick={() => handleViewDetail(m)} className="text-blue-600 hover:text-blue-800 transition" title="Detail">
                    <FaEye />
                  </button>
                  <button onClick={() => handleEdit(m)} className="text-green-600 hover:text-green-800 transition" title="Edit">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleToggle(m.id)} className="text-yellow-600 hover:text-yellow-800 transition" title="Toggle Status">
                    {m.isactive ? <FaToggleOff /> : <FaToggleOn />}
                  </button>
                  <button onClick={() => handleDelete(m.id)} className="text-red-600 hover:text-red-800 transition" title="Hapus">
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Detail Mahasiswa */}
      <AnimatePresence>
        {showModal && selectedMahasiswa && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-6 ${selectedMahasiswa.isactive ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'} text-white`}>
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold">Detail Mahasiswa</h3>
                  <button onClick={() => setShowModal(false)} className="text-white hover:text-gray-200">
                    <FaTimes size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Nama</p>
                    <p className="font-semibold">{selectedMahasiswa.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">NIM</p>
                    <p className="font-semibold">{selectedMahasiswa.nim}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Jurusan</p>
                    <p className="font-semibold">{selectedMahasiswa.jurusan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">IPK</p>
                    <p className="font-semibold">{selectedMahasiswa.ipk}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-white ${selectedMahasiswa.isactive ? 'bg-green-500' : 'bg-red-500'}`}>
                      {selectedMahasiswa.isactive ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 px-6 py-4 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MahasiswaList