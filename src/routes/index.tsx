import { createFileRoute } from "@tanstack/react-router";
import EstudaDashboard from "../components/EstudaDashboard";
export const Route = createFileRoute("/")({ component: EstudaDashboard });
