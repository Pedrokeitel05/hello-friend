import { createFileRoute } from "@tanstack/react-router";
import EstudaEdital from "../components/EstudaEdital";

export const Route = createFileRoute("/edital")({ component: EstudaEdital });
