export type StudyRecord={date:string;subject:string;topic:string;minutes:number;correct:number;wrong:number};
export type Revision={id:string;studyId:string;subject:string;topic:string;date:string;interval:number;status:"PROGRAMADA"|"ATRASADA"|"CONCLUÍDA"|"IGNORADA"};
export type SubjectInput={name:string;weight:number;knowledge:number;topics:string[]};

export const REVISION_INTERVALS=[1,7,30,60] as const;
export const performance=(correct:number,wrong:number)=>{const total=correct+wrong;return total?Math.round(correct/total*100):0};
export const performanceLabel=(value:number)=>value<=65?"Ruim":value<=75?"Regular":"Bom";
export const addDays=(date:string,days:number)=>{const d=new Date(`${date}T12:00:00`);d.setDate(d.getDate()+days);return d.toLocaleDateString("sv-SE")};
export const priorityScore=(subject:SubjectInput,records:StudyRecord[])=>{const own=records.filter(r=>r.subject===subject.name);const questions=own.reduce((n,r)=>n+r.correct+r.wrong,0);const accuracy=questions?performance(own.reduce((n,r)=>n+r.correct,0),own.reduce((n,r)=>n+r.wrong,0)):subject.knowledge;const deficit=100-subject.knowledge;const weakness=100-accuracy;const content=Math.min(100,subject.topics.length*12);return Math.round(subject.weight*.3+deficit*.3+weakness*.2+content*.2)};
export const rankSubjects=(subjects:SubjectInput[],records:StudyRecord[])=>subjects.map(s=>({subject:s,score:priorityScore(s,records)})).sort((a,b)=>b.score-a.score);
export const scheduleRevisions=(record:StudyRecord,studyId:string):Revision[]=>REVISION_INTERVALS.map(interval=>({id:`${studyId}-${interval}`,studyId,subject:record.subject,topic:record.topic,date:addDays(record.date,interval),interval,status:"PROGRAMADA"}));
export const weekMinutes=(records:StudyRecord[],today=new Date().toLocaleDateString("sv-SE"))=>records.filter(r=>r.date>=addDays(today,-6)).reduce((n,r)=>n+r.minutes,0);
export const averageStudyDay=(records:StudyRecord[])=>{const days=new Set(records.map(r=>r.date)).size;return days?Math.round(records.reduce((n,r)=>n+r.minutes,0)/days):0};
export const streak=(records:StudyRecord[])=>{const days=new Set(records.map(r=>r.date));let n=0,d=new Date();while(days.has(d.toLocaleDateString("sv-SE"))){n++;d.setDate(d.getDate()-1)}return n};
export const simulateScore=(style:"Múltipla escolha"|"Certo/Errado",items:{total:number;correct:number;wrong:number;blank?:number;weight?:number}[])=>{const score=items.reduce((n,x)=>n+(x.weight??1)*(style==="Certo/Errado"?x.correct-x.wrong:x.correct),0);const total=items.reduce((n,x)=>n+x.total,0);return {score,percentage:total?Math.round(score/total*100):0};};
