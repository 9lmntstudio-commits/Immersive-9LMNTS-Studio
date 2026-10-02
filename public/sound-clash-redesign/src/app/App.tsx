import { useState, useEffect, useCallback, useRef } from "react";
import {
  Flame, Music, Crown, Calendar, User, X, ChevronUp, Zap, Plus, Lock,
  Headphones, Send, Tv2, Trophy, MessageSquare, Settings, ArrowLeft,
  ToggleLeft, ToggleRight, Ticket, BarChart2, Radio, ShieldCheck,
  TrendingUp, Users, DollarSign, Eye, QrCode, Check, ChevronRight,
} from "lucide-react";

// ─── Global styles ────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
@keyframes scWave     { 0%{transform:scaleY(.12)}100%{transform:scaleY(1)} }
@keyframes scTicker   { 0%{transform:translateX(0)}100%{transform:translateX(-50%)} }
@keyframes scGlow     { 0%,100%{box-shadow:0 0 10px rgba(217,70,239,.5),0 0 24px rgba(217,70,239,.15)}50%{box-shadow:0 0 22px rgba(217,70,239,1),0 0 50px rgba(217,70,239,.4)} }
@keyframes scBlink    { 0%,100%{opacity:1}50%{opacity:.15} }
@keyframes scFadeUp   { from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)} }
@keyframes scModal    { from{transform:translateY(60px) scale(.96);opacity:0}to{transform:translateY(0) scale(1);opacity:1} }
@keyframes scFire     { 0%{transform:translateY(0) scale(.5) rotate(0deg);opacity:1}100%{transform:translateY(-130px) scale(2.4) rotate(18deg);opacity:0} }
@keyframes scPotPulse { 0%,100%{box-shadow:0 0 0 0 rgba(251,191,36,.45)}50%{box-shadow:0 0 0 8px rgba(251,191,36,0)} }
@keyframes scFlicker  { 0%,98%{opacity:1}99%{opacity:.88}100%{opacity:1} }
@keyframes scMsgIn    { from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes scScanBeam { 0%{top:-4%}100%{top:104%} }
@keyframes scCountdown{ 0%{transform:scale(1.05)}100%{transform:scale(1)} }
@keyframes scAdminIn  { from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)} }

.sc-body    { font-family:'DM Sans',sans-serif; }
.sc-display { font-family:'Rajdhani',sans-serif; }

.sc-glass       { background:rgba(6,1,20,.62);  backdrop-filter:blur(22px); -webkit-backdrop-filter:blur(22px); }
.sc-glass-light { background:rgba(255,255,255,.06); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); }
.sc-glass-admin { background:rgba(4,1,12,.85);  backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); }

.sc-border-pink { border:1px solid rgba(217,70,239,.38); }
.sc-border-cyan { border:1px solid rgba(6,182,212,.38);  }
.sc-border-gold { border:1px solid rgba(251,191,36,.38); }

.sc-card-pink { box-shadow:0 0 28px rgba(217,70,239,.14),inset 0 0 28px rgba(217,70,239,.04); }
.sc-card-cyan { box-shadow:0 0 28px rgba(6,182,212,.14), inset 0 0 28px rgba(6,182,212,.04);  }

