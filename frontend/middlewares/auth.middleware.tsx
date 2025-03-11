import { clerkMiddleware } from "@clerk/nextjs/server";

// Protect the /dashboard route so only authenticated users can access it.

export default clerkMiddleware();

export const config = {
  matcher: ["/dashboard"], // Only protect /dashboard
};
