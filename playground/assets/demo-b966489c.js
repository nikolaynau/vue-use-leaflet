import{l as r,u as c,a as p}from"./index-1d111fd1.js";import{u as f,a as i}from"./index-71f0b2f7.js";import{s as u,m,d as _,i as y,o as L,c as d}from"./index-a532158a.js";import{u as C}from"./index-e0747ba4.js";import"./index-ed412dfc.js";function h(s={}){const{factory:e,dispose:o=!0,...a}=s,t=u(null);function l(){const n=e?e(a):new r.Control.Scale(a);t.value=m(n)}return f(t,{dispose:o}),l(),t}const R=_({__name:"demo",setup(s){const e=y(null),o=c(e),a=p("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");C(o,a);const t=h();return i(o,t),(l,n)=>(L(),d("div",{ref_key:"el",ref:e,style:{height:"250px"}},null,512))}});export{R as default};