import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  "/",
  "/signup(.*)",
  "/api/webhook(.*)",
  "/api/check-subscription(.*)"
])
   
const isExecutuveRoute = createRouteMatcher(["/executive"]) 

export default clerkMiddleware(async (auth , req) => {
    
const {userId}= await auth()

const { origin , pathname } = req.nextUrl


if(pathname === "/api/check-subscription"){
  return NextResponse.next()
}

if(!isPublicRoute(req) && !userId){
return NextResponse.redirect(new URL("/signup" , origin))
}

if(isExecutuveRoute(req) && userId){
try {
  const response = await fetch(`${origin}/api/check-subscription?userId=${userId}`)
const data = await response.json()

if(!data.subscriptionActive) {
  return NextResponse.redirect(new URL("/subscribe" , origin))
}
}
catch (error : any) {
  return NextResponse.redirect(new URL("/subscribe" , origin))
}
}
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}