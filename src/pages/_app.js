import "@/styles/globals.css";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Rutas donde NO queremos mostrar el layout con UserMenu
  const sinLayout = ["/login", "/registro", "/invitado"];

  const usarLayout = !sinLayout.includes(router.pathname);

  return usarLayout ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );
}
