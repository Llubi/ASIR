import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-6 text-center">
      <h1 className="text-4xl font-bold">🚛 Bienvenido a la Plataforma de Logística</h1>
      <p className="text-lg">Gestiona camiones, cargas y usuarios desde una sola app.</p>
      <div className="mt-6 flex gap-4">
        <a
          href="/registro"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Crear cuenta
        </a>
        <a
          href="/login"
          className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Iniciar sesión
        </a>

        <a
          href="/perfil"
          className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
        >
          Ver perfil
        </a>

      </div>
    </main>
  );
}
