import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from './NavbarMain'


export default () => {

  return (
    <header className="bg-blue-300 px-4 fixed w-full">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-between items-center text-white text-xl">
          <div className="logo">
            <Link to="/">myTest</Link>
          </div>
          <Navbar />
        </div>
      </div>
    </header>
  )

}