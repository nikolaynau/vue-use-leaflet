import{g as c,u as f,a as m}from"./index-ad17f05d.js";import{u as d}from"./index-28e25704.js";import{d as y,i as u,o as e,c as t,a as i,f as _,t as g,u as L,F as k}from"./index-e01de63b.js";function v(...a){return c(...a)}const x=i("br",null,null,-1),F=y({__name:"demo",setup(a){const s=u(!1),n=u(null),r=f(n),l=m("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");d(r,l);const p=v(r,l);return(h,o)=>(e(),t(k,null,[s.value?(e(),t("div",{key:0,ref_key:"el",ref:n,style:{height:"21rem"}},null,512)):(e(),t("button",{key:1,onClick:o[0]||(o[0]=B=>s.value=!0)},"Create Map")),i("div",null,[x,_("Ready: "+g(L(p)),1)])],64))}});export{F as default};