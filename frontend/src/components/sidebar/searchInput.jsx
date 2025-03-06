import React from 'react'
import { IoSearch } from "react-icons/io5";


function searchInput() {
  return (
    <div>
        <form className="flex items-center gap-2">
            <input type="text" className="bg-white text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                <IoSearch className="w-6 h-6 outline-none" />
            </button>
        </form>

    </div>
  )
}

export default searchInput