import{u,a as f,b as p,m as i,l as c}from"./index-224bd8b6.js";import{u as g}from"./index-cb9b28ce.js";import{d as L,i as y,o as d,c as _,a as t,u as k,F as b}from"./index-d1d159a6.js";const x=t("br",null,null,-1),C=L({__name:"demo",setup(T){const s=y(null),l=u(s),r=f("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");g(l,r);const n=p(()=>new c.Marker([0,0])),m=i(l,n,{onToggle:(a,e,o)=>{o?a.addLayer(e):a.removeLayer(e)}});return(a,e)=>(d(),_(b,null,[t("div",{ref_key:"el",ref:s,style:{height:"21rem"}},null,512),x,t("button",{onClick:e[0]||(e[0]=o=>k(m)())},"Toggle")],64))}});export{C as default};
