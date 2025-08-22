import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET (req : NextRequest) {
    try {
        const {searchParams} = new URL(req.nextUrl)
        const limit = parseInt(searchParams.get("limit") || "10")
        const page = parseInt(searchParams.get("page") || "1")
        const skip = (page - 1) * limit

        const posts = await prisma.post.findMany({
            skip,
            take : limit,
            orderBy : {
                createdAt : "desc"
            }
        })

        return NextResponse.json(posts)
    } catch (error) {
        return NextResponse.json({error : "Internal error"}, {status : 500})
    }
}