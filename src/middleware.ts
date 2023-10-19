import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    let verify = req.cookies.get("currentUser");
    let url = req.url
    console.log('Getting into the server', verify)

    if (!verify && url.includes('/dashboard')) {
        return NextResponse.redirect("http://localhost:3001/");
    }

    if (verify && url === "http://localhost:3001/") {
        return NextResponse.redirect("http://localhost:3001/dashboard/home");
    }


}