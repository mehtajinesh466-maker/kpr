import { NextRequest } from "next/server";

export function checkAdminAuth(req: NextRequest): boolean {
  // Check cookie or header for admin password
  const passwordFromCookie = req.cookies.get("admin-password")?.value;
  const passwordFromHeader = req.headers.get("x-admin-password");
  
  const actualPassword = process.env.ADMIN_PASSWORD || "chesseasy-admin";
  
  return (passwordFromCookie === actualPassword) || (passwordFromHeader === actualPassword);
}
