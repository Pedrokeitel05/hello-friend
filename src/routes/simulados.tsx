import { createFileRoute } from "@tanstack/react-router";
import AppSectionPlaceholder from "../components/AppSectionPlaceholder";
export const Route = createFileRoute("/simulados")({ component: () => <AppSectionPlaceholder title="Simulados" description="Módulo preparado para cadastrar provas, calcular desempenho e comparar sua evolução ao longo dos simulados." /> });
