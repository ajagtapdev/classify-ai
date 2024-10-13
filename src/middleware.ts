import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Match specific pages that require authentication
export const config = {
  matcher: [
    '/classifier',  // Only authenticated users can access this page
    // Continue matching other pages if needed
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)', // Protect API routes if needed
  ],
};
