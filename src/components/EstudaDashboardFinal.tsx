import { useState } from "react";
import { BarChart3, Bell, BookOpen, CalendarDays, Check, ChevronDown, ChevronRight, CircleHelp, Clock3, Flame, Gauge, LayoutDashboard, Menu, MoreHorizontal, Play, Search, Settings, Target, Trophy, Upload, X, Zap } from "lucide-react";

const disciplines = [
  { name: "Português", value: 82 },
  { name: "Legislação", value: 75 },
  { name: "Raciocínio Lógico", value: 70 },
  { name: "Conhecimentos Gerais", value: 90 },
  { name: "Informática", value: 68 },
];

const agenda = [
  { day: "SEG", date: "14", subject: "Português", topic: "Pronomes e colocação", time: "2h00", done: true },
  { day: "TER", date: "15", subject: "Raciocínio Lógico", topic: "Proposições", time: "1h30", done: true },
  { day: "QUA", date: "16", subject: "Informática", topic: "Segurança da Informação", time: "2h00", done: false },
  { day: "QUI", date: "17", subject: "Conhecimentos Gerais", topic: "Sistema Prisional RS", time: "1h30", done: false },
  { day: "SEX", date: "18", subject: "Legislação", topic: "Lei de Execução Penal", time: "2h00", done: false },
];

const menuItems = [
  ["Dashboard", LayoutDashboard],
  ["Plano de Estudos", CalendarDays],
  ["Questões", Target],
  ["Desempenho", BarChart3],
  ["Simulados", Trophy],
  ["Edital", BookOpen],
] as const;

export default function EstudaDashboardFinal() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-[#f7f8f7] text-[#14231d] antialiased">
      <Sidebar active={active} onSelect={(item) => { setActive(item); setMobileOpen(false); }} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className="min-h-screen lg:pl-[248px]">
        <Topbar onMenu={() => setMobileOpen(true)} />

        <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-extrabold text-[#08754f]">
                <span className="h-2 w-2 rounded-full bg-[#20b982]" />
                Segunda-feira, 14 de setembro
              </div>
              <h1 className="text-[32px] font-black tracking-[-0.05em] sm:text-[38px]">Bora estudar.</h1>
              <p className="mt-1 text-sm text-[#7a857f]">Seu estudo, organizado. Seu concurso, mais perto.</p>
            </div>
            <button onClick={() => setImportOpen(true)} className="hidden items-center gap-2 rounded-xl bg-[#08754f] px-4 py-3 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(8,117,79,.16)] transition hover:bg-[#076846] md:flex">
              <Upload size={15} /> Novo edital
            </button>
          </div>

          <Hero onImport={() => setImportOpen(true)} />

          <section className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Metric icon={<Flame />} label="Ritmo de estudos" value="7 dias" detail="+2 dias nesta semana" trend />
            <Metric icon={<Clock3 />} label="Horas na semana" value="12h42" detail="71% da meta de 18h" ring={71} />
            <Metric icon={<Target />} label="Questões resolvidas" value="187" detail="72% de acerto" trend />
            <Metric icon={<Zap />} label="Evolução" value="72%" detail="+6% nesta semana" spark />
          </section>

          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,.9fr)]">
            <Agenda />
            <Performance />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)]">
            <NextGoal />
            <Achievements />
          </div>
        </div>
      </main>

      {importOpen && <ImportModal onClose={() => setImportOpen(false)} />}
    </div>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-40 flex h-[70px] items-center justify-between border-b border-[#e4e8e5] bg-white/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="rounded-xl border border-[#e1e7e3] p-2 lg:hidden"><Menu size={19} /></button>
        <div className="relative hidden w-[410px] md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a958f]" size={17} />
          <input placeholder="Buscar assuntos, questões, anotações..." className="h-10 w-full rounded-xl border border-[#e0e6e2] bg-[#f8faf8] pl-10 pr-4 text-xs text-[#25342d] outline-none transition focus:border-[#93bca9] focus:ring-2 focus:ring-[#08754f]/10" />
          <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-[#dfe5e1] bg-white px-1.5 py-0.5 text-[8px] font-bold text-[#98a19c] lg:block">⌘ K</span>
        </div>
        <span className="text-xs font-bold text-[#647069] md:hidden">Visão geral</span>
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
        <button className="relative rounded-xl p-2 text-[#536159] transition hover:bg-[#f3f6f4]"><Bell size={19} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#08754f]" /></button>
        <div className="hidden h-7 w-px bg-[#e5e9e6] sm:block" />
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#142f25] text-[10px] font-black text-white">PK</div>
          <div className="hidden sm:block"><p className="text-xs font-extrabold">Pedro Keitel</p><p className="text-[10px] text-[#87918b]">Foco todos os dias</p></div>
          <ChevronDown size={14} className="text-[#66726b]" />
        </div>
      </div>
    </header>
  );
}

