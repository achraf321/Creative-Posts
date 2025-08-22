"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface Type {
  title : string,
  description : string,
  image? : File | null
}

const Page = () => {

  const [data , setData] = useState<Type>({
    title : "",
    description : "",
    image : null
  })
const router = useRouter()
  const [preview , setPreview] = useState("")

async function handleSubmit () {
  try {

    const formData = new FormData()
    formData.append("title" , data.title)
    formData.append("description" , data.description)
    if(data.image){
      formData.append("image" , data.image)
    }

    const res = await fetch("/api/get-data", {
      method : "POST",
      body : formData
    })
    if(!res.ok) throw new Error("Error occured server")
    setData({
      title : "",
      description : "",
      image : null
    })
toast.success("Post created successfully")
router.push("/posts")
  } catch (error) {
    console.log("Error occured - try again later")
  }
}
useEffect(() => {
if(data?.image){
  const image = data.image
  const url = URL.createObjectURL(image)
  setPreview(url)



  return () => URL.revokeObjectURL(url)
}
}, [data?.image])



  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1>Title :</h1>
      <input type="text"
      name="title"
      className="p-2 border rounded-sm "
      placeholder="title"
      onChange={(e) => setData(prev => ({...prev , title : e.target.value}))}
       />
       <h1>Description :</h1>
       <input type="text"
       className="p-2 border rounded-sm "
       placeholder="description"
       name="description"
       onChange={(e) => setData(prev => ({...prev , description : e.target.value}))} />
       <h1>Image :</h1>
  <input type="file"
  onChange={(e) => setData((prev) => ({...prev , image : e.target.files?.[0]}))}
  className="border rounded-sm p-4 bg-neutral-900 text-white" />
{preview && (
<div>
    <h1>Image Previw :</h1>
<Image src={preview} alt=""
height={500}
width={500}
className="rounded-sm border border-neutral-700"/>
</div>
)}
  <Button disabled={!data.title} onClick={handleSubmit} className="cursor-pointer py-8" variant="outline">Submit</Button>

  <div className="fixed bottom-3 w-full flex justify-center">
    <h1>all the rights reserved to the Owner 2025 / 2026</h1>
  </div>
    </div>
  )
}

export default Page
