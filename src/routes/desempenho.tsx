import { createFileRoute } from "@tanstack/react-router";
import AppSectionPlaceholder from "../components/AppSectionPlaceholder";
export const Route = createFileRoute("/desempenho")({ component: () => <AppSectionPlaceholder title="Desempenho" description="Módulo preparado para mostrar evolução, acurácia, desempenho por disciplina e pontos fortes e fracos." /> });
