import{u as p,a as m,g as u}from"./index-1d111fd1.js";import{u as i}from"./index-e0747ba4.js";import{d as f,i as c,o as y,c as L,a as o,u as r,F as _}from"./index-a532158a.js";import"./index-ed412dfc.js";const h=f({__name:"demo",setup(d){const e=c(null),l=p(e),t=m("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");i(l,t);const a=u(t);return(g,s)=>(y(),L(_,null,[o("div",{ref_key:"el",ref:e,style:{height:"250px"}},null,512),o("button",{onClick:s[0]||(s[0]=(...n)=>r(a)&&r(a)(...n))},"Destroy Tile Layer")],64))}});export{h as default};