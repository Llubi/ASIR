// src/pages/registro.js
import { useState } from "react";
import axios from "axios";
import styles from "@/styles/Registro.module.css";

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: "", email: "", password: "", rol: "", dni: "", vat: ""
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje("Registrando...");
    try {
      await axios.post("/api/auth/register", formData);
      setMensaje("✅ Usuario registrado con éxito.");
    } catch (err) {
      setMensaje("❌ " + (err.response?.data?.error || "Error desconocido"));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear cuenta</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="nombre"
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
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="">Selecciona tu rol</option>
            <option value="TRABAJADOR">Trabajador</option>
            <option value="CLIENTE">Cliente</option>
          </select>

          {formData.rol === "TRABAJADOR" && (
            <input
              name="dni"
              placeholder="DNI (ej: 12345678Z)"
              value={formData.dni}
              onChange={handleChange}
              className={styles.input}
              required
            />
          )}

          {formData.rol === "CLIENTE" && (
            <input
              name="vat"
              placeholder="VAT (ej: B12345678)"
              value={formData.vat}
              onChange={handleChange}
              className={styles.input}
              required
            />
          )}

          <button type="submit" className={styles.button}>
            Registrarse
          </button>
        </form>

        {mensaje && <div className={styles.message}>{mensaje}</div>}

        <div className={styles.links}>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a> ·
          <a href="/invitado">Entrar como invitado</a>
        </div>
      </div>
    </div>
  );
}
