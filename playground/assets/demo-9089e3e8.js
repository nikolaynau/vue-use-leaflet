import{u as f,a as m,h as c}from"./index-b083ae50.js";import{u as d}from"./index-d063ca1f.js";import{d as v,i as u,o as y,c as _,a as t,f as L,t as b,u as i,F as g}from"./index-a8e8831a.js";import"./index-e6f090c1.js";const k=t("br",null,null,-1),C=t("br",null,null,-1),B=v({__name:"demo",setup(x){const s=u(null),a=f(s),p=m("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");d(a,p);const l=u(!1),r=c(a,{remove:o=>o.off().remove(),isRemoved:o=>!o.getContainer()._leaflet_id,cleanRef:!0,watch:l});return(o,e)=>(y(),_(g,null,[t("div",{ref_key:"el",ref:s,style:{height:"250px"}},null,512),t("button",{onClick:e[0]||(e[0]=n=>l.value=!0)},"Destroy Map"),L(" WatchSource: "+b(l.value)+" ",1),k,t("button",{onClick:e[1]||(e[1]=(...n)=>i(r)&&i(r)(...n))},"Manual Destroy Map"),C,t("button",{onClick:e[2]||(e[2]=n=>a.value=null)},"Clean Map Ref")],64))}});export{B as default};