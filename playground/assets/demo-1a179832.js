import{u,k as f}from"./index-da82d77a.js";import{u as p}from"./index-bc70e9f1.js";import{u as i}from"./index-1e8e031f.js";import{u as c}from"./index-fce24f26.js";import{d as g,i as L,o as d,c as y,a as o,u as _,F as k}from"./index-2e15105f.js";const T=o("br",null,null,-1),F=g({__name:"demo",setup(b){const a=L(null),r=u(a),l=p("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");c(r,l);const n=i([0,0]),m=f(r,n,{onToggle:(t,e,s)=>{s?t.addLayer(e):t.removeLayer(e)}});return(t,e)=>(d(),y(k,null,[o("div",{ref_key:"el",ref:a,style:{height:"21rem"}},null,512),T,o("button",{onClick:e[0]||(e[0]=s=>_(m)())},"Toggle")],64))}});export{F as default};