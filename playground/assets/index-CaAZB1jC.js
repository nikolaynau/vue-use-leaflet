import{t as f,n as k,i as L}from"./index-XMFbUhFf.js";import{l,n}from"./index-sEMHmT-4.js";import{u as C}from"./index-4m1pJG7u.js";function _(p,d={}){const{radius:o,factory:i,defOptions:u=l.CircleMarker.prototype.options,updateSources:r=[],...h}=d,a=f(p),s=f(o);r.push({watch:a,handler:(t,e)=>{e&&t.setLatLng(n(e))}}),k(o)&&r.push({watch:s,handler:(t,e)=>{t.setRadius(e??u.radius)}});const m=C(w,{...h,defOptions:u,updateSources:r,watch:a});function w(t){return i?i(n(a.value),c(t)):new l.CircleMarker(n(a.value),c(t))}function c(t){const e=t;return L(s)&&(e.radius=s.value),e}return m}export{_ as u};