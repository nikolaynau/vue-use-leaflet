import{u as m,a as c,j as p}from"./index-6fe777f4.js";import{u as d}from"./index-1ceaab39.js";import{d as v,i as u,o as _,c as y,a as e,f as b,t as L,u as i,F as g}from"./index-43f8f60f.js";const k=e("br",null,null,-1),C=e("br",null,null,-1),h=e("br",null,null,-1),B=v({__name:"demo",setup(S){const s=u(null),l=m(s),f=c("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");d(l,f);const a=u(!1),r=p(l,{remove:o=>o.off().remove(),isRemoved:o=>!o.getContainer()._leaflet_id,cleanRef:!0,watch:a});return(o,t)=>(_(),y(g,null,[e("div",{ref_key:"el",ref:s,style:{height:"19rem"}},null,512),k,e("button",{onClick:t[0]||(t[0]=n=>a.value=!0)},"Set WatchSource"),b(" WatchSource: "+L(a.value)+" ",1),C,e("button",{onClick:t[1]||(t[1]=(...n)=>i(r)&&i(r)(...n))},"Manual Destroy Map"),h,e("button",{onClick:t[2]||(t[2]=n=>l.value=null)},"Clean Map Ref")],64))}});export{B as default};