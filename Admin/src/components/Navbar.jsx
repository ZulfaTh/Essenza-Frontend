import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { AdminContext } from '../context/AdminContext'
import {useNavigate }from 'react-router-dom'
import { StaffContext } from '../context/StaffContext'

const Navbar = () => {

    const {aToken,setAToken} = useContext(AdminContext)
    const {sToken,setSToken}=useContext(StaffContext)

    const navigate=useNavigate()

    const logout =()=>{
        navigate('/')
        aToken && setAToken ('')
        aToken && localStorage.removeItem('aToken')
        sToken && setSToken ('')
        sToken && localStorage.removeItem('sToken')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 shadow-xl bg-purple-200'>
      <div className='flex gap-5 items-center text-xs'>
        <img src={logo} alt='Logo' className='w-12 h-12 cursor-pointer' />
        <p className='bg-white text-purple-600 text-sm rounded font-semibold shadow-2xl cursor-pointer px-4 py-2  hover:scale-105 transition-all duration-300'>{aToken ? 'ADMIN' : 'Staff'}</p>
      </div>
      <button onClick={logout} className='bg-purple-500 text-white text-sm rounded font-semibold shadow-2xl cursor-pointer px-4 py-2  hover:scale-105 transition-all duration-300'>Logout</button>
    </div>
  )
}

export default Navbar
