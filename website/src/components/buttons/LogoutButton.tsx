"use client"; // Mark as Client Component

import axios from "axios";
import { useRouter } from "next/navigation"; // Use useRouter for client-side navigation
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Optional: Loading state

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    setIsLoggingOut(true);

    try {
      // Call the Next.js API route you created above
      const response = await axios.post("/api/v1/auth/logout", {
        credentials: "include", // Important: Include cookies in the request
      });
      console.log(response);

      if (response.status !== 200) {
        console.error("Logout failed:", response.data);
        // Optionally handle specific error codes if your API route returns them
      }

      // Regardless of response status (to handle cases where backend clears session
      // but returns an error, or clears client-side state even if backend call partially fails),
      // redirect the user.
      // The Next.js API route handles the redirect via NextResponse.redirect,
      // but client-side fetch doesn't follow that redirect automatically.
      // So, perform the navigation here using the Next.js router.
      // router.push("/auth/login/owner"); // Redirect to login page after logout attempt
      router.refresh(); // Optional: Refresh the router state/caches
    } catch (error) {
      console.error("Error during logout:", error);
      // Optionally show an error message to the user
      // toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false); // Reset loading state
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut} // Disable button while logging out
      className="text-sm font-semibold"
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}
