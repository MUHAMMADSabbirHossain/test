// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import CONFIG from "../../../../../../configurations/config";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Option 1: If your Express backend has a dedicated logout endpoint
    // Call your Express backend's logout endpoint.
    // This endpoint on the Express side should clear the session/JWT cookie.
    // await axios.post(
    //   `${CONFIG.serverBaseUrl}/v1/auth/logout`,
    //   {},
    //   {
    //     withCredentials: true, // Important: Send the auth_token cookie to the backend
    //   }
    // );

    // After the backend successfully clears the session,
    // Clear the cookie set by Next.js middleware (if you set it there)
    // Or rely on the backend's cookie clearing (if the cookie domain/path allows it)
    // For cookies set by the backend directly, the backend handles deletion.
    // Next.js can clear cookies it explicitly set via cookies().set().

    // Example of clearing a cookie explicitly set by Next.js (e.g., if you copied auth_token to a Next.js cookie)
    const cookieStore = await cookies();
    cookieStore.delete("auth_token"); // Name of the cookie Next.js set
    console.log(`✅✅✅ Cookie cleared: auth_token`);

    // Redirect the user to the login page or home page after successful logout
    // If you explicitly set a cookie in Next.js middleware and need to clear it here:
    // response.cookies.delete('auth_token'); // Use the name of the cookie Next.js set
    const response = NextResponse.redirect(
      new URL("/auth/login/owner", request.url)
    ); // Adjust redirect URL as needed

    return response;
  } catch (error) {
    console.error("Error during logout:", error);

    // Even if the backend call fails, you might still want to redirect the user
    // and clear any client-side state (though the server session might still be active).
    // For robustness, ensure your Express backend handles logout correctly.
    const response = NextResponse.redirect(
      new URL("/auth/login/owner", request.url)
    ); // Adjust redirect URL as needed
    // Optionally clear a Next.js-set cookie here too if applicable
    response.cookies.delete("auth_token");
    return response;
  }
}
