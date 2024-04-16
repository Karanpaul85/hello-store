import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req) {
  let url = req.url;
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_BASE_URL_PROD
      : process.env.NEXT_PUBLIC_API_BASE_URL_DEV;

  if (req.cookies.has("auth") && url.includes("/login")) {
    return NextResponse.redirect(`${baseUrl}/profile`);
  } else if (!req.cookies.has("auth") && url.includes("/profile")) {
    return NextResponse.redirect(`${baseUrl}/login`);
  }
}
