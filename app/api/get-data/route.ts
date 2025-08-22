import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req : NextRequest) {
    try {
        const formData = await req.formData()


        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const image = formData.get("image") as File
        
let publicUrl
        if(image && image instanceof File){

            const response = await fetch(`https://storage.bunnycdn.com/${process.env.BUNNY_NET_NAME}/${image.name}` , {
                method : "PUT",
                headers : {
                    "AccessKey": process.env.BUNNY_NET_PASSWORD!,
                    "Content-Type": "application/octet-stream",
                    "Accept": "application/json"
                },
                body : image
            })

            if(!response.ok) return

            publicUrl = `https://${process.env.BUNNY_NET_PULLZONE}/${image.name}`

        }


        
        const obj = {
            title : title,
            description : description ? description : undefined,
            image : image ? publicUrl : undefined
        }

        await prisma.post.create({
            data : obj
        })

            return NextResponse.json({message : "Created Successfully"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error : "Internal error"}, {status : 500})
    }
}