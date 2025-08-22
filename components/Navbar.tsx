"use client"
import Link from 'next/link'
import React , {useState } from 'react'
import {Menu} from "lucide-react"

const navlinks = [
    {id : 1 , title : "Home" , link : "/"},
    {id : 2 , title : "Posts" , link : "/posts"},
]


const Navbar = () => {


const [nav , setNav] = useState(false)

function handleNav () {
  setNav(!nav)
}
  return (
    <>
    <div className="bg-white h-[70px] z-10 w-full fixed top-0 flex items-center justify-between px-3 lg:px-6 md:px-12 shadow-md">
      <div>
       <Link href="/">
       <h1 className='font-semibold text-lg lg:text-xl'>Creative <span>Posts</span> </h1>
       </Link>
      </div>
      <div className="flex items-center gap-6">
    <div className="hidden md:block">
    <ul className="flex gap-10">
       {navlinks.map((link) => (
            <li key={link.id}><Link href={link.link}>{link.title}</Link></li>
        ))}
       </ul>
    </div>
     <button onClick={handleNav}><Menu size={26}/></button>
      </div>
    </div>
    <div className={`fixed bg-white h-screen w-[60%] top-0 left-0 shadow-md z-20 ${nav ? "translate-x-0" :  "-translate-x-full"} transition-all duration-200`}>
   <div className="p-6">
   <ul className="flex flex-col gap-10">
       {navlinks.map((link) => (
            <li key={link.id} onClick={handleNav} className="font-semibold underline"><Link href={link.link}>{link.title}</Link></li>
        ))}
       </ul>
   </div>
    </div>
    </>
  )
}

export default Navbar
