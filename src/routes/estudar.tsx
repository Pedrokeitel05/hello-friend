import { createFileRoute } from "@tanstack/react-router";
import StudySession from "../components/StudySession";

export const Route = createFileRoute("/estudar")({ component: StudySession });
