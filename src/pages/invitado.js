import { useState } from "react";
import styles from "@/styles/InvitadoCuestionario.module.css";

export default function Invitado() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    interes: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setEnviado(false);

  try {
    const res = await fetch("/api/invitado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setEnviado(true);
      setFormData({ nombre: "", email: "", empresa: "", interes: "", mensaje: "" });
    } else {
      const data = await res.json();
      alert(data.error || "Error al enviar el mensaje");
    }
  } catch (err) {
    alert("❌ Error de red");
  }
};

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Bienvenido a Transportes Logísticos Lozano</h1>
        <p className={styles.subtitle}>
          Soluciones logísticas a medida con una flota moderna y eficiente.
        </p>
        <img
          src="/camion.png"
          alt="Camiones en ruta"
          style={{ borderRadius: "1rem", width: "100%", marginTop: "1.5rem" }}
        />
      </header>

      <section>
        <h2 className={styles.subtitle} style={{ fontWeight: "bold" }}>
          Cuéntanos más sobre ti
        </h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="nombre"
            type="text"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            name="empresa"
            type="text"
            placeholder="Nombre de tu empresa"
            value={formData.empresa}
            onChange={handleChange}
            className={styles.input}
          />
          <select
            name="interes"
            value={formData.interes}
            onChange={handleChange}
            className={styles.input}
            required
          >
            <option value="">Selecciona tu interés</option>
            <option value="transporte">Servicios de transporte</option>
            <option value="colaboracion">Propuesta de colaboración</option>
            <option value="informacion">Solicitar información</option>
          </select>
          <textarea
            name="mensaje"
            placeholder="Cuéntanos en detalle cómo podemos ayudarte"
            value={formData.mensaje}
            onChange={handleChange}
            className={styles.textarea}
            rows={5}
            required
          />
          <button type="submit" className={styles.button}>
            Enviar solicitud
          </button>
        </form>

        {enviado && (
          <p className={styles.success}>
            ✅ Gracias por tu interés. Nuestro equipo se pondrá en contacto contigo.
          </p>
        )}

        <div className={styles.link}>
          <a href="/">← Volver al inicio</a>
        </div>
      </section>
    </main>
  );
}
