import React from 'react'
import URLFormInput from '../parts/URLFormInput.jsx'
import Navbar from '../parts/Navbar.jsx'

const HomePage = () => {
  return (
    <div className='bg-stone-200 h-screen w-screen'>
        <Navbar />
        <div className='w-full h-[calc(100vh-10vh)] flex justify-center items-center'>
            <URLFormInput />
        </div>
    </div>
  )
}

export default HomePage