.sc-btn      { background:linear-gradient(135deg,#d946ef 0%,#7c3aed 50%,#06b6d4 100%); box-shadow:0 4px 26px rgba(217,70,239,.36); transition:box-shadow .25s,transform .15s; }
.sc-btn:hover{ box-shadow:0 8px 38px rgba(217,70,239,.55); }
.sc-btn:active{ transform:scale(.97); }

.sc-btn-gold { background:linear-gradient(135deg,#f59e0b,#fbbf24); box-shadow:0 4px 20px rgba(251,191,36,.4); transition:all .2s; }
.sc-btn-gold:active{ transform:scale(.97); }

.sc-btn-pink { background:linear-gradient(135deg,#d946ef,#c026d3); box-shadow:0 4px 20px rgba(217,70,239,.4); transition:all .2s; }
.sc-btn-pink:active{ transform:scale(.97); }
.sc-btn-cyan { background:linear-gradient(135deg,#06b6d4,#0284c7); box-shadow:0 4px 20px rgba(6,182,212,.4); transition:all .2s; }
.sc-btn-cyan:active{ transform:scale(.97); }

.sc-tap { transition:transform .18s; cursor:pointer; }
.sc-tap:hover{ transform:translateY(-2px); }
.sc-tap:active{ transform:scale(.97); }

.sc-glow        { animation:scGlow  2s ease-in-out infinite; }
.sc-blink       { animation:scBlink .9s ease-in-out infinite; }
.sc-wave        { animation:scWave  .65s ease-in-out infinite alternate; transform-origin:bottom; }
.sc-ticker      { animation:scTicker 32s linear infinite; }
.sc-fadeup      { animation:scFadeUp .38s cubic-bezier(.22,.68,0,1.1); }
.sc-modal-anim  { animation:scModal  .32s cubic-bezier(.34,1.22,.64,1); }
.sc-fire        { animation:scFire  1.3s ease-out forwards; position:fixed; pointer-events:none; z-index:9999; font-size:2rem; }
.sc-pot-pulse   { animation:scPotPulse 2s ease-in-out infinite; }
.sc-tv-flicker  { animation:scFlicker 8s ease-in-out infinite; }
.sc-msg-in      { animation:scMsgIn .35s cubic-bezier(.22,.68,0,1.1); }
.sc-admin-in    { animation:scAdminIn .3s cubic-bezier(.22,.68,0,1.1); }
.sc-countdown-tick { animation:scCountdown .2s ease-out; }

.sc-scanlines   { position:absolute;inset:0;pointer-events:none;border-radius:inherit;overflow:hidden;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.12) 2px,rgba(0,0,0,.12) 4px); }
.sc-scan-beam   { position:absolute;left:0;right:0;height:40px;background:linear-gradient(180deg,transparent 0%,rgba(6,182,212,.06) 50%,transparent 100%);animation:scScanBeam 3.5s linear infinite;pointer-events:none; }

* { scrollbar-width:none; }
::-webkit-scrollbar { display:none; }
`;

// ─── Constants ────────────────────────────────────────────────────────────────

const BG   = "https://images.unsplash.com/photo-1682343712229-2a0cf94eebc5?w=1080&q=80";
const LOGO = "9LMNTS";

const POWER_PACKS = [
  { votes:5,  amount:2,  label:"Starter Pack",  popular:false },
  { votes:20, amount:5,  label:"Popular Choice", popular:true  },
  { votes:50, amount:10, label:"Power Player",   popular:false },
];

const TICKET_TIERS = [
  { id:"ga",      name:"General Admission", price:20,  color:"#d946ef", sold:47,
    perks:["Event entry","Live voting access","Song request line"] },
  { id:"vip",     name:"VIP Pass",          price:75,  color:"#06b6d4", sold:12,
    perks:["GA benefits + VIP lounge","10 bonus Power Votes","Priority big screen"] },
  { id:"premium", name:"Premium Table",     price:150, color:"#fbbf24", sold:3,
    perks:["VIP benefits + reserved table","Bottle service included","20 bonus Power Votes","Name on big screen"] },
];

const CONTESTANTS = [
  { name:"DJ K-OS",   img:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&q=80", round:"Live Now · Round 1", live:true  },
  { name:"DJ VIBE",   img:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80", round:"Live Now · Round 1", live:true  },
  { name:"DJ PULSE",  img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", round:"Up Next · Round 2",  live:false },
  { name:"DJ ECHO",   img:"https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&q=80", round:"Up Next · Round 2",  live:false },
  { name:"DJ RHYTHM", img:"https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&q=80", round:"Round 3",            live:false },
  { name:"DJ BASS",   img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", round:"Round 3",            live:false },
];

const VIP_PROFILES = [
  { id:1, name:"Sarah Jenkins", role:"House / Techno", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80", tabPct:85, connected:false },
  { id:2, name:"David Chen",    role:"Future Bass",    img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80", tabPct:40, connected:false },
  { id:3, name:"Elena Ross",    role:"Electronic",     img:"https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&q=80", tabPct:95, connected:false },
  { id:4, name:"Marcus J.",     role:"Drum & Bass",    img:"https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=300&q=80", tabPct:15, connected:false },
];

const AGENDA = [
  { time:"09:00 PM", desc:"Doors Open",                   now:false },
  { time:"10:30 PM", desc:"Opening DJ Set",                now:false },
  { time:"12:30 AM", desc:"DJ Battle: K-OS vs VIBE",      now:true  },
  { time:"01:45 AM", desc:"DJ Battle: PULSE vs ECHO",     now:false },
  { time:"03:00 AM", desc:"Grand Finale",                  now:false },
  { time:"04:30 AM", desc:"After Party",                   now:false },
];

const UPGRADES = [
  { price:20,  label:"Cover Charge",   cta:"ENTER",   vip:false },
  { price:10,  label:"Power Hype",     cta:"BOOST",   vip:false },
  { price:150, label:"Bottle Service", cta:"RESERVE", vip:true  },
  { price:50,  label:"Buy a Round",    cta:"CHEERS",  vip:false },
];

const TICKER = [
  "🔥 DJ K-OS takes the lead with 150+ votes","⚡ Power Hype sold out — more soon",
  "👑 VIP Table 7 just bought a round","🎵 Flume - Never Be Like You is trending",
  "🔴 DJ Battle ROUND 1 is LIVE","💥 DJ VIBE responds with a filthy drop","🏆 $5K prize pool · Grand Finals tonight",
];

const INIT_SCREEN_MSGS = [
  { id:1, text:"Who's gonna win tonight?! DJ VIBE sounds incredible 🔥",     author:"@clubhead_99",  time:"2m ago",  live:true, premium:true  },
  { id:2, text:"K-OS just dropped that fire bassline — this is unreal!",       author:"@techno_tamara",time:"5m ago",  live:true  },
  { id:3, text:"Can we get a Daft Punk throwback set after the battle??",      author:"@vinylpurist",  time:"9m ago",  live:false },
  { id:4, text:"First time at Velvet Room — crowd is absolutely insane",       author:"@newkid_2026",  time:"12m ago", live:false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt$(n:number){ return n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}); }

function Waveform({ color="#d946ef", bars=24, h=36 }:{ color?:string;bars?:number;h?:number }) {
  const heights = Array.from({ length:bars },(_,i)=>18+Math.sin(i*.9+.3)*52+Math.cos(i*.45)*20);
  return (
    <div style={{ height:h,display:"flex",alignItems:"flex-end",gap:2 }}>
      {heights.map((ht,i)=>(
        <div key={i} className="sc-wave flex-1 rounded-sm"
          style={{ backgroundColor:color,height:`${Math.max(10,ht)}%`,opacity:.55+(i%3)*.15,
            animationDelay:`${i*.044}s`,animationDuration:`${.46+(i%5)*.11}s` }}/>
      ))}
    </div>
  );
}

function Sheet({ title,sub,accent="#d946ef",onClose,children }:
  { title:string;sub?:string;accent?:string;onClose:()=>void;children:React.ReactNode }) {
  return (
    <div className="sc-glass sc-modal-anim w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden"
      style={{ border:"1px solid rgba(217,70,239,.22)",maxHeight:"92vh",overflowY:"auto" }}>
      <div className="px-5 pt-5 pb-4 flex items-start justify-between"
        style={{ borderBottom:"1px solid rgba(255,255,255,.08)",borderTop:`3px solid ${accent}` }}>
        <div>
          <div className="sc-display font-bold text-xl text-white leading-none">{title}</div>
          {sub&&<div className="text-sm mt-1" style={{ color:"#64748b" }}>{sub}</div>}
        </div>
        <button onClick={onClose} className="ml-4 mt-0.5" style={{ color:"#475569" }}><X size={22}/></button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function PotMeter({ potTotal }:{ potTotal:number }) {
  const MAX=5000, fill=Math.min(100,(potTotal/MAX)*100);
  return (
    <div className="sc-glass rounded-2xl p-4 mb-4"
      style={{ border:"1px solid rgba(251,191,36,.35)",boxShadow:"0 0 28px rgba(251,191,36,.1)" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy size={16} style={{ color:"#fbbf24" }}/>
          <span className="sc-display font-bold text-sm text-white tracking-widest">LIVE PRIZE POT</span>
        </div>
        <div className="sc-pot-pulse sc-display font-bold text-2xl" style={{ color:"#fbbf24" }}>${fmt$(potTotal)}</div>
      </div>
      <div className="relative w-full h-5 rounded-full overflow-hidden mb-1"
        style={{ background:"rgba(255,255,255,.08)",border:"1px solid rgba(251,191,36,.2)" }}>
        <div className="absolute left-0 top-0 h-full transition-all duration-700"
          style={{ width:`${fill*.70}%`,background:"linear-gradient(90deg,#f59e0b,#fbbf24)",borderRadius:"9999px 0 0 9999px" }}/>
        <div className="absolute top-0 h-full transition-all duration-700"
          style={{ left:`${fill*.70}%`,width:`${fill*.30}%`,background:"linear-gradient(90deg,#8b5cf6,#a78bfa)",borderRadius:fill>.99?"0 9999px 9999px 0":"0" }}/>
        {fill>5&&<div className="absolute top-0 h-full w-px" style={{ left:`${fill*.70}%`,background:"rgba(0,0,0,.5)" }}/>}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-black text-white" style={{ textShadow:"0 1px 4px rgba(0,0,0,.8)" }}>
            {fill.toFixed(0)}% OF ${MAX.toLocaleString()} GOAL
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="rounded-xl p-3" style={{ background:"rgba(251,191,36,.1)",border:"1px solid rgba(251,191,36,.25)" }}>
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background:"#fbbf24" }}/>
            <span className="text-[10px] font-black tracking-widest" style={{ color:"#fbbf24" }}>70% WINNER</span>
          </div>
          <div className="sc-display font-bold text-xl text-white">${fmt$(potTotal*.70)}</div>
        </div>
        <div className="rounded-xl p-3" style={{ background:"rgba(139,92,246,.1)",border:"1px solid rgba(139,92,246,.25)" }}>
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background:"#a78bfa" }}/>
            <span className="text-[10px] font-black tracking-widest" style={{ color:"#a78bfa" }}>30% PLANNER</span>
          </div>
          <div className="sc-display font-bold text-xl text-white">${fmt$(potTotal*.30)}</div>
        </div>
      </div>
      <p className="text-center text-[10px] mt-2 font-semibold" style={{ color:"#475569" }}>Fueled by Power Votes · Updates live</p>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type AppView  = "prelanding"|"live"|"admin";
type TabId    = "battle"|"vip"|"request"|"screen";
type ModalId  = "none"|"vote"|"agenda"|"profile"|"contribute"|"ask"|"payment"|"sendscreen"|"adminlogin";
type AdminTab = "overview"|"control"|"tickets"|"revenue";

interface Question { id:number;text:string;author:string;time:string;votes:number;voted:boolean;answered:boolean;answer?:string;birthday?:boolean; }
interface ScreenMsg { id:number;text:string;author:string;time:string;live:boolean; premium?:boolean; }

// ─── Pre-Event Landing ────────────────────────────────────────────────────────

function PreEvent({ onEnterLive, onAdmin }:{ onEnterLive:()=>void; onAdmin:()=>void }) {
  const [countdown, setCountdown] = useState({ h:2, m:34, s:12 });
  const [selTicket, setSelTicket] = useState<string|null>(null);
  const [purchased, setPurchased] = useState<string[]>([]);

  useEffect(()=>{
    const iv = setInterval(()=>{
      setCountdown(c=>{
        let {h,m,s}=c;
        s--; if(s<0){s=59;m--;} if(m<0){m=59;h--;} if(h<0){h=0;m=0;s=0;}
        return {h,m,s};
      });
    },1000);
    return ()=>clearInterval(iv);
  },[]);

  const pad=(n:number)=>String(n).padStart(2,"0");

  return (
    <div className="sc-fadeup">
      {/* Header */}
      <header className="sc-glass sticky top-0 z-50 px-5 py-3.5 flex items-center justify-between"
        style={{ borderBottom:"1px solid rgba(217,70,239,.2)",boxShadow:"0 4px 32px rgba(0,0,0,.5)" }}>
        <div className="flex items-center gap-2">
          <div className="sc-display font-bold text-[1.45rem] tracking-wide flex items-center gap-2">
            <Headphones size={18} style={{ color:"#c084fc" }}/>
            <span style={{ color:"#fff" }}>SOUND</span>
            <span style={{ color:"#06b6d4" }}>CLASH</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[9px] font-black px-2 py-1 rounded-full" style={{ border:"1px solid rgba(255,255,255,.12)",color:"#64748b" }}>
            PRE-EVENT
          </div>
          <button className="p-2 rounded-full sc-tap" style={{ color:"#475569" }} onClick={onAdmin}>
            <Settings size={18}/>
          </button>
        </div>
      </header>

      <div className="px-5 pt-6 pb-24">

        {/* Hero */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-black tracking-widest"
            style={{ background:"rgba(6,182,212,.12)",border:"1px solid rgba(6,182,212,.3)",color:"#06b6d4" }}>
            <QrCode size={12}/> SCAN COMPLETE · YOU&apos;RE IN
          </div>
          <div className="sc-display font-bold leading-none mb-2" style={{ fontSize:"clamp(3.2rem,16vw,4rem)" }}>
            <span style={{ color:"#fff" }}>DJ BATTLE</span>
          </div>
          <div className="sc-display font-bold text-2xl mb-1" style={{ color:"#d946ef" }}>GRAND FINALS</div>
          <div className="text-xs font-bold tracking-widest mb-6" style={{ color:"#64748b" }}>FEB 28 · VELVET ROOM · DOORS 9PM</div>
        </div>

        {/* Countdown */}
        <div className="sc-glass rounded-2xl p-5 mb-6 text-center"
          style={{ border:"1px solid rgba(217,70,239,.25)",boxShadow:"0 0 40px rgba(217,70,239,.1)" }}>
          <p className="text-xs font-black tracking-widest mb-3" style={{ color:"#64748b" }}>EVENT STARTS IN</p>
          <div className="flex items-center justify-center gap-3">
            {[{ val:countdown.h,lbl:"HRS" },{ val:countdown.m,lbl:"MIN" },{ val:countdown.s,lbl:"SEC" }].map((u,i)=>(
              <div key={u.lbl} className="flex items-center gap-3">
                {i>0 && <span className="sc-display font-bold text-3xl" style={{ color:"rgba(217,70,239,.5)" }}>:</span>}
                <div className="text-center">
                  <div className="sc-display font-bold text-5xl text-white leading-none">{pad(u.val)}</div>
                  <div className="text-[9px] font-black tracking-widest mt-1" style={{ color:"#475569" }}>{u.lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waveform */}
        <div className="mb-6"><Waveform color="#7c3aed" bars={28} h={24}/></div>

        {/* Artist lineup */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="sc-display font-bold text-base text-white tracking-wide">TONIGHT'S LINEUP</span>
            <span className="text-xs font-bold" style={{ color:"#475569" }}>6 DJS · 3 ROUNDS</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {CONTESTANTS.map(c=>(
              <div key={c.name} className="flex-shrink-0 text-center">
                <div className="w-16 h-16 rounded-full bg-cover bg-center mb-2 mx-auto"
                  style={{ backgroundImage:`url('${c.img}')`,border:`2px solid ${c.live?"#d946ef":"rgba(255,255,255,.15)"}` }}/>
                <div className="sc-display font-bold text-sm text-white leading-none">{c.name}</div>
                <div className="text-[9px] font-semibold mt-0.5" style={{ color:c.live?"#d946ef":"#475569" }}>
                  {c.live?"FINALIST":"COMPETING"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket tiers */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Ticket size={15} style={{ color:"#d946ef" }}/>
            <span className="sc-display font-bold text-base text-white tracking-wide">GET YOUR TICKETS</span>
          </div>
          <div className="space-y-3">
            {TICKET_TIERS.map(t=>{
              const bought = purchased.includes(t.id);
              return (
                <div key={t.id} className="sc-tap rounded-2xl p-4"
                  style={{
                    background: selTicket===t.id?"rgba(217,70,239,.1)":"rgba(255,255,255,.04)",
                    border: bought?`1px solid ${t.color}`:selTicket===t.id?"1px solid rgba(217,70,239,.5)":"1px solid rgba(255,255,255,.09)",
                  }}
                  onClick={()=>!bought&&setSelTicket(t.id)}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-black text-white text-base">{t.name}</div>
                      <div className="sc-display font-bold text-2xl" style={{ color:t.color }}>${t.price}</div>
                    </div>
                    {bought
                      ? <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black" style={{ background:"rgba(16,185,129,.2)",color:"#10b981",border:"1px solid rgba(16,185,129,.4)" }}>
                          <Check size={11}/> PURCHASED
                        </div>
                      : <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                          style={{ borderColor:selTicket===t.id?t.color:"rgba(255,255,255,.2)",background:selTicket===t.id?t.color:"transparent" }}>
                          {selTicket===t.id&&<Check size={11} className="text-white"/>}
                        </div>
                    }
                  </div>
                  <div className="space-y-1">
                    {t.perks.map(p=>(
                      <div key={p} className="flex items-center gap-2 text-xs" style={{ color:"#94a3b8" }}>
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background:t.color }}/>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="mt-4 w-full py-4 rounded-2xl text-white font-black text-sm tracking-widest uppercase sc-btn flex items-center justify-center gap-2"
            onClick={()=>{
              if(selTicket){ setPurchased(p=>[...p,selTicket]); setSelTicket(null); }
            }}>
            <Ticket size={16}/> {selTicket ? `BUY ${TICKET_TIERS.find(t=>t.id===selTicket)?.name.toUpperCase()}` : "SELECT A TICKET"}
          </button>
        </div>

        {/* Enter live event */}
        <button className="w-full py-4 rounded-2xl font-black text-sm tracking-widest uppercase flex items-center justify-center gap-2"
          style={{ border:"1px solid rgba(217,70,239,.35)",color:"#d946ef",background:"rgba(217,70,239,.08)" }}
          onClick={onEnterLive}>
          <Radio size={16}/> ENTER LIVE EVENT →
        </button>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center py-3 gap-2"
        style={{ background:"rgba(4,1,12,.95)",borderTop:"1px solid rgba(255,255,255,.06)" }}>
        <span className="text-[10px] font-semibold" style={{ color:"#334155" }}>Powered by</span>
        <span className="sc-display font-bold text-sm tracking-widest" style={{ color:"#d946ef" }}>9LMNTS STUDIO</span>
        <span className="text-[10px] font-semibold" style={{ color:"#334155" }}>· soundclashos.com</span>
      </div>
    </div>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────

function AdminPanel({ onBack, potTotal, audience, totalVotes }:
  { onBack:()=>void; potTotal:number; audience:number; totalVotes:number }) {
  const [adminTab, setAdminTab] = useState<AdminTab>("overview");
  const [eventLive, setEventLive] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [checkedIn, setCheckedIn] = useState(47+12+3);

  const ticketRevenue = TICKET_TIERS.reduce((s,t)=>s+t.price*t.sold, 0);
  const voteRevenue   = Math.round(potTotal * 0.78);   // ~78% came from power votes
  const totalRevenue  = ticketRevenue + voteRevenue;
  const platformFee   = totalRevenue * 0.12;           // 9LMNTS 12% platform fee
  const plannerNet    = totalRevenue - platformFee;

  return (
    <div className="sc-admin-in">
      {/* Admin header */}
      <header className="sc-glass-admin sticky top-0 z-50 px-5 py-4 flex items-center justify-between"
        style={{ borderBottom:"1px solid rgba(217,70,239,.2)" }}>
        <button className="flex items-center gap-2 sc-tap" style={{ color:"#64748b" }} onClick={onBack}>
          <ArrowLeft size={18}/><span className="text-sm font-bold">BACK</span>
        </button>
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} style={{ color:"#d946ef" }}/>
          <span className="sc-display font-bold text-base text-white tracking-widest">ADMIN PANEL</span>
        </div>
        <div className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background:"rgba(217,70,239,.15)",color:"#d946ef",border:"1px solid rgba(217,70,239,.3)" }}>
          9LMNTS
        </div>
      </header>

      {/* Admin tabs */}
      <div className="px-5 pt-4">
        <div className="sc-glass rounded-xl flex gap-0.5 p-1 mb-4"
          style={{ border:"1px solid rgba(217,70,239,.18)" }}>
          {([
            { id:"overview" as AdminTab, icon:<BarChart2  size={12}/>, label:"OVERVIEW" },
            { id:"control"  as AdminTab, icon:<Radio      size={12}/>, label:"LIVE CTRL" },
            { id:"tickets"  as AdminTab, icon:<Ticket     size={12}/>, label:"TICKETS"   },
            { id:"revenue"  as AdminTab, icon:<TrendingUp size={12}/>, label:"REVENUE"   },
          ]).map(t=>(
            <button key={t.id}
              className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-lg font-black transition-all"
              style={{ fontSize:9,background:adminTab===t.id?"rgba(217,70,239,.2)":"transparent",
                color:adminTab===t.id?"#fff":"#475569",
                borderBottom:adminTab===t.id?"2px solid #d946ef":"2px solid transparent" }}
              onClick={()=>setAdminTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {adminTab==="overview" && (
          <div className="sc-fadeup space-y-3 pb-6">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon:<DollarSign size={18}/>, val:`$${fmt$(totalRevenue)}`, lbl:"Total Revenue",   color:"#10b981" },
                { icon:<Users      size={18}/>, val:audience.toLocaleString(), lbl:"Live Audience",  color:"#06b6d4" },
                { icon:<Flame      size={18}/>, val:totalVotes.toLocaleString(), lbl:"Total Votes",  color:"#d946ef" },
                { icon:<Trophy     size={18}/>, val:`$${fmt$(potTotal)}`,      lbl:"Prize Pot",      color:"#fbbf24" },
              ].map(s=>(
                <div key={s.lbl} className="sc-glass rounded-2xl p-4"
                  style={{ border:`1px solid ${s.color}22` }}>
                  <div className="mb-2" style={{ color:s.color }}>{s.icon}</div>
                  <div className="sc-display font-bold text-2xl text-white leading-none">{s.val}</div>
                  <div className="text-xs font-bold mt-1" style={{ color:"#475569" }}>{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Ticket summary */}
            <div className="sc-glass rounded-2xl p-4" style={{ border:"1px solid rgba(255,255,255,.08)" }}>
              <div className="sc-display font-bold text-sm text-white tracking-wide mb-3">TICKET SALES SUMMARY</div>
              {TICKET_TIERS.map(t=>(
                <div key={t.id} className="flex items-center justify-between py-2.5"
                  style={{ borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background:t.color }}/>
                    <span className="text-sm font-bold text-white">{t.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-white">{t.sold} sold</div>
                    <div className="text-xs" style={{ color:"#475569" }}>${(t.price*t.sold).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Check-ins */}
            <div className="sc-glass rounded-2xl p-4 flex items-center justify-between"
              style={{ border:"1px solid rgba(16,185,129,.22)" }}>
              <div className="flex items-center gap-3">
                <Check size={18} style={{ color:"#10b981" }}/>
                <div>
                  <div className="font-black text-white">Checked In</div>
                  <div className="text-xs" style={{ color:"#64748b" }}>of {TICKET_TIERS.reduce((s,t)=>s+t.sold,0)} tickets sold</div>
                </div>
              </div>
              <div className="sc-display font-bold text-3xl" style={{ color:"#10b981" }}>{checkedIn}</div>
            </div>
          </div>
        )}

        {/* LIVE CONTROL */}
        {adminTab==="control" && (
          <div className="sc-fadeup space-y-3 pb-6">
            {/* Event status toggle */}
            <div className="sc-glass rounded-2xl p-4 flex items-center justify-between"
              style={{ border:`1px solid ${eventLive?"rgba(217,70,239,.4)":"rgba(255,255,255,.1)"}` }}>
              <div>
                <div className="font-black text-white mb-0.5">Event Status</div>
                <div className="text-xs font-bold" style={{ color:eventLive?"#d946ef":"#475569" }}>
                  {eventLive?"● BROADCASTING LIVE":"○ STANDBY"}
                </div>
              </div>
              <button className="sc-tap" onClick={()=>setEventLive(v=>!v)}>
                {eventLive
                  ? <ToggleRight size={44} style={{ color:"#d946ef" }}/>
                  : <ToggleLeft  size={44} style={{ color:"#334155" }}/>}
              </button>
            </div>

            {/* Round selector */}
            <div className="sc-glass rounded-2xl p-4" style={{ border:"1px solid rgba(255,255,255,.08)" }}>
              <div className="font-black text-white mb-3">Current Round</div>
              <div className="flex gap-2">
                {[1,2,3].map(r=>(
                  <button key={r} className="flex-1 py-3 rounded-xl font-black text-sm transition-all"
                    style={{
                      background:currentRound===r?"rgba(217,70,239,.2)":"rgba(255,255,255,.04)",
                      border:currentRound===r?"1px solid rgba(217,70,239,.5)":"1px solid rgba(255,255,255,.08)",
                      color:currentRound===r?"#fff":"#475569",
                    }}
                    onClick={()=>setCurrentRound(r)}>
                    RD {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured match */}
            <div className="sc-glass rounded-2xl p-4" style={{ border:"1px solid rgba(255,255,255,.08)" }}>
              <div className="font-black text-white mb-3">Live Battle</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 text-center sc-glass-light rounded-xl py-3"
                  style={{ border:"1px solid rgba(217,70,239,.3)" }}>
                  <div className="sc-display font-bold text-lg text-white">DJ K-OS</div>
                </div>
                <div className="sc-display font-bold text-xl" style={{ color:"#d946ef" }}>VS</div>
                <div className="flex-1 text-center sc-glass-light rounded-xl py-3"
                  style={{ border:"1px solid rgba(6,182,212,.3)" }}>
                  <div className="sc-display font-bold text-lg text-white">DJ VIBE</div>
                </div>
              </div>
            </div>

            {/* Big screen control */}
            <div className="sc-glass rounded-2xl p-4" style={{ border:"1px solid rgba(6,182,212,.22)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Tv2 size={15} style={{ color:"#06b6d4" }}/>
                <div className="font-black text-white">Big Screen</div>
              </div>
              <div className="space-y-2">
                {["Show Live Vote Results","Display Prize Pot Meter","Feature Q&A Messages","Roll Credits"].map(action=>(
                  <button key={action}
                    className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-left flex items-center justify-between sc-tap"
                    style={{ background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",color:"#94a3b8" }}>
                    {action}<ChevronRight size={14}/>
                  </button>
                ))}
              </div>
            </div>

            {/* End event */}
            <button className="w-full py-4 rounded-2xl font-black text-sm tracking-wider uppercase"
              style={{ background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.3)",color:"#ef4444" }}>
              ⬛ END EVENT & DECLARE WINNER
            </button>
          </div>
        )}

        {/* TICKETS */}
        {adminTab==="tickets" && (
          <div className="sc-fadeup space-y-3 pb-6">
            <div className="sc-glass rounded-2xl p-4" style={{ border:"1px solid rgba(255,255,255,.08)" }}>
              <div className="sc-display font-bold text-sm text-white tracking-wide mb-1">PRE-EVENT SALES</div>
              <div className="text-xs mb-4" style={{ color:"#64748b" }}>Scanned QR: {checkedIn} of {TICKET_TIERS.reduce((s,t)=>s+t.sold,0)} checked in</div>
              {TICKET_TIERS.map(t=>{
                const pct = Math.round(t.sold/80*100);
                return (
                  <div key={t.id} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background:t.color }}/>
                        <span className="font-bold text-sm text-white">{t.name}</span>
                      </div>
                      <span className="text-xs font-black" style={{ color:t.color }}>${t.price} · {t.sold} sold</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,.08)" }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width:`${pct}%`,background:t.color,opacity:.85 }}/>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px]" style={{ color:"#475569" }}>Revenue: <strong style={{ color:"#fff" }}>${(t.price*t.sold).toLocaleString()}</strong></span>
                      <span className="text-[10px]" style={{ color:"#475569" }}>{pct}% capacity</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Power votes breakdown */}
            <div className="sc-glass rounded-2xl p-4" style={{ border:"1px solid rgba(217,70,239,.22)" }}>
              <div className="sc-display font-bold text-sm text-white tracking-wide mb-3">POWER VOTE PACKS SOLD</div>
              {POWER_PACKS.map(p=>{
                const sold = Math.floor(Math.random()*30+10);
                return (
                  <div key={p.votes} className="flex items-center justify-between py-2.5"
                    style={{ borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                    <div>
                      <span className="font-bold text-white text-sm">{p.votes} votes · ${p.amount}</span>
                      <span className="ml-2 text-xs" style={{ color:"#64748b" }}>{p.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-white text-sm">{sold} sold</div>
                      <div className="text-xs" style={{ color:"#475569" }}>${(p.amount*sold).toLocaleString()}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* REVENUE */}
        {adminTab==="revenue" && (
          <div className="sc-fadeup space-y-3 pb-6">
            {/* Total breakdown */}
            <div className="sc-glass rounded-2xl p-4" style={{ border:"1px solid rgba(16,185,129,.22)" }}>
              <div className="sc-display font-bold text-sm text-white tracking-wide mb-3">REVENUE BREAKDOWN</div>
              {[
                { lbl:"Ticket Sales",   val:ticketRevenue,  color:"#06b6d4" },
                { lbl:"Power Votes",    val:voteRevenue,    color:"#d946ef" },
              ].map(r=>(
                <div key={r.lbl} className="flex justify-between items-center py-2.5"
                  style={{ borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background:r.color }}/>
                    <span className="text-sm font-bold text-white">{r.lbl}</span>
                  </div>
                  <span className="font-black" style={{ color:r.color }}>${r.val.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3">
                <span className="font-black text-white">GROSS TOTAL</span>
                <span className="sc-display font-bold text-xl" style={{ color:"#10b981" }}>${fmt$(totalRevenue)}</span>
              </div>
            </div>

            {/* Prize pot split */}
            <div className="sc-glass rounded-2xl p-4" style={{ border:"1px solid rgba(251,191,36,.25)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={14} style={{ color:"#fbbf24" }}/>
                <div className="sc-display font-bold text-sm text-white tracking-wide">PRIZE POT SPLIT</div>
              </div>
              <div className="text-center mb-3">
                <div className="sc-display font-bold text-3xl" style={{ color:"#fbbf24" }}>${fmt$(potTotal)}</div>
                <div className="text-xs" style={{ color:"#64748b" }}>Total accumulated from Power Votes</div>
              </div>
              {[
                { lbl:"70% → Winner DJ",       val:potTotal*.70, color:"#fbbf24" },
                { lbl:"30% → Event Planner",   val:potTotal*.30, color:"#a78bfa" },
              ].map(r=>(
                <div key={r.lbl} className="flex justify-between items-center py-2.5"
                  style={{ borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                  <span className="text-sm font-bold" style={{ color:"#94a3b8" }}>{r.lbl}</span>
                  <span className="font-black" style={{ color:r.color }}>${fmt$(r.val)}</span>
                </div>
              ))}
            </div>

            {/* 9LMNTS platform fee */}
            <div className="sc-glass rounded-2xl p-4" style={{ border:"1px solid rgba(217,70,239,.22)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="sc-display font-bold text-sm tracking-widest" style={{ color:"#d946ef" }}>9LMNTS STUDIO</div>
                <div className="text-[10px] px-2 py-0.5 rounded-full font-black" style={{ background:"rgba(217,70,239,.15)",color:"#d946ef",border:"1px solid rgba(217,70,239,.3)" }}>LICENSED</div>
              </div>
              <div className="flex justify-between items-center py-2"
                style={{ borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                <span className="text-sm font-bold text-white">Platform License Fee (12%)</span>
                <span className="font-black" style={{ color:"#d946ef" }}>−${fmt$(platformFee)}</span>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="font-black text-white">Your Net (Event Planner)</span>
                <span className="sc-display font-bold text-xl" style={{ color:"#10b981" }}>${fmt$(plannerNet)}</span>
              </div>
              <p className="text-[10px] mt-3 text-center" style={{ color:"#334155" }}>
                soundclashos.com · support@9lmnts.studio
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Admin Login Modal ────────────────────────────────────────────────────────

function AdminLogin({ onSuccess, onClose }:{ onSuccess:()=>void; onClose:()=>void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const PASS = "9LMNTS";

  const attempt = () => {
    if (code.toUpperCase()===PASS) { onSuccess(); }
    else { setError(true); setCode(""); setTimeout(()=>setError(false),1500); }
  };

  return (
    <Sheet title="ADMIN ACCESS" sub="9LMNTS Studio Operator Login" accent="#d946ef" onClose={onClose}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background:"rgba(217,70,239,.15)",border:"1px solid rgba(217,70,239,.35)" }}>
          <ShieldCheck size={28} style={{ color:"#d946ef" }}/>
        </div>
        <p className="text-sm" style={{ color:"#64748b" }}>Enter your operator access code to continue.</p>
      </div>
      <input
        type="password"
        className="w-full py-4 px-5 rounded-2xl text-white text-center text-lg font-black tracking-[0.4em] outline-none mb-2"
        style={{ background:"rgba(255,255,255,.06)",border:`1px solid ${error?"#ef4444":"rgba(255,255,255,.12)"}` }}
        placeholder="••••••"
        value={code}
        maxLength={6}
        onChange={e=>setCode(e.target.value)}
        onKeyDown={e=>e.key==="Enter"&&attempt()}
      />
      {error && <p className="text-center text-xs text-red-400 mb-3">Incorrect code. Try again.</p>}
      <button className="sc-btn w-full py-4 rounded-2xl text-white font-black tracking-widest mt-2 flex items-center justify-center gap-2"
        onClick={attempt}>
        <Lock size={16}/> UNLOCK ADMIN
      </button>
      <p className="text-center text-xs mt-4" style={{ color:"#334155" }}>
        Only 9LMNTS Studio operators have access.
      </p>
    </Sheet>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [appView,    setAppView]   = useState<AppView>("prelanding");
  const [tab,        setTab]       = useState<TabId>("battle");
  const [modal,      setModal]     = useState<ModalId>("none");
  const [voteTarget, setVoteTarget]= useState("");
  const [voteTab,    setVoteTab]   = useState<"free"|"power">("free");
  const [powerPack,  setPowerPack] = useState<{ votes:number;amount:number }|null>(null);
  const [djVotes,    setDjVotes]   = useState({ "DJ K-OS":4890,"DJ VIBE":5052 });
  const [totalVotes, setTotalVotes]= useState(8942);
  const [audience,   setAudience]  = useState(1247);
  const [potTotal,   setPotTotal]  = useState(1284.50);
  const [questions,  setQuestions] = useState<Question[]>([
    { id:1, text:"Daft Punk - One More Time",  author:"Anonymous",   time:"2m ago",  votes:142, voted:true,  answered:true,  answer:"Added to queue!" },
    { id:2, text:"Flume - Never Be Like You",  author:"Mike",        time:"15m ago", votes:89,  voted:false, answered:false },
    { id:3, text:"Calvin Harris - Summer",     author:"VIP Table 3", time:"25m ago", votes:67,  voted:false, answered:true,  answer:"Playing next!" },
  ]);
  const [screenMsgs, setScreenMsgs]= useState<ScreenMsg[]>(INIT_SCREEN_MSGS);
  const [screenIdx,  setScreenIdx] = useState(0);
  const [screenInput,setScreenInput]=useState("");
  const [profiles,   setProfiles]  = useState(VIP_PROFILES);
  const [selProfile, setSelProfile]= useState<typeof VIP_PROFILES[0]|null>(null);
  const [selTier,    setSelTier]   = useState<{ price:number;label:string }|null>(null);
  const [payData,    setPayData]   = useState<{ title:string;amount:number }|null>(null);
  const [reqText,    setReqText]   = useState("");
  const [anon,       setAnon]      = useState(false);
  const [bday,       setBday]      = useState(false);
  const [premiumMsg, setPremiumMsg]= useState(false);
  const [fires,      setFires]     = useState<{ id:number;x:number;y:number }[]>([]);
  const [notifs,     setNotifs]    = useState({ battle:3,vip:8,request:0,screen:2 });

  // Big screen rotation
  useEffect(()=>{
    const iv=setInterval(()=>setScreenIdx(i=>(i+1)%screenMsgs.length),6000);
    return ()=>clearInterval(iv);
  },[screenMsgs.length]);

  // Live counters
  useEffect(()=>{
    const iv=setInterval(()=>{
      setAudience(p=>Math.max(1200,p+Math.floor(Math.random()*5-2)));
      setTotalVotes(p=>p+Math.floor(Math.random()*8+1));
      setPotTotal(p=>+(p+Math.random()*1.5).toFixed(2));
    },3000);
    return ()=>clearInterval(iv);
  },[]);

  const spawnFire = useCallback((e?:React.MouseEvent)=>{
    const x=e?e.clientX:window.innerWidth/2, y=e?e.clientY:window.innerHeight*.6;
    const id=Date.now()+Math.random();
    setFires(p=>[...p,{id,x,y}]);
    setTimeout(()=>setFires(p=>p.filter(f=>f.id!==id)),1400);
  },[]);

  const openVote=(dj:string)=>{ setVoteTarget(dj);setVoteTab("free");setPowerPack(null);setModal("vote"); };
  const castFree=(e:React.MouseEvent)=>{ spawnFire(e);setDjVotes(p=>({...p,[voteTarget]:(p[voteTarget as keyof typeof p]??0)+1}));setTotalVotes(p=>p+1);setModal("none"); };
  const castPower=(e:React.MouseEvent)=>{ if(!powerPack)return;spawnFire(e);setDjVotes(p=>({...p,[voteTarget]:(p[voteTarget as keyof typeof p]??0)+powerPack.votes}));setTotalVotes(p=>p+powerPack.votes);setPotTotal(p=>+(p+powerPack.amount).toFixed(2));setPayData({title:`${powerPack.votes} Power Votes for ${voteTarget}`,amount:powerPack.amount});setModal("payment"); };
  const getPct=(dj:string)=>{ const t=djVotes["DJ K-OS"]+djVotes["DJ VIBE"];return t>0?Math.round(((djVotes[dj as keyof typeof djVotes]??0)/t)*100):50; };
  const toggleQ=(id:number)=>setQuestions(p=>p.map(q=>q.id===id?{...q,votes:q.voted?q.votes-1:q.votes+1,voted:!q.voted}:q));
  const submitReq=()=>{ if(!reqText.trim())return;setQuestions(p=>[{id:Date.now(),text:reqText,author:anon?"Anonymous":"You",time:"Just now",votes:0,voted:false,answered:false,birthday:bday},...p]);setReqText("");setAnon(false);setBday(false);setModal("none"); };
  const sendToScreen=()=>{ if(!screenInput.trim())return;const msg:ScreenMsg={id:Date.now(),text:screenInput.trim(),author:"@you",time:"Just now",live:true,premium:premiumMsg};if(premiumMsg){setPotTotal(p=>+(p+3).toFixed(2));setPayData({title:"Premium Neon Shoutout",amount:3});setModal("payment");setTimeout(()=>{setScreenMsgs(p=>[msg,...p]);setScreenIdx(0);},1500);}else{setScreenMsgs(p=>[msg,...p]);setScreenIdx(0);}setScreenInput("");setPremiumMsg(false);if(!premiumMsg)setModal("none"); };
  const toggleConnect=(id:number,e?:React.MouseEvent)=>{ e?.stopPropagation();setProfiles(p=>p.map(x=>x.id===id?{...x,connected:!x.connected}:x));setSelProfile(p=>p&&p.id===id?{...p,connected:!p.connected}:p); };
  const doContribute=()=>{ if(!selTier)return;setPotTotal(p=>+(p+selTier.price*.5).toFixed(2));setPayData({title:selTier.label,amount:selTier.price});setModal("payment"); };
  const switchTab=(t:TabId)=>{ setTab(t);setNotifs(p=>({...p,[t]:0})); };

  const kPct=getPct("DJ K-OS"), vPct=getPct("DJ VIBE");
  const liveMsg=screenMsgs[screenIdx]??screenMsgs[0];

  // ── PRE-LANDING ──
  if (appView==="prelanding") return (
    <>
      <style dangerouslySetInnerHTML={{ __html:GLOBAL_CSS }}/>
      <div style={{ position:"fixed",inset:0,zIndex:0,backgroundImage:`url('${BG}')`,backgroundSize:"cover",backgroundPosition:"center top" }}/>
      <div style={{ position:"fixed",inset:0,zIndex:1,background:"linear-gradient(180deg,rgba(4,1,14,.86) 0%,rgba(4,1,14,.78) 40%,rgba(4,1,14,.9) 100%)" }}/>
      <div className="sc-body relative" style={{ zIndex:2,minHeight:"100vh" }}>
        <div className="w-full max-w-md mx-auto">
          <PreEvent
            onEnterLive={()=>setAppView("live")}
            onAdmin={()=>setModal("adminlogin")}
          />
        </div>
      </div>
      {modal==="adminlogin"&&(
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
          style={{ background:"rgba(0,0,0,.9)",backdropFilter:"blur(12px)" }}
          onClick={e=>{if(e.target===e.currentTarget)setModal("none");}}>
          <AdminLogin onSuccess={()=>{setModal("none");setAppView("admin");}} onClose={()=>setModal("none")}/>
        </div>
      )}
    </>
  );

  // ── ADMIN ──
  if (appView==="admin") return (
    <>
      <style dangerouslySetInnerHTML={{ __html:GLOBAL_CSS }}/>
      <div style={{ position:"fixed",inset:0,zIndex:0,backgroundImage:`url('${BG}')`,backgroundSize:"cover",backgroundPosition:"center top" }}/>
      <div style={{ position:"fixed",inset:0,zIndex:1,background:"rgba(4,1,12,.92)" }}/>
      <div className="sc-body relative" style={{ zIndex:2,minHeight:"100vh" }}>
        <div className="w-full max-w-md mx-auto">
          <AdminPanel
            onBack={()=>setAppView("live")}
            potTotal={potTotal}
            audience={audience}
            totalVotes={totalVotes}
          />
        </div>
      </div>
    </>
  );

  // ── LIVE EVENT ──
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html:GLOBAL_CSS }}/>
      <div style={{ position:"fixed",inset:0,zIndex:0,backgroundImage:`url('${BG}')`,backgroundSize:"cover",backgroundPosition:"center top" }}/>
      <div style={{ position:"fixed",inset:0,zIndex:1,background:"linear-gradient(180deg,rgba(4,1,14,.82) 0%,rgba(4,1,14,.75) 40%,rgba(4,1,14,.88) 100%)" }}/>
      {fires.map(f=><div key={f.id} className="sc-fire" style={{ left:f.x-16,top:f.y-16 }}>🔥</div>)}

      <div className="sc-body relative flex justify-center" style={{ zIndex:2,minHeight:"100vh" }}>
        <div className="w-full max-w-md flex flex-col" style={{ paddingBottom:86 }}>

          {/* HEADER */}
          <header className="sc-glass sticky top-0 z-50"
            style={{ borderBottom:"1px solid rgba(217,70,239,.22)",boxShadow:"0 4px 32px rgba(0,0,0,.5)" }}>
            <div className="flex items-center justify-between px-5 py-3.5">
              <div className="sc-display font-bold text-[1.6rem] tracking-wide flex items-center gap-2.5">
                <Headphones size={20} style={{ color:"#c084fc" }}/>
                <span style={{ color:"#fff" }}>SOUND</span>
                <span style={{ color:"#06b6d4" }}>CLASH</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ color:"#67e8f9",border:"1px solid rgba(6,182,212,.28)",background:"rgba(6,182,212,.1)" }}>
                  12:45 LEFT
                </div>
                <div className="sc-glow flex items-center gap-1.5 text-white font-black text-xs px-3 py-1.5 rounded-full"
                  style={{ background:"linear-gradient(135deg,#d946ef,#a855f7)" }}>
                  <span className="sc-blink">●</span> LIVE
                </div>
                <button className="p-1.5 sc-tap rounded-full" style={{ color:"#334155" }} onClick={()=>setModal("adminlogin")}>
                  <Settings size={16}/>
                </button>
              </div>
            </div>
            <div className="overflow-hidden py-2" style={{ borderTop:"1px solid rgba(217,70,239,.14)",background:"rgba(0,0,0,.25)" }}>
              <div className="sc-ticker whitespace-nowrap inline-block">
                {[...TICKER,...TICKER].map((msg,i)=>(
                  <span key={i} className="text-xs font-semibold mx-6" style={{ color:i%2===0?"#c084fc":"#67e8f9" }}>{msg}</span>
                ))}
              </div>
            </div>
          </header>

          {/* HERO */}
          <section className="px-5 pt-6 pb-4">
            <p className="text-center text-xs font-bold tracking-[.22em] mb-4" style={{ color:"#06b6d4" }}>
              GRAND FINALS · FEB 28 · VELVET ROOM
            </p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {/* K-OS */}
              <div className="sc-glass sc-card-pink rounded-2xl overflow-hidden sc-border-pink">
                <div className="h-32 bg-cover bg-center bg-top"
                  style={{ backgroundImage:"url('https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80')" }}>
                  <div className="h-full flex items-end p-3"
                    style={{ background:"linear-gradient(0deg,rgba(4,1,14,.9) 0%,transparent 60%)" }}>
                    <div>
                      <div className="sc-display font-bold text-xl text-white leading-none">DJ K-OS</div>
                      <div className="text-xs mt-0.5" style={{ color:"#c084fc" }}>Electronic / Techno</div>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="sc-display font-bold text-2xl" style={{ color:"#d946ef" }}>{kPct}%</span>
                    <span className="text-xs font-bold" style={{ color:"#64748b" }}>HYPE</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full mb-3" style={{ background:"rgba(255,255,255,.1)" }}>
                    <div className="h-full rounded-full transition-all duration-[1100ms]"
                      style={{ width:`${kPct}%`,background:"linear-gradient(90deg,#d946ef,#a855f7)" }}/>
                  </div>
                  <button className="sc-btn-pink w-full py-2.5 rounded-xl text-white font-black text-xs tracking-wider"
                    onClick={()=>openVote("DJ K-OS")}>🔥 HYPE</button>
                </div>
              </div>
              {/* VIBE */}
              <div className="sc-glass sc-card-cyan rounded-2xl overflow-hidden sc-border-cyan">
                <div className="h-32 bg-cover bg-center bg-top"
                  style={{ backgroundImage:"url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80')" }}>
                  <div className="h-full flex items-end p-3"
                    style={{ background:"linear-gradient(0deg,rgba(4,1,14,.9) 0%,transparent 60%)" }}>
                    <div>
                      <div className="sc-display font-bold text-xl text-white leading-none">DJ VIBE</div>
                      <div className="text-xs mt-0.5" style={{ color:"#67e8f9" }}>House / Future Bass</div>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="sc-display font-bold text-2xl" style={{ color:"#06b6d4" }}>{vPct}%</span>
                    <span className="text-xs font-bold" style={{ color:"#64748b" }}>HYPE</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full mb-3" style={{ background:"rgba(255,255,255,.1)" }}>
                    <div className="h-full rounded-full transition-all duration-[1100ms]"
                      style={{ width:`${vPct}%`,background:"linear-gradient(90deg,#06b6d4,#0ea5e9)" }}/>
                  </div>
                  <button className="sc-btn-cyan w-full py-2.5 rounded-xl text-white font-black text-xs tracking-wider"
                    onClick={()=>openVote("DJ VIBE")}>⚡ HYPE</button>
                </div>
              </div>
            </div>
            <div className="mb-5 px-1"><Waveform color="#7c3aed" bars={30} h={28}/></div>
            <PotMeter potTotal={potTotal}/>
            <div className="sc-glass-light rounded-2xl py-3 px-5 mb-4 flex justify-around"
              style={{ border:"1px solid rgba(255,255,255,.1)" }}>
              {[
                { icon:<User  size={14}/>, val:audience.toLocaleString(),   lbl:"IN THE CLUB" },
                { icon:<Flame size={14}/>, val:totalVotes.toLocaleString(), lbl:"HYPE LEVEL"  },
                { icon:<Music size={14}/>, val:"12:45",                     lbl:"SET LEFT"    },
              ].map(s=>(
                <div key={s.lbl} className="text-center">
                  <div className="flex justify-center mb-1" style={{ color:"#d946ef" }}>{s.icon}</div>
                  <div className="sc-display font-bold text-xl text-white leading-none">{s.val}</div>
                  <div className="text-[10px] font-bold mt-0.5 tracking-widest" style={{ color:"#475569" }}>{s.lbl}</div>
                </div>
              ))}
            </div>
            <button className="sc-btn w-full py-4 rounded-2xl text-white font-black text-sm tracking-widest uppercase"
              onClick={()=>{ setSelTier(null);setModal("contribute"); }}>
              🎟 GET ENTRY PASS
            </button>
          </section>

          {/* CLUB UPGRADES — 2×2 grid */}
          <section className="px-5 mb-5">
            <div className="sc-glass rounded-2xl p-4" style={{ border:"1px solid rgba(217,70,239,.22)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Crown size={14} style={{ color:"#fbbf24" }}/>
                <span className="sc-display font-bold text-sm text-white tracking-widest">CLUB UPGRADES</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {UPGRADES.map(u=>(
                  <div key={u.label} className="sc-tap rounded-xl p-4 flex flex-col relative"
                    style={{ background:u.vip?"rgba(251,191,36,.1)":"rgba(255,255,255,.05)",
                      border:u.vip?"1px solid rgba(251,191,36,.4)":"1px solid rgba(255,255,255,.1)",minHeight:110 }}
                    onClick={()=>{ setSelTier({price:u.price,label:u.label});setModal("contribute"); }}>
                    {u.vip&&<span className="self-start mb-2 text-black font-black text-[10px] px-2 py-0.5 rounded-full" style={{ background:"#fbbf24" }}>VIP</span>}
                    <div className="sc-display font-bold text-3xl text-white leading-none mb-0.5">${u.price}</div>
                    <div className="text-xs font-medium mb-3 flex-1" style={{ color:"#94a3b8" }}>{u.label}</div>
                    <button className="w-full py-2 rounded-lg text-xs font-black"
                      style={{ background:u.vip?"#fbbf24":"rgba(217,70,239,.3)",color:u.vip?"#000":"#fff",border:u.vip?"none":"1px solid rgba(217,70,239,.45)" }}>
                      {u.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TABS */}
          <div className="sticky z-40 px-5 mb-1" style={{ top:86 }}>
            <div className="sc-glass rounded-xl flex gap-0.5 p-1" style={{ border:"1px solid rgba(217,70,239,.18)" }}>
              {([
                { id:"battle"  as TabId, icon:<Flame       size={12}/>, label:"BATTLE",   n:notifs.battle  },
                { id:"vip"     as TabId, icon:<Crown       size={12}/>, label:"VIP",       n:notifs.vip     },
                { id:"request" as TabId, icon:<Music       size={12}/>, label:"REQUESTS",  n:notifs.request },
                { id:"screen"  as TabId, icon:<Tv2         size={12}/>, label:"SCREEN",    n:notifs.screen  },
              ]).map(t=>(
                <button key={t.id}
                  className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-lg font-black transition-all relative"
                  style={{ fontSize:10,background:tab===t.id?"rgba(217,70,239,.18)":"transparent",
                    color:tab===t.id?"#fff":"#475569",borderBottom:tab===t.id?"2px solid #d946ef":"2px solid transparent" }}
                  onClick={()=>switchTab(t.id)}>
                  {t.icon} {t.label}
                  {t.n>0&&<span className="absolute -top-1.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center font-black"
                    style={{ background:"#ef4444",color:"#fff",fontSize:8 }}>{t.n}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* TAB CONTENT */}
          <div className="px-5 pt-4 pb-2">
            {tab==="battle"&&(
              <div className="sc-fadeup">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="sc-glow flex items-center gap-1.5 text-white font-black text-xs px-3 py-1 rounded-full" style={{ background:"#d946ef" }}>
                    <span className="sc-blink">●</span> LIVE NOW
                  </div>
                  <span className="text-xs font-bold" style={{ color:"#475569" }}>ROUND 1 · 12:30 AM</span>
                </div>

                {/* PREDICTION / FLASH DROP */}
                <div className="sc-glass rounded-xl p-4 mb-5" style={{ border:"1px solid rgba(16,185,129,.3)", background:"linear-gradient(135deg, rgba(16,185,129,0.1), rgba(4,1,14,0))" }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} style={{ color:"#10b981" }}/>
                      <span className="sc-display font-bold text-sm tracking-widest text-white">LIVE PREDICTION</span>
                    </div>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background:"rgba(16,185,129,.2)", color:"#10b981" }}>+20 FREE VOTES</span>
                  </div>
                  <div className="text-xs font-semibold mb-3" style={{ color:"#94a3b8" }}>Which track genre will K-OS drop next?</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="sc-tap py-2 rounded-lg text-xs font-black text-white" style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)" }}>HOUSE</button>
                    <button className="sc-tap py-2 rounded-lg text-xs font-black text-white" style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)" }}>TECHNO</button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="sc-display font-bold text-base text-white tracking-wide">ALL DJs</span>
                  <span className="text-xs font-bold" style={{ color:"#475569" }}>8 DJS · $5K PRIZE</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {CONTESTANTS.map(c=>(
                    <div key={c.name} className="sc-glass-light sc-tap rounded-xl p-3 flex items-center gap-3"
                      style={{ border:c.live?"1px solid rgba(217,70,239,.3)":"1px solid rgba(255,255,255,.07)" }}
                      onClick={()=>openVote(c.name)}>
                      <div className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage:`url('${c.img}')`,border:"2px solid rgba(255,255,255,.12)" }}/>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-sm text-white truncate">{c.name}</div>
                        <div className="text-xs truncate" style={{ color:"#475569" }}>{c.round}</div>
                      </div>
                      <div className="text-[9px] font-black px-2 py-1 rounded-full flex-shrink-0"
                        style={{ color:"#d946ef",border:"1px solid rgba(217,70,239,.32)" }}>HYPE</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab==="vip"&&(
              <div className="sc-fadeup">
                <div className="flex items-center justify-between mb-4">
                  <span className="sc-display font-bold text-base text-white tracking-wide">VIP LOUNGE</span>
                  <span className="text-xs font-bold" style={{ color:"#475569" }}>124 ACTIVE · 8 NEW</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {profiles.map(p=>(
                    <div key={p.id} className="sc-glass sc-tap rounded-2xl p-4 text-center"
                      style={{ border:"1px solid rgba(255,255,255,.08)" }}
                      onClick={()=>{ setSelProfile(p);setModal("profile"); }}>
                      <div className="w-[60px] h-[60px] rounded-full mx-auto mb-3 bg-cover bg-center"
                        style={{ backgroundImage:`url('${p.img}')`,border:"2px solid rgba(217,70,239,.3)" }}/>
                      <div className="font-black text-sm text-white mb-0.5 truncate">{p.name}</div>
                      <div className="text-xs font-bold uppercase mb-4 truncate" style={{ color:"#475569" }}>{p.role}</div>
                      <button className="w-full py-2 rounded-full text-xs font-black transition-all"
                        style={p.connected
                          ?{background:"rgba(16,185,129,.18)",color:"#10b981",border:"1px solid rgba(16,185,129,.38)"}
                          :{background:"transparent",color:"#d946ef",border:"1px solid rgba(217,70,239,.38)"}}
                        onClick={e=>toggleConnect(p.id,e)}>
                        {p.connected?"✓ DRINK SENT":"BUY DRINK"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab==="request"&&(
              <div className="sc-fadeup">
                <button className="sc-btn w-full py-4 rounded-2xl text-white font-black text-sm tracking-widest uppercase mb-5 flex items-center justify-center gap-2"
                  onClick={()=>setModal("ask")}>
                  <Plus size={16}/> REQUEST A SONG
                </button>
                <div className="space-y-3">
                  {questions.map(q=>(
                    <div key={q.id} className="sc-glass rounded-xl p-4 flex gap-4"
                      style={{ border:"1px solid rgba(255,255,255,.07)" }}>
                      <button className="flex flex-col items-center min-w-[36px] pt-0.5" onClick={()=>toggleQ(q.id)}>
                        <ChevronUp size={20} style={{ color:q.voted?"#d946ef":"#334155" }}/>
                        <span className="font-black text-sm text-white">{q.votes}</span>
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-sm text-white mb-1 leading-snug">{q.text}</div>
                        <div className="text-xs mb-2" style={{ color:"#475569" }}>
                          by <span style={{ color:"#67e8f9" }}>{q.author}</span> · {q.time}
                          {q.birthday&&<span className="ml-2 px-1.5 py-0.5 rounded font-black" style={{ background:"#ef4444",color:"#fff",fontSize:9 }}>BDAY 🎂</span>}
                        </div>
                        {q.answered&&q.answer&&(
                          <div className="text-xs rounded-lg px-3 py-2" style={{ background:"rgba(255,255,255,.05)",color:"#94a3b8" }}>
                            🎵 DJ: &ldquo;{q.answer}&rdquo;
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab==="screen"&&(
              <div className="sc-fadeup">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Tv2 size={16} style={{ color:"#06b6d4" }}/>
                  <span className="sc-display font-bold text-base tracking-widest" style={{ color:"#06b6d4" }}>LIVE AUDIENCE Q&amp;A</span>
                </div>
                {/* TV display */}
                <div className="sc-tv-flicker relative rounded-2xl overflow-hidden mb-5"
                  style={{ background:"#000",border:"3px solid rgba(6,182,212,.5)",boxShadow:"0 0 40px rgba(6,182,212,.25),inset 0 0 60px rgba(0,0,0,.8)",aspectRatio:"16/9" }}>
                  <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage:`url('${BG}')` }}/>
                  <div className="sc-scanlines"/><div className="sc-scan-beam"/>
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <div className="sc-blink w-2 h-2 rounded-full" style={{ background:"#ef4444" }}/>
                    <span className="sc-display font-bold text-[10px] tracking-widest" style={{ color:"rgba(255,255,255,.5)" }}>SOUND CLASH LIVE</span>
                  </div>
                  {liveMsg&&(
                    <div key={liveMsg.id} className="sc-msg-in absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                      style={liveMsg.premium ? { background:"radial-gradient(circle at center, rgba(217,70,239,0.3) 0%, transparent 70%)" } : {}}>
                      {liveMsg.premium ? (
                        <Zap size={26} className="mb-3 sc-glow" style={{ color:"#d946ef" }}/>
                      ) : (
                        <MessageSquare size={22} className="mb-3" style={{ color:"rgba(6,182,212,.5)" }}/>
                      )}
                      <p className="sc-display font-bold text-white leading-tight mb-3"
                        style={{ fontSize:"clamp(1rem,4vw,1.4rem)",textShadow: liveMsg.premium ? "0 0 16px #d946ef, 0 0 32px #d946ef" : "0 2px 12px rgba(0,0,0,.9)" }}>
                        &ldquo;{liveMsg.text}&rdquo;
                      </p>
                      <div className="text-xs font-bold" style={{ color: liveMsg.premium ? "#fbcfe8" : "#06b6d4" }}>
                        {liveMsg.author}
                        {liveMsg.premium && <span className="ml-2 px-1.5 py-0.5 rounded-full" style={{ background:"#d946ef", color:"#fff", fontSize:9, textShadow:"none" }}>NEON VIP</span>}
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {screenMsgs.slice(0,6).map((_,i)=>(
                      <div key={i} className="w-1.5 h-1.5 rounded-full transition-all"
                        style={{ background:i===screenIdx%Math.min(6,screenMsgs.length)?"#06b6d4":"rgba(255,255,255,.25)" }}/>
                    ))}
                  </div>
                </div>
                <button className="sc-btn w-full py-4 rounded-2xl text-white font-black text-sm tracking-widest uppercase mb-5 flex items-center justify-center gap-2"
                  onClick={()=>setModal("sendscreen")}>
                  <Tv2 size={16}/> SEND TO BIG SCREEN
                </button>
                <div className="flex items-center justify-between mb-3">
                  <span className="sc-display font-bold text-sm text-white tracking-wide">AUDIENCE QUEUE</span>
                  <span className="text-xs font-bold" style={{ color:"#475569" }}>{screenMsgs.length} MESSAGES</span>
                </div>
                <div className="space-y-2">
                  {screenMsgs.map((msg,i)=>(
                    <div key={msg.id} className="sc-glass rounded-xl p-3.5 flex items-start gap-3 sc-tap"
                      style={{ border:i===screenIdx?"1px solid rgba(6,182,212,.45)":"1px solid rgba(255,255,255,.07)",boxShadow:i===screenIdx?"0 0 16px rgba(6,182,212,.12)":"none" }}
                      onClick={()=>setScreenIdx(i)}>
                      <div className="mt-0.5 flex-shrink-0">
                        {i===screenIdx?<Tv2 size={16} style={{ color:"#06b6d4" }}/>:<MessageSquare size={16} style={{ color:"#334155" }}/>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white leading-snug mb-0.5 line-clamp-2">&ldquo;{msg.text}&rdquo;</p>
                        <div className="text-xs" style={{ color:"#475569" }}>
                          <span style={{ color:"#67e8f9" }}>{msg.author}</span> · {msg.time}
                          {msg.live&&<span className="ml-2 px-1.5 py-0.5 rounded font-black" style={{ background:"rgba(6,182,212,.2)",color:"#06b6d4",fontSize:9 }}>ON NOW</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* FAB */}
          <button className="sc-btn fixed z-50 w-14 h-14 rounded-full flex items-center justify-center text-xl"
            style={{ bottom:100,right:20 }} onClick={e=>spawnFire(e)}>🔥</button>

          {/* BOTTOM NAV */}
          <nav className="sc-glass fixed bottom-0 w-full max-w-md z-50"
            style={{ borderTop:"1px solid rgba(217,70,239,.18)",boxShadow:"0 -8px 36px rgba(0,0,0,.6)" }}>
            <div className="flex justify-around py-3.5">
              {[
                { id:"battle",  icon:<Flame    size={22}/>, label:"BATTLE",    act:()=>switchTab("battle"),  notif:notifs.battle },
                { id:"agenda",  icon:<Calendar size={22}/>, label:"SET TIMES", act:()=>setModal("agenda"),   notif:0             },
                { id:"screen",  icon:<Tv2      size={22}/>, label:"SCREEN",    act:()=>switchTab("screen"),  notif:notifs.screen },
                { id:"profile", icon:<User     size={22}/>, label:"PROFILE",   act:()=>{ setSelProfile(profiles[0]);setModal("profile"); }, notif:0 },
              ].map(item=>(
                <button key={item.id}
                  className="flex flex-col items-center gap-1 text-[10px] font-black relative transition-all active:scale-95"
                  style={{ color:(tab===item.id&&item.id!=="agenda"&&item.id!=="profile")?"#fff":"#334155" }}
                  onClick={item.act}>
                  {item.icon}{item.label}
                  {item.notif>0&&<span className="absolute -top-1 -right-2 w-4 h-4 rounded-full flex items-center justify-center font-black"
                    style={{ background:"#d946ef",color:"#fff",fontSize:8 }}>{item.notif}</span>}
                </button>
              ))}
            </div>
            {/* 9LMNTS branding strip */}
            <div className="flex items-center justify-center gap-1.5 pb-1.5">
              <span className="text-[9px] font-semibold" style={{ color:"#1e293b" }}>Powered by</span>
              <span className="sc-display font-bold text-xs tracking-widest" style={{ color:"#d946ef",opacity:.7 }}>9LMNTS STUDIO</span>
            </div>
          </nav>

          {/* MODALS */}
          {modal!=="none"&&(
            <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
              style={{ background:"rgba(0,0,0,.9)",backdropFilter:"blur(12px)" }}
              onClick={e=>{ if(e.target===e.currentTarget)setModal("none"); }}>

              {modal==="adminlogin"&&<AdminLogin onSuccess={()=>{setModal("none");setAppView("admin");}} onClose={()=>setModal("none")}/>}

              {modal==="vote"&&(
                <Sheet title="SHOW THE HYPE" sub={`Supporting: ${voteTarget}`} onClose={()=>setModal("none")}>
                  <div className="sc-glass-light rounded-xl flex gap-1 p-1 mb-5">
                    {(["free","power"] as const).map(t=>(
                      <button key={t} className="flex-1 py-2.5 rounded-lg text-xs font-black transition-all"
                        style={{ background:voteTab===t?"rgba(217,70,239,.22)":"transparent",color:voteTab===t?"#fff":"#475569",borderBottom:voteTab===t?"2px solid #d946ef":"2px solid transparent" }}
                        onClick={()=>setVoteTab(t)}>
                        {t==="free"?"FREE HYPE":"POWER VOTES ($)"}
                      </button>
                    ))}
                  </div>
                  {voteTab==="free"?(
                    <>
                      <p className="text-sm text-center mb-5" style={{ color:"#64748b" }}>Cast your audience hype for this round. One vote per person.</p>
                      <button className="sc-btn w-full py-4 rounded-2xl text-white font-black tracking-wider" onClick={e=>castFree(e)}>🔥 SUBMIT FREE HYPE</button>
                    </>
                  ):(
                    <>
                      <div className="sc-glass-light rounded-xl p-3 mb-4" style={{ border:"1px solid rgba(251,191,36,.2)" }}>
                        <div className="flex items-center gap-2">
                          <Trophy size={14} style={{ color:"#fbbf24" }}/>
                          <span className="text-xs font-black" style={{ color:"#fbbf24" }}>POWER VOTES FEED THE PRIZE POT!</span>
                        </div>
                      </div>
                      {POWER_PACKS.map(opt=>(
                        <div key={opt.votes} className="sc-tap flex items-center justify-between p-4 rounded-xl mb-3"
                          style={{ background:powerPack?.votes===opt.votes?"rgba(217,70,239,.14)":"rgba(255,255,255,.04)",
                            border:powerPack?.votes===opt.votes?"1px solid rgba(217,70,239,.5)":"1px solid rgba(255,255,255,.08)" }}
                          onClick={()=>setPowerPack({votes:opt.votes,amount:opt.amount})}>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-white">{opt.votes} votes</span>
                              {opt.popular&&<span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background:"rgba(217,70,239,.25)",color:"#d946ef" }}>POPULAR</span>}
                            </div>
                            <div className="text-xs" style={{ color:"#64748b" }}>{opt.label}</div>
                          </div>
                          <div className="text-right">
                            <div className="sc-display font-bold text-xl" style={{ color:"#d946ef" }}>${opt.amount}</div>
                            <div className="text-[10px]" style={{ color:"#475569" }}>${(opt.amount/opt.votes).toFixed(2)}/vote</div>
                          </div>
                        </div>
                      ))}
                      <button className="sc-btn w-full py-4 rounded-2xl text-white font-black tracking-wider mt-2 flex items-center justify-center gap-2"
                        onClick={e=>castPower(e)}>
                        <Zap size={16}/> PAY & BOOST
                      </button>
                    </>
                  )}
                </Sheet>
              )}

              {modal==="sendscreen"&&(
                <Sheet title="SEND TO BIG SCREEN" sub="Your message goes live on the venue display" accent="#06b6d4" onClose={()=>setModal("none")}>
                  <div className="sc-glass-light rounded-xl p-3 mb-4" style={{ border:"1px solid rgba(6,182,212,.25)" }}>
                    <div className="flex items-center gap-2">
                      <Tv2 size={14} style={{ color:"#06b6d4" }}/>
                      <span className="text-xs font-semibold" style={{ color:"#67e8f9" }}>Appears on the Velvet Room big screen for everyone!</span>
                    </div>
                  </div>
                  <textarea className="w-full h-28 rounded-2xl p-4 text-white text-sm font-medium resize-none outline-none"
                    style={{ background:"rgba(255,255,255,.06)",border:"1px solid rgba(6,182,212,.25)" }}
                    placeholder="Type your question or shoutout for the crowd..."
                    value={screenInput}
                    onChange={e=>setScreenInput(e.target.value.slice(0,140))}/>
                  <div className="flex justify-between mt-1 mb-4">
                    <label className="flex items-center gap-2 text-sm cursor-pointer ml-1 font-bold" style={{ color: premiumMsg ? "#d946ef" : "#94a3b8" }}>
                      <input type="checkbox" checked={premiumMsg} onChange={e=>setPremiumMsg(e.target.checked)} className="accent-[#d946ef]" />
                      🌟 $3 Neon Highlight (Jump Queue)
                    </label>
                    <span className="text-xs" style={{ color:"#475569" }}>{screenInput.length}/140</span>
                  </div>
                  <button className="w-full py-4 rounded-2xl text-white font-black tracking-wider flex items-center justify-center gap-2"
                    style={{ background: premiumMsg ? "linear-gradient(135deg,#d946ef,#c026d3)" : "linear-gradient(135deg,#06b6d4,#0284c7)",boxShadow: premiumMsg ? "0 4px 24px rgba(217,70,239,.35)" : "0 4px 24px rgba(6,182,212,.35)" }}
                    onClick={sendToScreen}>
                    {premiumMsg ? <Zap size={16}/> : <Tv2 size={16}/>} {premiumMsg ? "PAY $3 & SEND" : "SEND TO SCREEN"}
                  </button>
                </Sheet>
              )}

              {modal==="agenda"&&(
                <Sheet title="EVENT SET TIMES" onClose={()=>setModal("none")}>
                  {AGENDA.map((item,i)=>(
                    <div key={i} className="flex gap-5 py-4"
                      style={{ borderBottom:"1px solid rgba(255,255,255,.06)",...(item.now?{background:"rgba(217,70,239,.07)",marginLeft:-20,paddingLeft:20,paddingRight:20,borderLeft:"3px solid #d946ef",marginRight:-20}:{}) }}>
                      <div className="sc-display font-bold text-sm min-w-[84px]" style={{ color:"#d946ef" }}>{item.time}</div>
                      <div className="flex-1">
                        <span className="font-bold text-sm text-white">{item.desc}</span>
                        {item.now&&<span className="ml-2 px-2 py-0.5 rounded-full font-black text-white" style={{ background:"#d946ef",fontSize:9 }}>NOW</span>}
                      </div>
                    </div>
                  ))}
                  <button className="sc-btn w-full py-4 rounded-2xl text-white font-black mt-5 tracking-wider" onClick={()=>setModal("none")}>CLOSE SCHEDULE</button>
                </Sheet>
              )}

              {modal==="profile"&&selProfile&&(
                <Sheet title="VIP PROFILE" onClose={()=>setModal("none")}>
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-cover bg-center"
                      style={{ backgroundImage:`url('${selProfile.img}')`,border:"3px solid rgba(217,70,239,.45)",boxShadow:"0 0 32px rgba(217,70,239,.3)" }}/>
                    <div className="font-black text-xl text-white mb-1">{selProfile.name}</div>
                    <div className="text-sm mb-6" style={{ color:"#64748b" }}>{selProfile.role}</div>
                    <div className="sc-glass-light rounded-xl p-4 mb-5 text-left" style={{ border:"1px solid rgba(255,255,255,.08)" }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-black text-sm text-white">Bar Tab Goal</span>
                        <button className="text-xs font-black px-3 py-1 rounded-full text-white" style={{ background:"#d946ef" }} onClick={()=>setModal("contribute")}>ADD DRINK</button>
                      </div>
                      <div className="w-full h-2 rounded-full mb-2" style={{ background:"rgba(255,255,255,.1)" }}>
                        <div className="h-full rounded-full" style={{ width:`${selProfile.tabPct}%`,background:"linear-gradient(90deg,#d946ef,#06b6d4)" }}/>
                      </div>
                      <div className="flex justify-between text-xs" style={{ color:"#64748b" }}>
                        <span>Spent: <strong style={{ color:"#d946ef" }}>${selProfile.tabPct}</strong></span>
                        <span>Goal: <strong style={{ color:"#fff" }}>$100</strong></span>
                      </div>
                    </div>
                    <button className="sc-btn w-full py-4 rounded-2xl text-white font-black mb-3 tracking-wider" onClick={()=>toggleConnect(selProfile.id)}>
                      {selProfile.connected?"✓ DRINK SENT":"🍸 BUY DRINK"}
                    </button>
                    <button className="w-full py-3.5 rounded-2xl text-sm font-black"
                      style={{ border:"1px solid rgba(217,70,239,.32)",color:"#d946ef",background:"transparent" }}
                      onClick={()=>setModal("none")}>💬 SEND MESSAGE</button>
                  </div>
                </Sheet>
              )}

              {modal==="contribute"&&(
                <Sheet title="SELECT UPGRADE" sub="50% of every upgrade feeds the Prize Pot" onClose={()=>setModal("none")}>
                  {[
                    { price:20, label:"Cover Charge",    desc:"Basic entry access" },
                    { price:10, label:"Power Hype Pack", desc:"20 power votes + access" },
                    { price:150,label:"Bottle Service",  desc:"VIP lounge + reserved table" },
                  ].map(t=>(
                    <div key={t.price} className="sc-tap p-4 rounded-2xl mb-3"
                      style={{ background:selTier?.price===t.price?"rgba(217,70,239,.14)":"rgba(255,255,255,.04)",
                        border:selTier?.price===t.price?"1px solid rgba(217,70,239,.5)":"1px solid rgba(255,255,255,.08)" }}
                      onClick={()=>setSelTier({price:t.price,label:t.label})}>
                      <div className="sc-display font-bold text-3xl" style={{ color:"#d946ef" }}>${t.price}</div>
                      <div className="font-black text-white mb-0.5">{t.label}</div>
                      <div className="text-xs" style={{ color:"#64748b" }}>{t.desc}</div>
                    </div>
                  ))}
                  <button className="sc-btn w-full py-4 rounded-2xl text-white font-black mt-2 tracking-wider" onClick={doContribute}>PROCEED TO PAYMENT</button>
                </Sheet>
              )}

              {modal==="ask"&&(
                <Sheet title="REQUEST A SONG" onClose={()=>setModal("none")}>
                  <textarea className="w-full h-28 rounded-2xl p-4 text-white text-sm font-medium resize-none outline-none"
                    style={{ background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)" }}
                    placeholder="Artist - Song Title (e.g. Daft Punk - One More Time)"
                    value={reqText} onChange={e=>setReqText(e.target.value)}/>
                  <div className="flex gap-5 my-4">
                    <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color:"#94a3b8" }}>
                      <input type="checkbox" checked={anon} onChange={e=>setAnon(e.target.checked)}/> Anonymous
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color:"#94a3b8" }}>
                      <input type="checkbox" checked={bday} onChange={e=>setBday(e.target.checked)}/> 🎂 Birthday Shoutout
                    </label>
                  </div>
                  <button className="sc-btn w-full py-4 rounded-2xl text-white font-black tracking-wider flex items-center justify-center gap-2" onClick={submitReq}>
                    <Send size={16}/> SUBMIT REQUEST
                  </button>
                </Sheet>
              )}

              {modal==="payment"&&payData&&(
                <Sheet title="SECURE PAYMENT" onClose={()=>setModal("none")}>
                  <div className="text-center">
                    <div className="sc-display font-bold text-6xl mb-1" style={{ color:"#d946ef" }}>${payData.amount}</div>
                    <div className="text-sm mb-6" style={{ color:"#64748b" }}>Secure checkout via Stripe · 256-bit encryption</div>
                    <div className="sc-glass-light rounded-xl p-4 mb-5 text-left" style={{ border:"1px solid rgba(255,255,255,.08)" }}>
                      {[
                        { label:"Item",           value:payData.title },
                        { label:"Amount",         value:`$${payData.amount.toFixed(2)}` },
                        { label:"Processing fee", value:`$${(payData.amount*.029+.30).toFixed(2)}` },
                      ].map(row=>(
                        <div key={row.label} className="flex justify-between py-2.5 border-b text-sm" style={{ borderColor:"rgba(255,255,255,.06)" }}>
                          <span style={{ color:"#64748b" }}>{row.label}</span>
                          <span className="font-bold text-white">{row.value}</span>
                        </div>
                      ))}
                      <div className="flex justify-between pt-3 font-black">
                        <span className="text-white">Total</span>
                        <span style={{ color:"#d946ef" }}>${(payData.amount*1.029+.30).toFixed(2)}</span>
                      </div>
                    </div>
                    <button className="sc-btn w-full py-4 rounded-2xl text-white font-black tracking-wider flex items-center justify-center gap-2"
                      onClick={()=>setModal("none")}>
                      <Lock size={16}/> CONFIRM & PAY
                    </button>
                    <p className="text-xs mt-3" style={{ color:"#334155" }}>By completing this purchase you agree to our Terms of Service</p>
                  </div>
                </Sheet>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
