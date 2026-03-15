import { useEffect, useState } from 'react'
import axios from 'axios'
import Unauthorized from './Unauthorized'

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    axios.get('/api/me')
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
  }, [])

  if (isAuth === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return isAuth ? children : <Unauthorized />
}

export default PrivateRoute