import{t as z,i as s,w as B,l as O,a as U,b as $,u as q}from"./index-XMFbUhFf.js";import{u as M}from"./index-7TvEzIek.js";import{u as N}from"./index-XbKLMgen.js";import{u as P}from"./index-_zfS4-SC.js";import{a as R}from"./index-0mMaD078.js";import{i as A,p as T,q as V,l as Z,d as b,o as j,c as F}from"./index-sEMHmT-4.js";import{u as G}from"./index-rc64R5lJ.js";function H(_,f,l={}){const{flushSync:p,dispose:d}=l,o=z(_),h=A({}),C=p?"sync":void 0,i=T(()=>y($(f)));function v(){s(o)&&s(i)&&(L(o.value,i.value),u())}function L(e,n){y(n).forEach(t=>{E(e,t)||D(e,t)})}function S(e,n){const t=g(e);y(n).forEach(a=>{const[r,m]=a,c=r+m;t[c]&&(t[c].remove(),delete t[c])})}function u(){s(o)&&(h.value={...g(o.value)})}function E(e,n){const[t,a]=n,r=e._controlCorners;return r?!!r[t+a]:!1}function D(e,n){const[t,a]=n,r=e._controlCorners,m=e._controlContainer;if(!m||!r)return;const c=`leaflet-${t} leaflet-${a}`;r[t+a]=Z.DomUtil.create("div",c,m)}function g(e){return e._controlCorners??{}}function y(e){return Array.isArray(e)?e.length===0||Array.isArray(e[0])?e:[e]:[]}function k(e,n){return e[0]+e[1]===n[0]+n[1]}const x=G(i,k,{add:e=>{s(o)&&(L(o.value,e),u())},remove:e=>{s(o)&&(S(o.value,e),u())},watchOptions:{flush:C}});B(O(o,i),()=>{v()},{flush:C});function w(){s(o)&&s(i)&&(S(o.value,i.value),u())}return d&&U(()=>{w(),x()}),v(),{positionElements:V(h)}}const ee=b({__name:"demo",setup(_){const f=A(null),l=q(f,{zoomControl:!1}),p=M("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");P(l,p),H(l,["center","right"],{flushSync:!0});const d=N({position:"centerright"});return R(l,d),(o,h)=>(j(),F("div",{ref_key:"el",ref:f,style:{height:"25rem"}},null,512))}});export{ee as default};
