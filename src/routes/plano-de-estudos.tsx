import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarDays, Check, ChevronDown, Clock3, Flame, Info, Play, RefreshCw, Target, TrendingUp } from "lucide-react";
import { rankSubjects, type SubjectInput } from "../lib/studyEngine";

export const Route = createFileRoute("/plano-de-estudos")({ component: StudyPlan });

const subjects: SubjectInput[] = [
  { name: "Português", weight: 20, knowledge: 62, topics: ["Pronomes", "Concordância", "Regência", "Pontuação"] },
  { name: "Legislação", weight: 30, knowledge: 71, topics: ["LEP", "ECA", "Maria da Penha", "Direitos Humanos"] },
  { name: "Raciocínio Lógico", weight: 15, knowledge: 66, topics: ["Proposições", "Porcentagem", "Conjuntos", "Probabilidade"] },
  { name: "Informática", weight: 10, knowledge: 48, topics: ["Segurança", "Windows", "Internet", "Office"] },
  { name: "Conhecimentos Gerais", weight: 25, knowledge: 79, topics: ["RS", "Brasil", "Atualidades", "Sistema Prisional"] },
];

const records = [
  { date: "2026-09-12", subject: "Português", topic: "Pronomes", minutes: 90, correct: 14, wrong: 6 },
  { date: "2026-09-13", subject: "Legislação", topic: "LEP", minutes: 75, correct: 15, wrong: 5 },
  { date: "2026-09-13", subject: "Informática", topic: "Segurança", minutes: 45, correct: 8, wrong: 12 },
];

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function StudyPlan() {
  const [hours, setHours] = useState(18);
  const [selectedDay, setSelectedDay] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const ranked = useMemo(() => rankSubjects(subjects, records), []);
  const totalMinutes = hours * 60;
  const blocks = useMemo(() => {
    const pool = ranked.slice(0, 4);
    const base = Math.floor(totalMinutes / pool.length / 30) * 30;
    return pool.map((x, i) => ({ ...x, minutes: Math.max(60, base + (i === 0 ? 30 : 0)) }));
  }, [ranked, totalMinutes]);

  const toggle = (key: string) => setDone(v => v.includes(key) ? v.filter(x => x !== key) : [...v, key]);

  return <div className="min-h-screen bg-[#f7f8f7] text-[#14231d]">
    <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.22em] text-[#08754f]"><CalendarDays size={14}/> Planejamento inteligente</div><h1 className="mt-2 text-3xl font-black tracking-[-.045em]">Plano de Estudos</h1><p className="mt-1 text-sm text-[#78847d]">O sistema distribui seu tempo priorizando o que mais precisa da sua atenção.</p></div>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-[#dfe6e1] bg-white px-4 py-2.5 text-[10px] font-black text-[#526159] shadow-sm"><RefreshCw size={14}/> Recalcular plano</button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
        <section className="rounded-[20px] bg-[#07372b] p-6 text-white shadow-[0_15px_35px_rgba(5,48,37,.12)]"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><div className="text-[8px] font-black uppercase tracking-[.28em] text-[#8fb7a9]">Concurso ativo</div><h2 className="mt-2 text-2xl font-black">Polícia Penal RS</h2><p className="mt-1 text-xs text-[#bdd4cc]">Semana de 14 a 20 de setembro</p></div><div className="rounded-2xl border border-white/10 bg-white/[.06] px-5 py-4"><div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#9fc1b5]"><Flame size={13}/> Meta semanal</div><div className="mt-1 text-2xl font-black">{hours}h <span className="text-xs font-medium text-[#9ebbb1]">/ 18h</span></div></div></div><div className="mt-6 flex h-10 items-center rounded-xl bg-white/[.055] px-1">{days.map((d,i)=><button key={d} onClick={()=>setSelectedDay(i)} className={`h-8 flex-1 rounded-lg text-[9px] font-black ${selectedDay===i?"bg-white text-[#07372b]":"text-[#9dbbb0]"}`}>{d}</button>)}</div></section>
        <section className="rounded-[20px] border border-[#e1e7e3] bg-white p-6 shadow-sm"><div className="flex items-center gap-2 text-[#08754f]"><Clock3 size={17}/><span className="text-[10px] font-black uppercase tracking-[.16em] text-[#68756e]">Disponibilidade</span></div><div className="mt-4 flex items-center justify-between"><div><b className="text-2xl font-black">{hours}h</b><p className="text-[9px] text-[#818c86]">por semana</p></div><select value={hours} onChange={e=>setHours(Number(e.target.value))} className="rounded-xl border border-[#dfe6e1] bg-[#f8faf8] px-3 py-2 text-xs font-bold outline-none"><option value={10}>10h / semana</option><option value={14}>14h / semana</option><option value={18}>18h / semana</option><option value={21}>21h / semana</option><option value={25}>25h / semana</option></select></div><div className="mt-5 h-2 rounded-full bg-[#e7ece9]"><div className="h-full rounded-full bg-[#15956b]" style={{width:`${Math.min(100,hours/25*100)}%`}}/></div><p className="mt-3 flex items-center gap-1 text-[9px] font-semibold text-[#7b8780]"><Info size={12}/> Ajuste o tempo e o plano é redistribuído.</p></section>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_.8fr]">
        <section className="rounded-[20px] border border-[#e1e7e3] bg-white p-5 shadow-sm"><div className="mb-5 flex items-center justify-between"><div><h3 className="text-[15px] font-black">Sua semana</h3><p className="mt-1 text-[9px] text-[#849088]">Blocos ordenados pela prioridade calculada.</p></div><span className="rounded-lg bg-[#e8f4ee] px-2.5 py-1.5 text-[9px] font-black text-[#08754f]">{blocks.length} prioridades</span></div><div className="space-y-2">{blocks.map((b,i)=>{const key=b.subject+selectedDay;const isDone=done.includes(key);return <div key={b.subject} className={`flex items-center gap-3 rounded-xl border p-3 transition ${isDone?"border-[#dbeae3] bg-[#f7fbf9]":"border-[#edf0ee]"}`}><button onClick={()=>toggle(key)} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${isDone?"border-[#08754f] bg-[#08754f] text-white":"border-[#ccd5cf] text-transparent"}`}><Check size={14}/></button><div className="w-12 shrink-0 text-center"><div className="text-[8px] font-black text-[#8a958f]">{days[selectedDay]}</div><div className="text-[10px] font-black">{i+1}º</div></div><div className="min-w-0 flex-1"><div className="text-[11px] font-black">{b.subject.name}</div><div className="mt-0.5 text-[9px] text-[#7d8982]">Foco: {b.subject.topics[0]}</div></div><div className="hidden text-right sm:block"><div className="text-[10px] font-black text-[#08754f]">{b.minutes} min</div><div className="text-[8px] text-[#8a958f]">prioridade {b.score}</div></div><button className="flex items-center gap-1 rounded-lg bg-[#edf7f2] px-2.5 py-2 text-[8px] font-black text-[#08754f]"><Play size={10} fill="currentColor"/> Estudar</button></div>})}</div></section>
        <section className="rounded-[20px] border border-[#e1e7e3] bg-white p-5 shadow-sm"><div className="flex items-center gap-2"><TrendingUp size={17} className="text-[#08754f]"/><h3 className="text-[14px] font-black">Por que esse plano?</h3></div><p className="mt-2 text-[10px] leading-5 text-[#748079]">A prioridade combina peso da disciplina, déficit de conhecimento, desempenho em questões e quantidade de conteúdo pendente.</p><div className="mt-5 space-y-3">{ranked.slice(0,5).map((r,i)=><div key={r.subject.name} className="rounded-xl bg-[#f8faf8] p-3"><div className="flex items-center justify-between"><span className="text-[10px] font-black">{i+1}. {r.subject.name}</span><span className="text-[9px] font-black text-[#08754f]">{r.score} pts</span></div><div className="mt-2 h-1.5 rounded-full bg-[#e2e9e4]"><div className="h-full rounded-full bg-[#15956b]" style={{width:`${Math.min(100,r.score)}%`}}/></div></div>)}</div></section>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-[#dfe7e2] bg-[#eef6f1] px-4 py-3 text-[9px] font-bold text-[#547066]"><Target size={15} className="text-[#08754f]"/><span><b className="text-[#19372c]">Regra do motor:</b> quanto maior a prioridade, maior a chance de o assunto entrar no próximo bloco.</span><span className="ml-auto rounded-lg bg-white px-2 py-1 font-black text-[#08754f]">1º foco: {ranked[0]?.subject.name}</span></div>
    </div>
  </div>;
}