function Sidebar({ active, onSelect, mobileOpen, onClose }: { active: string; onSelect: (x: string) => void; mobileOpen: boolean; onClose: () => void }) {
  return <>
    {mobileOpen && <button aria-label="Fechar menu" onClick={onClose} className="fixed inset-0 z-40 bg-[#06140e]/35 backdrop-blur-sm lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-50 w-[248px] border-r border-[#e1e6e2] bg-white transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
      <div className="flex h-full flex-col px-4 py-5">
        <div className="mb-7 flex items-center gap-3 px-2">
          <Logo />
          <div><div className="text-[17px] font-black tracking-[-.03em]">Estuda Thê!</div><div className="text-[8px] font-bold uppercase tracking-[.24em] text-[#8a948e]">ESTUDO BAGUAL</div></div>
          <button onClick={onClose} className="ml-auto rounded-lg p-1 lg:hidden"><X size={17} /></button>
        </div>

        <div className="mb-6 rounded-2xl border border-[#e0e6e2] bg-[#f8faf8] p-4">
          <div className="flex items-center justify-between"><span className="text-[8px] font-black uppercase tracking-[.18em] text-[#7c8881]">Concurso ativo</span><span className="h-2 w-2 rounded-full bg-[#19b17b]" /></div>
          <div className="mt-2 text-[13px] font-black">Polícia Penal RS</div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#dfe7e2]"><div className="h-full w-[61%] rounded-full bg-[#08754f]" /></div>
          <div className="mt-2 flex justify-between text-[9px] font-bold text-[#77837c]"><span>61% do edital</span><span>42 / 69</span></div>
        </div>

        <nav className="space-y-1">
          {menuItems.map(([label, Icon]) => <button key={label} onClick={() => onSelect(label)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] font-bold transition ${active === label ? "bg-[#e8f3ee] text-[#08754f]" : "text-[#657169] hover:bg-[#f4f7f5]"}`}><Icon size={17} strokeWidth={active === label ? 2.4 : 1.8} />{label}{label === "Questões" && <span className="ml-auto rounded-md bg-[#edf2ef] px-1.5 py-0.5 text-[8px] font-black">187</span>}</button>)}
        </nav>

        <div className="mt-auto">
          <button className="mb-3 flex w-full items-center gap-3 rounded-xl border-t border-[#e7ebe8] px-3 pt-4 text-left text-[12px] font-bold text-[#657169]"><Settings size={17} /> Configurações</button>
          <div className="rounded-2xl bg-[#103d2d] p-4 text-white">
            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[.18em] text-[#b5cec2]"><Flame size={13} /> Meta semanal</div>
            <div className="mt-2 flex items-baseline justify-between"><b className="text-[24px] tracking-[-.04em]">12h42</b><span className="text-[10px] text-[#a8c2b7]">/ 18h</span></div>
            <div className="mt-3 h-1.5 rounded-full bg-white/15"><div className="h-full w-[71%] rounded-full bg-[#58d6a2]" /></div>
            <div className="mt-2 flex justify-between text-[8px] font-semibold text-[#a8c2b7]"><span>71% concluído</span><span>5h18 restantes</span></div>
          </div>
        </div>
      </div>
    </aside>
  </>;
}

function Logo() { return <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[13px] bg-[#08754f] shadow-[0_7px_18px_rgba(8,117,79,.2)]"><div className="absolute -right-2 -top-3 h-8 w-8 rounded-full border-2 border-white/20" /><span className="relative text-[12px] font-black text-white">ET</span></div>; }

function Hero({ onImport }: { onImport: () => void }) {
  return <section className="relative overflow-hidden rounded-[20px] bg-[#07372b] px-6 py-6 text-white shadow-[0_15px_35px_rgba(5,48,37,.13)] sm:px-8 sm:py-7">
    <div className="absolute inset-y-0 right-0 w-[55%] opacity-80" style={{ background: "radial-gradient(ellipse at 60% 45%, rgba(62,153,120,.22), transparent 48%), linear-gradient(105deg, transparent 0%, rgba(0,0,0,.04) 45%, rgba(0,0,0,.2) 100%)" }} />
    <div className="absolute right-[-30px] top-[-100px] h-[300px] w-[300px] rounded-full border-[45px] border-white/[.035]" />
    <div className="absolute bottom-[-85px] right-[26%] h-52 w-52 rounded-full bg-[#49d29d]/10 blur-3xl" />
    <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
      <div className="max-w-[650px]">
        <div className="text-[9px] font-black uppercase tracking-[.3em] text-[#8fb7a9]">Concurso ativo</div>
        <div className="mt-2 flex items-center gap-3"><h2 className="text-[27px] font-black tracking-[-.045em] sm:text-[32px]">Polícia Penal RS</h2><span className="rounded-full border border-white/10 bg-white/[.07] px-2 py-1 text-[8px] font-bold text-[#bdd4ca]">PPRS</span></div>
        <p className="mt-1 text-sm text-[#bfd4cc]">Seu foco hoje constrói o seu amanhã.</p>
        <div className="mt-5 flex max-w-[500px] items-center gap-3"><div className="h-2 flex-1 rounded-full bg-white/15"><div className="h-full w-[61%] rounded-full bg-[#4fd59f]" /></div><b className="text-xs">61%</b></div>
      </div>
      <div className="flex items-center gap-7 border-l border-white/10 pl-6 md:min-w-[255px]">
        <div><span className="text-[8px] font-black uppercase tracking-[.18em] text-[#8eb0a4]">Assuntos</span><strong className="mt-1 block text-[22px]">42 <small className="text-xs font-medium text-[#9ebbb1]">/ 69</small></strong></div>
        <div><span className="text-[8px] font-black uppercase tracking-[.18em] text-[#8eb0a4]">Revisões</span><strong className="mt-1 block text-[22px]">18 <small className="text-xs font-medium text-[#9ebbb1]">/ 27</small></strong></div>
        <button onClick={onImport} className="hidden rounded-xl bg-white/10 p-2.5 text-white transition hover:bg-white/15 md:block"><MoreHorizontal size={17} /></button>
      </div>
    </div>
  </section>;
}

function Metric({ icon, label, value, detail, trend, ring, spark }: { icon: React.ReactNode; label: string; value: string; detail: string; trend?: boolean; ring?: number; spark?: boolean }) {
  return <div className="relative overflow-hidden rounded-[17px] border border-[#e2e7e4] bg-white px-4 py-4 shadow-[0_3px_12px_rgba(18,35,29,.035)]">
    <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-[#08754f]"><span>{icon}</span><span className="text-[9px] font-black uppercase tracking-[.13em] text-[#78847d]">{label}</span></div>{ring !== undefined && <div className="relative h-11 w-11 rounded-full" style={{ background: `conic-gradient(#0b9b6b ${ring}%, #e6ece8 0)` }}><div className="absolute inset-[5px] flex items-center justify-center rounded-full bg-white text-[10px] font-black">{ring}%</div></div>}{spark && <div className="flex h-9 w-16 items-end gap-1 opacity-70">{[12,18,14,24,20,29,26,34].map((h,i)=><span key={i} className="w-1.5 rounded-t bg-[#15946b]" style={{height:`${h}px`}} />)}</div>}</div>
    <div className="mt-2 flex items-end justify-between"><strong className="text-[25px] font-black tracking-[-.05em]">{value}</strong>{trend && <span className="text-[9px] font-bold text-[#168762]">↗ +6%</span>}</div>
    <div className="mt-0.5 text-[10px] font-semibold text-[#818b85]">{detail}</div>
  </div>;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <section className={`rounded-[18px] border border-[#e1e7e3] bg-white p-5 shadow-[0_3px_14px_rgba(18,35,29,.035)] ${className}`}>{children}</section>; }
function PanelTitle({ icon, title, action }: { icon: React.ReactNode; title: string; action?: string }) { return <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2.5"><span className="text-[#08754f]">{icon}</span><h3 className="text-[14px] font-black tracking-[-.02em]">{title}</h3></div>{action && <button className="flex items-center gap-1 text-[9px] font-black text-[#08754f]">{action}<ChevronRight size={13}/></button>}</div>; }

function Agenda() {
  const [completed, setCompleted] = useState(agenda.map(x => x.done));
  return <Panel><PanelTitle icon={<CalendarDays size={18}/>} title="Agenda da semana" action="Ver plano completo" /><div className="space-y-2">{agenda.map((item, i) => <div key={item.day} className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 transition ${completed[i] ? "border-[#e2ece7] bg-[#f8fbf9]" : "border-[#edf0ee] hover:border-[#d8e5de] hover:bg-[#fbfcfb]"}`}>
    <div className="w-[34px] shrink-0 text-center"><div className="text-[8px] font-black text-[#8b958f]">{item.day}</div><div className="text-[15px] font-black leading-4">{item.date}</div></div>
    <button onClick={() => setCompleted(c => c.map((v,j) => j===i ? !v : v))} className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition ${completed[i] ? "border-[#08754f] bg-[#08754f] text-white" : "border-[#c7d0ca] text-transparent hover:border-[#08754f]"}`}><Check size={13} strokeWidth={3}/></button>
    <div className="min-w-0 flex-1"><div className="truncate text-[11px] font-extrabold">{item.subject}</div><div className="truncate text-[9px] text-[#7f8a83]">{item.topic}</div></div>
    <span className="hidden text-[10px] font-bold text-[#59675f] sm:block">{item.time}</span>
    {completed[i] ? <span className="rounded-lg bg-[#e8f4ee] px-2 py-1 text-[8px] font-black text-[#08754f]">Concluído</span> : <button className="flex items-center gap-1 rounded-lg bg-[#edf7f2] px-2.5 py-1.5 text-[8px] font-black text-[#08754f] opacity-90 transition group-hover:opacity-100"><Play size={10} fill="currentColor"/> Estudar</button>}
  </div>)}</div></Panel>;
}

function Performance() {
  return <Panel><PanelTitle icon={<BarChart3 size={18}/>} title="Desempenho por disciplina" action="Ver detalhado" /><div className="space-y-4">{disciplines.map(d => <div key={d.name}><div className="mb-1.5 flex items-center justify-between"><span className="text-[10px] font-bold text-[#536159]">{d.name}</span><span className="text-[10px] font-black text-[#08754f]">{d.value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#edf1ee]"><div className="h-full rounded-full bg-[#15956b] transition-all" style={{width:`${d.value}%`}} /></div></div>)}</div><div className="mt-5 flex items-center justify-between rounded-xl bg-[#f7faf8] px-3 py-2.5"><div className="flex items-center gap-2 text-[9px] font-bold text-[#718078]"><CircleHelp size={13}/> Baseado nas questões registradas</div><span className="text-[9px] font-black text-[#08754f]">187 questões</span></div></Panel>;
}

function NextGoal() { return <Panel><PanelTitle icon={<Target size={18}/>} title="Próxima meta" /><div className="rounded-xl bg-[#f6f9f7] p-4"><div className="flex items-start justify-between gap-3"><div><b className="text-[13px] font-black">Atingir 70% do edital</b><p className="mt-1 text-[9px] text-[#7b8780]">Continue avançando nos assuntos pendentes.</p></div><span className="whitespace-nowrap text-[9px] font-black text-[#08754f]">61 → 70%</span></div><div className="mt-4 h-2 rounded-full bg-[#dce5df]"><div className="h-full w-[61%] rounded-full bg-[#19aa78]"/></div><div className="mt-2 flex justify-between text-[8px] font-bold text-[#7d8982]"><span>42 assuntos concluídos</span><span>faltam 8 para a meta</span></div></div></Panel>; }

function Achievements() { return <Panel><PanelTitle icon={<Trophy size={18}/>} title="Conquistas recentes" action="Ver todas" /><div className="grid grid-cols-3 gap-3"><Achievement icon="🔥" value="7 dias" label="seguidos"/><Achievement icon="◷" value="50 horas" label="estudadas"/><Achievement icon="✓" value="100" label="questões"/></div></Panel>; }
function Achievement({icon,value,label}:{icon:string;value:string;label:string}) { return <div className="flex items-center gap-3 rounded-xl border border-[#edf0ee] bg-[#fbfcfb] p-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f4ee] text-base">{icon}</div><div><b className="block text-[11px] font-black">{value}</b><span className="text-[9px] text-[#7f8a83]">{label}</span></div></div>; }

function ImportModal({ onClose }: { onClose: () => void }) { return <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#06150f]/45 p-4 backdrop-blur-sm"><div className="w-full max-w-[520px] rounded-[24px] border border-white/50 bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><span className="text-[9px] font-black uppercase tracking-[.2em] text-[#08754f]">Novo concurso</span><h2 className="mt-1 text-xl font-black tracking-[-.03em]">Importar edital</h2><p className="mt-1 text-xs text-[#7c8881]">Envie o PDF do edital para começar a organizar seu estudo.</p></div><button onClick={onClose} className="rounded-xl p-2 text-[#647169] hover:bg-[#f3f6f4]"><X size={18}/></button></div><label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#cbd8d0] bg-[#f8faf9] px-5 py-11 text-center transition hover:border-[#08754f] hover:bg-[#f2f8f5]"><Upload className="text-[#08754f]" size={25}/><b className="mt-3 text-sm">Selecione o PDF do edital</b><span className="mt-1 text-[10px] text-[#839089]">PDF • máximo recomendado de 20 MB</span><input type="file" accept="application/pdf" className="hidden" /></label><div className="mt-5 flex justify-end gap-2"><button onClick={onClose} className="rounded-xl px-4 py-2.5 text-xs font-bold text-[#69756e]">Cancelar</button><button onClick={onClose} className="rounded-xl bg-[#08754f] px-4 py-2.5 text-xs font-black text-white">Continuar</button></div></div></div>; }
