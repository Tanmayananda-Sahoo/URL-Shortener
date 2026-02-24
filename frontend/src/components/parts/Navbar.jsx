import React from 'react'
import { useAuthStore } from '../../stores/authStore.js';

const Navbar = () => {
  const {logout} = useAuthStore();
  const logoutHandler = async() => {
    const result = await logout();
  }
  return (
    <div className='flex justify-end items-center p-4 h-[10vh]'>
        <div 
        className="px-2 py-1 bg-blue-500 rounded-lg text-white tracking-tighter font-semibold cursor-pointer"
        onClick={() => logoutHandler()}
        >
            Logout
        </div>
    </div>
  )
}

export default Navbar