import{u as _,l as t}from"./index-da82d77a.js";import{u as L}from"./index-bc70e9f1.js";import{u}from"./index-fce24f26.js";import{u as h}from"./index-b5a6d64c.js";import{d as g,i as w,m as s,r as M,o as v,c as b,a,u as x,F as B}from"./index-2e15105f.js";const C=a("br",null,null,-1),E=a("br",null,null,-1),z=g({__name:"demo",setup(A){const n=w(null),l=_(n),c=L("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");u(l,c);const o=new t.LayerGroup,i=s(new t.Marker([0,0])),p=s(new t.Marker([-20,-20])),f=s(new t.Marker([-40,-40])),m=M([i,p]);h(m,k,{add:r=>{r.forEach(e=>{o.addLayer(e)})},remove:r=>{r.forEach(e=>{o.removeLayer(e)})},watchOptions:{immediate:!0}});const d=u(l,o);function k(r,e){return t.Util.stamp(r)===t.Util.stamp(e)}function y(){m.push(f)}return(r,e)=>(v(),b(B,null,[a("div",{ref_key:"el",ref:n,style:{height:"20rem"}},null,512),C,a("button",{onClick:y},"Add Marker"),E,a("button",{onClick:e[0]||(e[0]=D=>x(d)())},"Toggle Show")],64))}});export{z as default};
