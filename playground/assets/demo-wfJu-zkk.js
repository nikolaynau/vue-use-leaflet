import{i as I,p as C,h as z,q as D,d as M,o as S,c as $,l as q}from"./index-sEMHmT-4.js";import{t as L,w as N,l as O,n as R,a as T,i as s,u as U,f as b}from"./index-XMFbUhFf.js";import{u as j}from"./index-7TvEzIek.js";import{u as w}from"./index-2RwKIkw1.js";import{u as _}from"./index-_zfS4-SC.js";import{u as F}from"./index-rcq1Cd6g.js";function k(x,f,l={}){const{zIndex:i,flushSync:p,dispose:m}=l,a=L(x),t=L(f),c=L(i),v=I({}),A=p?"sync":void 0,E=C(()=>h(t.value??[]).map(e=>v.value[e]));function P(){s(a)&&s(t)&&(d(a.value,t.value),u())}function d(e,n){h(n).forEach(r=>{if(!e.getPane(r)){const o=e.createPane(r);s(c)&&(o.style.zIndex=`${c.value}`)}})}function y(e,n){const r=e.getPanes();h(n).forEach(o=>{r[o]&&(r[o].remove(),delete r[o])})}function u(){s(a)&&(v.value={...a.value.getPanes()})}function g(e,n){return e.filter(r=>!n.includes(r))}function h(e){return Array.isArray(e)?e:[e]}z(()=>{if(s(t))return Array.isArray(t.value)?[...t.value]:[t.value]},(e,n)=>{s(a)&&(n&&e?(y(a.value,g(n,e)),d(a.value,g(e,n)),u()):n?(y(a.value,n),u()):e&&(d(a.value,e),u()))},{deep:!0,flush:A}),N(O(a,t),()=>{P()},{flush:A}),R(i)&&z(c,e=>{E.value.forEach(n=>{n.style.zIndex=`${e??""}`})});function B(){s(a)&&s(t)&&(y(a.value,t.value),u())}return m&&T(()=>{B()}),P(),{currentPanes:E,paneElements:D(v)}}const W=M({__name:"demo",setup(x){const f=I(null),l=U(f),i=j("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");_(l,i);const{paneElements:p}=k(l,"paneA",{zIndex:800});k(l,"paneB",{zIndex:900,flushSync:!0});const m=w([0,0],{pane:"paneA"}),a=b(()=>new q.CircleMarker([0,0],{radius:20,pane:"paneB",fillColor:"#000"}));return _(l,F(m,()=>p.value.paneA)),_(l,a),(t,c)=>(S(),$("div",{ref_key:"el",ref:f,style:{height:"25rem"}},null,512))}});export{W as default};
