import{l as _,d as M,i as f,o as S,c as b,a as e,f as d,j as v,k,t as y,F as B}from"./index-8fcbc575.js";import{l as L,t as g,n as C,i as R,u as D}from"./index-aa5283be.js";import{u as V}from"./index-6385ef3e.js";import{u as N}from"./index-0208bcbd.js";import{u as x}from"./index-0092a16d.js";function O(m,u={}){const{radius:l,factory:c,defOptions:a=L.CircleMarker.prototype.options,updateSources:t=[],...p}=u,r=g(m),o=g(l);t.push({watch:r,handler:(s,n)=>{n&&s.setLatLng(_(n))}}),C(l)&&t.push({watch:o,handler:(s,n)=>{s.setRadius(n??a.radius)}});const i=N(w,{...p,defOptions:a,updateSources:t,watch:r});function w(s){return c?c(_(r.value),h(s)):new L.CircleMarker(_(r.value),h(s))}function h(s){const n=s;return R(o)&&(n.radius=o.value),n}return i}const z=e("br",null,null,-1),E=e("option",{value:"green"},"Green",-1),F=e("option",{value:"blue"},"Blue",-1),T=e("option",{value:"red"},"Red",-1),U=e("option",{value:"black"},"Black",-1),j=[E,F,T,U],G=e("br",null,null,-1),P=e("option",{value:"10"},"10px",-1),q=e("option",{value:"20"},"20px",-1),A=e("option",{value:"30"},"30px",-1),H=[P,q,A],X=M({__name:"demo",setup(m){const u=f(null),l=D(u,{center:[-10,-10],zoom:3}),c=V("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");x(l,c);const a=f("green"),t=f(30),p=O([-10,-10],{radius:t,color:a});return x(l,p),(r,o)=>(S(),b(B,null,[e("div",{ref_key:"el",ref:u,style:{height:"19rem"}},null,512),z,e("div",null,[d(" Color: "),v(e("select",{"onUpdate:modelValue":o[0]||(o[0]=i=>a.value=i)},j,512),[[k,a.value]]),d(" Selected: "+y(a.value),1)]),G,e("div",null,[d(" Radius: "),v(e("select",{"onUpdate:modelValue":o[1]||(o[1]=i=>t.value=i)},H,512),[[k,t.value,void 0,{number:!0}]]),d(" Selected: "+y(t.value),1)])],64))}});export{X as default};
