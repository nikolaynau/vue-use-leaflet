import{u as o,a as p,c as u}from"./index-3c2b32e6.js";import{u as c}from"./index-2597582f.js";import{d as i,i as r,o as m,c as f,a as l,t as _,F as d}from"./index-4806f730.js";import"./index-6f2b982a.js";const k=i({__name:"demo",setup(y){const e=r(null),t=r(null),a=o(e),n=p("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");return c(a,n),u(a,"moveend",s=>{t.value=s.target.getCenter()}),(s,g)=>(m(),f(d,null,[l("div",{ref_key:"el",ref:e,style:{height:"250px"}},null,512),l("div",null,"Center: "+_(t.value),1)],64))}});export{k as default};
