import { createFileRoute } from "@tanstack/react-router";
import AppSectionPlaceholder from "../components/AppSectionPlaceholder";
export const Route = createFileRoute("/plano-de-estudos")({ component: () => <AppSectionPlaceholder title="Plano de Estudos" description="Aqui ficará o planejamento semanal inteligente, distribuindo o tempo conforme peso, desempenho, déficit e conteúdo pendente." /> });
