"use client"
import Link from 'next/link'
import React , {useState } from 'react'
import {Menu, X} from "lucide-react"
import { usePathname } from 'next/navigation'

const navlinks = [
    {id : 1 , title : "Home" , link : "/"},
    {id : 2 , title : "Posts" , link : "/posts"},
]


const Navbar = () => {
const [nav , setNav] = useState(false)
const pathname = usePathname()

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
    <ul className="flex gap-4">
       {navlinks.map((link) => (
            <Link href={link.link}  key={link.id}><li className={`font-semibold bg-orange-500 text-white py-2 px-4  rounded-sm hover:bg-orange-600 active:bg-orange-600 transition-all duration-100 cursor-pointer ${pathname === link.link ? "bg-orange-300" : ""}`}>{link.title}</li></Link>
        ))}
       </ul>
    </div>
     <button className='block md:hidden' onClick={handleNav}>{nav ? <X size={26}/>: <Menu size={26}/>}</button>
      </div>
    </div>
    <div className={`fixed bg-white h-screen w-[60%] top-0 left-0 shadow-md z-20 ${nav ? "translate-x-0" :  "-translate-x-full"} transition-all duration-200`}>
   <div className="p-4">
   <ul className="flex flex-col gap-4">
       {navlinks.map((link) => (
            <Link href={link.link} key={link.id}><li onClick={handleNav} className="bg-orange-500 text-white font-semibold p-2 rounded-sm hover:bg-orange-600 active:bg-orange-600 transition-all duration-100 cursor-pointer">{link.title}</li></Link>
        ))}
       </ul>
   </div>
    </div>
    </>
  )
}

export default Navbar
