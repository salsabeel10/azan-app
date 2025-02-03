import React from 'react'
import { formattedDate } from '../store/timeFormat'

const NavBar = () => {
  return (
    <div>
      <div className="navbar shadow-sm border-b border-b-gray-500">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Azan Times</a>
        </div>
        <div className="flex-none">
          <a className="btn btn-ghost text-xl">Date :</a><span>{formattedDate}</span>
        </div>
      </div>
    </div>
  )
}

export default NavBar