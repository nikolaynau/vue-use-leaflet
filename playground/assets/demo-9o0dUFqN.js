import{d as _,i as L,l as t,m as s,r as h,o as g,c as w,a,u as M,F as v}from"./index-sEMHmT-4.js";import{u as b}from"./index-XMFbUhFf.js";import{u as x}from"./index-7TvEzIek.js";import{u}from"./index-_zfS4-SC.js";import{u as B}from"./index-rc64R5lJ.js";const C=a("br",null,null,-1),E=a("br",null,null,-1),z=_({__name:"demo",setup(A){const n=L(null),l=b(n),c=x("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");u(l,c);const o=new t.LayerGroup,i=s(new t.Marker([0,0])),p=s(new t.Marker([-20,-20])),f=s(new t.Marker([-40,-40])),m=h([i,p]);B(m,k,{add:r=>{r.forEach(e=>{o.addLayer(e)})},remove:r=>{r.forEach(e=>{o.removeLayer(e)})},watchOptions:{immediate:!0}});const d=u(l,o);function k(r,e){return t.Util.stamp(r)===t.Util.stamp(e)}function y(){m.push(f)}return(r,e)=>(g(),w(v,null,[a("div",{ref_key:"el",ref:n,style:{height:"20rem"}},null,512),C,a("button",{onClick:y},"Add Marker"),E,a("button",{onClick:e[0]||(e[0]=D=>M(d)())},"Toggle Show")],64))}});export{z as default};