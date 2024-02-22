import React from 'react'

function Hero() {
    return (
        <>
            <div className="bg-slate-700 h-[75vh] grid place-items-center bg-center bg-no-repeat bg-[url('/bg.jpg')] bg-cover bg-blend-multiply">
                <div>
                    <div className='text-7xl mb-10 text-center font-boldhead text-white tracking-wider'>
                        The Poetic Blog
                    </div>
                    <div className='text-5xl text-gray-400 text-center font-thinspaced tracking-wider'>
                        demo made for byte recruitment task
                    </div>
                </div>
                <a href="/dashboard" className="text-white duration-300 bg-black rounded-full font-semibold p-3 px-10 hover:bg-transparent border-2 border-black">Explore Poems</a>
            </div>
        </>
    )
}

export default Hero