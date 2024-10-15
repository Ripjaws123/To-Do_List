import React from 'react'

function Navbar() {
  return (
    <nav className="h-11 bg-blue-600 items-center flex justify-evenly">
        <div className="logo">
            <span className="font-bold text-xl">To-Do Lists</span>
        </div>
      <ul className="flex gap-10">
        <li className="font-semibold cursor-pointer text-base hover:text-lg hover:text-white hover:transition-all">Home</li>
        <li className="font-semibold cursor-pointer text-base hover:text-lg hover:text-white hover:transition-all">Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar