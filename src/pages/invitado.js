// src/pages/invitado.js

export default function Invitado() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-6 text-center">
      <h1 className="text-3xl font-bold">Bienvenido a Logística Global</h1>
      <p className="max-w-xl text-gray-700">
        Somos una empresa dedicada a la optimización del transporte de mercancías por carretera.
        Conectamos cargas con camiones disponibles en tiempo real. Si estás interesado en colaborar con nosotros, contáctanos.
      </p>

      <form className="mt-6 w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Tu nombre"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Tu correo"
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Escríbenos tu mensaje"
          rows={4}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📩 Enviar mensaje
        </button>
      </form>
    </main>
  );
}
