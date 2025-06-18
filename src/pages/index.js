import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <section className="relative bg-[url('/camion2.jpg')] bg-cover bg-center min-h-[80vh] flex items-center justify-center text-white">
        <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">🚛 Bienvenido a LogísticaExpress</h1>
          <p className="text-lg mb-6">
            Gestiona tu flota, optimiza rutas y lleva tu logística al siguiente nivel.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition">Iniciar sesión</Link>
            <Link href="/registro" className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-semibold transition">Crear cuenta</Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">🚚 Servicios que ofrecemos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-50 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Gestión de Camiones</h3>
            <p>Visualiza, edita y controla toda tu flota de manera eficiente.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Control de Rutas</h3>
            <p>Planificación inteligente para reducir tiempos y costes logísticos.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Soporte a Clientes</h3>
            <p>Un panel dedicado para que los clientes vean disponibilidad y estado de los vehículos.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Aún no tienes cuenta?</h2>
        <p className="mb-6">Regístrate gratis o entra como invitado para conocer nuestra plataforma.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/registro" className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded text-white font-semibold transition">Registrarse</Link>
          <Link href="/invitado" className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded text-white font-semibold transition">Entrar como invitado</Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>© {new Date().getFullYear()} LogísticaExpress - Todos los derechos reservados</p>
      </footer>
    </main>
  );
}
