import { createFileRoute } from "@tanstack/react-router";
import DashboardWithNavigation from "../components/DashboardWithNavigation";

export const Route = createFileRoute("/")({ component: DashboardWithNavigation });
