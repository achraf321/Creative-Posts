import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET (req : NextRequest) {
    try {
        const posts = await prisma.post.findMany({
            orderBy : {
                createdAt : "desc"
            }
        })

        return NextResponse.json(posts)
    } catch (error) {
        return NextResponse.json({error : "Internal error"}, {status : 500})
    }
}