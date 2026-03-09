import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

export function App() {
  return (
    <main style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>pack_welcome</h1>
      <p>Aplicação pronta para deploy na AWS.</p>
    </main>
  );
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elemento #root não encontrado");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
