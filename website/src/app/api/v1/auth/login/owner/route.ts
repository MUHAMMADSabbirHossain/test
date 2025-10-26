import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import CONFIG from "../../../../../../../configurations/config";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await axios.post(
      `${CONFIG.serverBaseUrl}/v1/auth/login/owner`,
      body
    );

    const cookie = response.headers["set-cookie"] || [];
    console.log(cookie[0].split(";"));
    const cookieName = cookie[0].split(";")[0].split("=")[0];
    const cookieValue = cookie[0].split(";")[0].split("=")[1];
    const cookieMaxAge = cookie[0].split(";")[1].split("=")[1];

    const cookieStore = await cookies();

    cookieStore.set({
      name: cookieName,
      value: cookieValue,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: Number(cookieMaxAge),
      path: "/",
    });
    // console.log({ cookieStore });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Error proxying login request to backend:", error);

    // Check if the error is an AxiosError (thrown by axios for non-2xx responses)
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error; // Type assertion for clarity

      // Access the response details from the Express backend
      const backendStatus = axiosError.response?.status || 500; // Default to 500 if no response
      const backendData = axiosError.response?.data; // The error message/object from Express
      const backendHeaders = axiosError.response?.headers; // Optional: forward headers if needed

      return NextResponse.json(backendData, { status: backendStatus });
    }

    // If it's a different kind of error (e.g., network error, code error within axios before sending)
    console.error("Non-Axios error occurred:", error);
    return NextResponse.json(
      { message: "Internal Server Error at Proxy" },
      { status: 500 }
    );
  }
}
