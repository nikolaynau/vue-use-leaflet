import{r as _,l as v,k as f,u as y,a as L}from"./index-b083ae50.js";import{u as C,a as h}from"./index-91af7ed3.js";import{s as k,h as g,m as x,u as D,d as w,i as p,o as R,c as z,a as n,t as m,F as B}from"./index-a8e8831a.js";import{u as E}from"./index-d063ca1f.js";import"./index-e6f090c1.js";function F(c={}){const{disabled:s,factory:t,dispose:r=!0,...a}=c,o=k(null),u=_(s);function l(){const e=t?t(a):new v.Control.Zoom(a);o.value=x(e)}function i(){D(u)?b():d()}function d(){const e=o.value;f(e==null?void 0:e.enable)&&e._map&&e.enable()}function b(){const e=o.value;f(e==null?void 0:e.disable)&&e._map&&e.disable()}return C(o,{dispose:r}),g(u,i),l(),i(),o}const S=n("br",null,null,-1),V=w({__name:"demo",setup(c){const s=p(null),t=y(s,{zoomControl:!1}),r=L("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");E(t,r);const a=p(!1),o=F({disabled:a});return h(t,o),(u,l)=>(R(),z(B,null,[n("div",{ref_key:"el",ref:s,style:{height:"320px"}},null,512),S,n("button",{onClick:l[0]||(l[0]=i=>a.value=!a.value)},m(a.value?"Enable":"Disable"),1),n("span",null," Disabled: "+m(a.value),1)],64))}});export{V as default};