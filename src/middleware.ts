import { NextRequest, NextResponse } from "next/server";

/*

The main function of this middleware is to check if the current user has an active session
if not it redirects the user to /login. If also checks if the url userId is the same as the current user
to make sure users can't see other's data.

*/

export async function middleware(req: NextRequest) {
  const sessionId = req.cookies.get("JSESSIONID");
  const url = new URL(req.url, "http://localhost:3000");
  console.log(`===============\nSession id: ${sessionId?.value}`);

  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const publicPaths = ["/login", "/signup"];
  if (publicPaths.includes(url.pathname)) {
    return NextResponse.next();
  }

  if (!sessionId) {
    console.log("Session id not found, redirecting to login");
    url.pathname = "/login";
    return NextResponse.redirect(url.toString());
  }

  const userId = url.pathname.split("/")[1];
  console.log(`User ID from URL path: ${userId}`);

  // Additional logging to check headers and request details
  console.log(`Request headers: ${JSON.stringify(req.headers)}`);

  const response = await fetch(
    `http://localhost:8080/api/validate-session?userId=${userId}`,
    {
      method: "GET",
      headers: {
        Cookie: `JSESSIONID=${sessionId.value}`,
      },
    }
  );

  console.log(`Response status from session validation: ${response.status}`);

  if (!response.ok) {
    const currentUserId = await response.text();
    console.log(currentUserId);

    if (currentUserId === "") {
      url.pathname = "/login";
      return NextResponse.redirect(url.toString());
    }
    // userId in path
    if (currentUserId !== userId) {
      url.pathname = `/${currentUserId}`;
      console.log("Correct user id: " + currentUserId);
      console.log("Redirecting to correct user ID URL");
      return NextResponse.redirect(url.toString());
    }
  }

  return NextResponse.next();
}
