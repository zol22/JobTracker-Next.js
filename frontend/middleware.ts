import { clerkMiddleware, auth} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export default clerkMiddleware( async (auth, req) => {
  const { userId } =  await auth();
  console.log("✅ Clerk Middleware is running for:", req.nextUrl.pathname);
   // 🔒 Redirect unauthenticated users
   if (!userId) {
    console.log("🚫 Access Denied - Redirecting to Login:", req.nextUrl.pathname);
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to homepage or login
  }
});

// ✅ Apply middleware globally, protecting all routes except public ones
export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"], // Protects dashboard & all API routes
};
