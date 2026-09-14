import { createFileRoute } from "@tanstack/react-router";
import AppSectionPlaceholder from "../components/AppSectionPlaceholder";
export const Route = createFileRoute("/questoes")({ component: () => <AppSectionPlaceholder title="Questões" description="Módulo preparado para registrar questões, acertos, erros e alimentar automaticamente o desempenho por disciplina e assunto." /> });
