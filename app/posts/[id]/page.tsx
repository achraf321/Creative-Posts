import { prisma } from '@/lib/prisma'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import React from 'react'


const page = async ({params}: {params : Promise<{id : string}>}) => {

    const {id} = await params

    const post = await prisma.post.findUnique({
        where : {id}
    })

    if(!post) return
      
  return (
    <div className='w-full xl:w-[70%] mx-auto my-2'>
      <div className='border border-neutral-700 p-2 rounded-sm'>
                    <div className='flex gap-x-2'>
      <div className='relative h-13 w-13 size-13 overflow-hidden'>
        <Image src="/photopr.jpg" alt=''
      fill
      className='rounded-full'/>
      
      <div className='absolute inset-0 hover:bg-black/20 rounded-full transition-all duration-150 cursor-pointer'></div>
      </div>
      
      <div>
        <h1 className='text-black font-semibold'>Unknown user <span className='bg-orange-500/50 px-2 py-0.5 rounded-sm'>Coach</span></h1>
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
    </div>
  )
}

export default page
