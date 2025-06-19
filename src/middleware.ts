import { NextResponse, type NextRequest } from "next/server";
import { UserRoles } from "@/interfaces/user";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const user = request.cookies.get("user")?.value;
    let role: string | undefined;

    const adminPages = [
        "/admin/dashboard ",
        "/admin/accounts",
        "/admin",
    ];
    const userPages = ["/my-booking"];

    if (user) {
        try {
            const parsedUser = JSON.parse(user);
            role = parsedUser.role;
        } catch (error) {
            console.error("Error parsing user cookie:", error);
        }
    }

    const pathname = request.nextUrl.pathname;

    // **Disable caching to prevent stale UI**
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    // **1. If no token or no valid role, redirect to login**
    if (!token || !role) {
        return NextResponse.redirect(new URL(`/login?message=Login required`, request.url));
    }

    // **2. Prevent users from accessing admin pages**
    if (role === UserRoles.USER && adminPages.some((page) => pathname.startsWith(page))) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // **3. Prevent admin/sub-admin from accessing user pages**
    if (
        (role === UserRoles.ADMIN || role === UserRoles.SUB_ADMIN) &&
        userPages.some((page) => pathname.startsWith(page))
    ) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return response;
}

export const config = {
    matcher: ["/admin/:path*", "/my-booking"],
};
