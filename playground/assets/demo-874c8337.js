import{u as i,g as m,l as c}from"./index-1ea82280.js";import{u as f}from"./index-05ce206d.js";import{u as l}from"./index-0233d088.js";import{d as L,i as n,o as d,c as _,a as t,F as y}from"./index-fde67865.js";const g=t("br",null,null,-1),M=L({__name:"demo",setup(k){const a=n(null),r=i(a),u=f("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");l(r,u);const e=n([0,0]),p=m(()=>new c.Marker(e.value),{updateSources:[{watch:e,handler:s=>s.setLatLng(e.value)}]});return l(r,p),(s,o)=>(d(),_(y,null,[t("div",{ref_key:"el",ref:a,style:{height:"21rem"}},null,512),g,t("button",{onClick:o[0]||(o[0]=h=>e.value=[-10,-10])},"Change Marker Position")],64))}});export{M as default};
