import axios from "axios";
import { NextResponse } from "next/server";
import CONFIG from "../../../../../../../configurations/config";

export async function POST(request: Request) {
  const body = await request.json();

  const res = await axios.post(
    `${CONFIG.serverBaseUrl}/v1/auth/login/owner`,
    body
  );

  return NextResponse.json(res.data);
}
