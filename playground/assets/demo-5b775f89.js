import{u as r,a as u,c as p}from"./index-70374bbd.js";import{d as c,i,o as m,c as f,a,u as d,F as y}from"./index-68ee90cc.js";const _=a("br",null,null,-1),b=c({__name:"demo",setup(g){const s=i(null),o=r(s),n=u("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),l=p(o,n,{show:(t,e)=>t.addLayer(e),hide:(t,e)=>t.removeLayer(e),shown:(t,e)=>t.hasLayer(e)});return(t,e)=>(m(),f(y,null,[a("div",{ref_key:"el",ref:s,style:{height:"21rem"}},null,512),_,a("button",{onClick:e[0]||(e[0]=L=>d(l)())},"Toggle")],64))}});export{b as default};