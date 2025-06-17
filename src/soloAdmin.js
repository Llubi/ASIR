import { NextResponse } from "next/server";
import { verificarToken } from "@/lib/auth";

export function middleware(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const usuario = verificarToken({ headers: { authorization: `Bearer ${token}` } });

    if (usuario.rol !== "ADMINISTRADOR") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/usuarios"],
};
