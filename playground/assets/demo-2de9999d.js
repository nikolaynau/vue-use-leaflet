import{u as i,a as m}from"./index-3c2b32e6.js";import{u}from"./index-a0d9c213.js";import{u as f}from"./index-2597582f.js";import{a as c}from"./index-3afbeb48.js";import{d,i as s,o as y,c as L,a,t as r,F as _}from"./index-4806f730.js";import"./index-6f2b982a.js";const h=d({__name:"demo",setup(v){const o=s(null),t=i(o,{zoomControl:!1}),n=m("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");f(t,n);const e=s(!1),p=u({disabled:e});return c(t,p),(C,l)=>(y(),L(_,null,[a("div",{ref_key:"el",ref:o,style:{height:"250px"}},null,512),a("button",{onClick:l[0]||(l[0]=b=>e.value=!e.value)},r(e.value?"Enable":"Disable"),1),a("span",null," Disabled: "+r(e.value),1)],64))}});export{h as default};
