import{t as b,l as _,u as y,a as v}from"./index-70374bbd.js";import{u as L,a as C}from"./index-faa423ec.js";import{s as h,h as g,m as k,u as x,d as D,i as f,o as w,c as R,a as l,t as p,F as z}from"./index-68ee90cc.js";import{u as B}from"./index-01da25e3.js";function E(c={}){const{disabled:n,factory:o,dispose:r=!0,...t}=c,a=h(null),i=b(n);function s(){const e=o?o(t):new _.Control.Zoom(t);a.value=k(e)}function u(){x(i)?d():m()}function m(){const e=a.value;e&&typeof e.enable=="function"&&e._map&&e.enable()}function d(){const e=a.value;e&&typeof e.disable=="function"&&e._map&&e.disable()}return L(a,{dispose:r}),g(i,u),s(),u(),a}const F=l("br",null,null,-1),O=D({__name:"demo",setup(c){const n=f(null),o=y(n,{zoomControl:!1}),r=v("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");B(o,r);const t=f(!1),a=E({disabled:t});return C(o,a),(i,s)=>(w(),R(z,null,[l("div",{ref_key:"el",ref:n,style:{height:"320px"}},null,512),F,l("button",{onClick:s[0]||(s[0]=u=>t.value=!t.value)},p(t.value?"Enable":"Disable"),1),l("span",null," Disabled: "+p(t.value),1)],64))}});export{O as default};
