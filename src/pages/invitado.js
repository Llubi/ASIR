import { useState } from "react";

export default function Invitado() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí podrías enviar a un backend, correo, etc.
    console.log("Mensaje de invitado:", formData);

    setEnviado(true);
    setFormData({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <main className="min-h-screen max-w-3xl mx-auto p-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center">Bienvenido a nuestra empresa logística</h1>

      <section className="text-lg text-gray-700">
        <p>
          Somos una empresa especializada en el transporte y gestión de flotas de camiones. 
          Nuestro objetivo es ofrecer soluciones logísticas eficientes y adaptadas a tus necesidades.
        </p>
        <p className="mt-4">
          Si estás interesado en colaborar con nosotros o tienes alguna duda, rellena el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
        </p>
      </section>

      <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
        <input
          name="nombre"
          type="text"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Tu correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <textarea
          name="mensaje"
          placeholder="Tu mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
          rows={4}
          className="border px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar mensaje
        </button>
      </form>

      {enviado && (
        <p className="text-green-600 text-center mt-4">
          ✅ ¡Mensaje enviado correctamente! Gracias por tu interés.
        </p>
      )}

      <div className="text-center mt-8">
        <a href="/" className="text-blue-600 underline">
          Volver al inicio
        </a>
      </div>
    </main>
  );
}
