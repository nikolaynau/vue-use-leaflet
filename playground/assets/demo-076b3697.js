import{u as l,a as p}from"./index-3c2b32e6.js";import{u as m}from"./index-6f2b982a.js";import{d as u,i,o as f,c,a as s,u as d,F as y}from"./index-4806f730.js";const x=u({__name:"demo",setup(g){const a=i(null),o=l(a),r=p("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),n=m(o,r,{show:(t,e)=>t.addLayer(e),hide:(t,e)=>t.removeLayer(e),shown:(t,e)=>t.hasLayer(e)});return(t,e)=>(f(),c(y,null,[s("div",{ref_key:"el",ref:a,style:{height:"250px"}},null,512),s("button",{onClick:e[0]||(e[0]=L=>d(n)())},"Toggle")],64))}});export{x as default};
