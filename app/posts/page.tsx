"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {formatDistanceToNow} from "date-fns"
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, Plus, Star, X } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

interface Post {
  id : string,
  title : string,
  description? : string,
  image? : string,
  createdAt : Date
}

const page = () => {

const [posts , setPosts] = useState<Post[]>([])
const [isloading , setIsLoading] = useState<boolean>(true)
  const [isOpen , setIsOpen] = useState(false)

async function getPosts () {
  try {
    const res = await fetch("/api/get-posts")
    if(!res.ok) throw new Error("Error occured - Server")
      const data = await res.json()
    setPosts(data)
    console.log(posts)
  } catch (error) {
    console.log("Error occured - try again later")
  } finally {
    setIsLoading(false)
  }
}

useEffect(() => {
  handleShowPopUp()
getPosts()
}, [])


  function handleShowPopUp (){
    const shown = localStorage.getItem("shown")
    if(!shown){
      setIsOpen(true)
    }
  }

  function handleClose () {
    setIsOpen(false)
  localStorage.setItem("shown" , "true")
  }

  return (
    <div className='px-2 flex justify-center'>
{isOpen && (
  <div className="fixed inset-0 bg-black/50 z-10 flex justify-center pt-[200px]">
    <div className='w-[90%] lg:w-[500px] divide-y h-[400px] flex flex-col rounded-sm border border-neutral-700 bg-white'>
      <div className='flex justify-between p-2'>
        <h1>Question</h1>
        <button onCanPlay={handleClose} className='cursor-pointer'><X/></button>
      </div>
      

      <div className='p-2 flex-1 flex flex-col justify-between h-full'>
         <div>
          <h1 className='text-lg font-semibold'>Welcome </h1>
                 <h1 className='flex items-center gap-x-1'>- How much would you rate this Site outta 10 <Star fill='yellow' stroke='yellow'/></h1>
        <Textarea placeholder='Hey how is it going ive been facing a problem lately help '/>

         </div>
<div className='flex justify-center'>
    <button onClick={handleClose} className='bg-orange-500 text-white px-20 py-4 rounded-md cursor-pointer active:bg-orange-600 transition-all duration-100 hover:bg-orange-600'>Enter</button>
</div>
      </div>
    </div>
  </div>
)}

 <div className='space-y-1 w-full xl:w-[70%] transition-all duration-200'>
      <div className='h-[70px] border border-t-0 flex items-center px-4 justify-between border-black rounded-b-sm'>
<Link href="/posts"><h1 className='font-semibold text-2xl'>Posts</h1></Link>
<Link href="/"><button className='flex items-center gap-x-2 cursor-pointer hover:scale-110 transition-all duration-100'><Plus size={30}/></button></Link>
      </div>
       {isloading ? (
Array.from({length : 3}).map((_ , i) => (
    <div key={i} className='border border-neutral-700 p-2 rounded-sm space-y-2'>
      <div className='flex gap-x-2 items-center'>
        <Skeleton className='size-13 rounded-full bg-neutral-400'/>
        <div className='space-y-3'>
          <Skeleton className='h-4 w-25 rounded-sm bg-neutral-400'/>
          <Skeleton className='h-4 w-40 rounded-sm bg-neutral-400'/>
        </div>
      </div>
  <Skeleton  className='h-[400px] bg-neutral-400'/>
</div>
  ))

      ): (posts.length > 0 ? posts.map((post , index) => (
            <div key={index} className='border border-neutral-700 p-2 rounded-sm'>
              <div className='flex gap-x-2'>
<div className='relative h-13 w-13 size-13 overflow-hidden'>
  <Image src="/photopr.jpg" alt=''
fill
className='rounded-full'/>

<div className='absolute inset-0 hover:bg-black/20 rounded-full transition-all duration-150 cursor-pointer'></div>
</div>

<div>
  <h1 className='text-black font-semibold'>Unknown user {index % 2 === 0 && <span className='bg-orange-500/50 px-2 py-0.5 rounded-sm'>Coach</span>} </h1>
  <p>Post posed {formatDistanceToNow(post.createdAt , {
    addSuffix : true
  })}</p>
</div>
              </div>
              <h1 className=' text-lg font-semibold'>{post.title}</h1>
              {post.description && (
                <p>{post.description}</p>
              )}
              {post.image && (
                <Image src={post.image}
                alt=''
                height={500}
                width={500}
                className='rounded-sm py-1'/>
              )}
            </div>
          ))
      : !isloading && (
        <div className='flex justify-center'>
          <h1 className='flex items-center gap-x-1'>No posts found <AlertCircle/></h1>
        </div>
      ))}
 </div>
    </div>
  )
}

export default page






