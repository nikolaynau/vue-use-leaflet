import{r as E,w as I,f as C,i as s,t as D,u as M,a as S,b as g,l as k}from"./index-b083ae50.js";import{u as d}from"./index-d063ca1f.js";import{i as z,h as b,A as w,d as O,o as R,c as T}from"./index-a8e8831a.js";import{u as U}from"./index-c2dcaa91.js";import"./index-e6f090c1.js";function P(h,u,l={}){const{zIndex:f,flushSync:c,dispose:p}=l,a=E(h),t=E(u),m=z({}),A=c?"sync":void 0;function L(){s(a)&&s(t)&&(v(a.value,t.value),i())}function v(e,n){_(n).forEach(r=>{if(!e.getPane(r)){const o=e.createPane(r);s(f)&&(o.style.zIndex=`${f}`)}})}function y(e,n){const r=e.getPanes();_(n).forEach(o=>{r[o]&&(r[o].remove(),delete r[o])})}function _(e){return Array.isArray(e)?e:[e]}function i(){s(a)&&(m.value={...a.value.getPanes()})}function x(e,n){return e.filter(r=>!n.includes(r))}b(()=>{if(s(t))return Array.isArray(t.value)?[...t.value]:[t.value]},(e,n)=>{s(a)&&(n&&e?(y(a.value,x(n,e)),v(a.value,x(e,n)),i()):n?(y(a.value,n),i()):e&&(v(a.value,e),i()))},{deep:!0,flush:A}),I(C(a,t),()=>{L()},{flush:A});function B(){s(a)&&s(t)&&(y(a.value,t.value),i())}return p&&D(()=>{B()}),L(),{paneElements:w(m)}}const H=O({__name:"demo",setup(h){const u=z(null),l=M(u),f=S("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");d(l,f);const{paneElements:c}=P(l,"paneA",{zIndex:800});P(l,"paneB",{zIndex:900,flushSync:!0});const p=g(()=>new k.Marker([0,0],{pane:"paneA"})),a=g(()=>new k.CircleMarker([0,0],{radius:20,pane:"paneB",fillColor:"#000"}));return d(l,U(p,()=>c.value.paneA)),d(l,a),(t,m)=>(R(),T("div",{ref_key:"el",ref:u,style:{height:"25rem"}},null,512))}});export{H as default};