import { useNavigate } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import EstudaDashboardFinal from "./EstudaDashboardFinal";

const routes: Record<string, string> = {
  "Dashboard": "/",
  "Plano de Estudos": "/plano-de-estudos",
  "Questões": "/questoes",
  "Desempenho": "/desempenho",
  "Simulados": "/simulados",
  "Edital": "/edital",
};

export default function DashboardWithNavigation() {
  const navigate = useNavigate();

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const button = (event.target as HTMLElement).closest("button");
    if (!button) return;
    const label = button.textContent?.replace(/\d+/g, "").trim() ?? "";
    const match = Object.keys(routes).find((key) => label === key || label.startsWith(key));
    if (match) {
      event.preventDefault();
      navigate({ to: routes[match] });
    }
  }

  return <div onClick={handleClick}><EstudaDashboardFinal /></div>;
}
