import React from 'react'

function Navbar() {
    return (
        <nav className="bg-slate-700 p-1 h-[15vh] grid place-items-center font-serif tracking-wide">
            <div className="container mx-auto flex items-center justify-between">
                <div className="logo text-white text-2xl font-bold">byte fewd task</div>
                <div className="flex space-x-4">
                    <a href="/" className="text-white font-semibold m-2 p-3 text-lg duration-200 hover:opacity-80">Home</a>
                    <a href="/dashboard" className="text-white font-semibold m-2 p-3 text-lg duration-200 hover:opacity-80">Dashboard</a>
                    <a href="/login" className="text-white border-solid rounded-full border-2 border-black font-semibold m-2 p-3 text-lg duration-200 hover:bg-black">Login/Signup</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar