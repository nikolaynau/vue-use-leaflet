import{d as _,i as r,o as f,c as y,a as e,f as i,j as g,k as v,t as h,F as L}from"./index-sEMHmT-4.js";import{u as k}from"./index-XMFbUhFf.js";import{u as B}from"./index-7TvEzIek.js";import{u as s}from"./index-tAZSlVFs.js";import{u as l}from"./index-_zfS4-SC.js";import"./index-omztvlES.js";import"./index-4m1pJG7u.js";const x=e("br",null,null,-1),b=e("option",{value:"green"},"Green",-1),D=e("option",{value:"blue"},"Blue",-1),S=e("option",{value:"red"},"Red",-1),V=e("option",{value:"black"},"Black",-1),z=[b,D,S,V],G=_({__name:"demo",setup(C){const a=r(null),t=k(a,{center:[-10,-10],zoom:3}),u=B("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");l(t,u);const o=r("green"),c=s([[0,-15],[-5,-25],[-15,-25],[-10,-15]],{color:o}),p=s([[[-15,-15],[-17,-25],[-27,-25],[-27,-15]],[[-18,-20],[-18,-20],[-23,-23],[-24,-17]]],{color:o}),m=s([[[[0,-2],[-5,-10],[-10,-10],[-8,-2]]],[[[-10,-2],[-15,-10],[-20,-10],[-15,-2]]]],{color:o});return l(t,c),l(t,p),l(t,m),(F,n)=>(f(),y(L,null,[e("div",{ref_key:"el",ref:a,style:{height:"21rem"}},null,512),x,e("div",null,[i(" Color: "),g(e("select",{"onUpdate:modelValue":n[0]||(n[0]=d=>o.value=d)},z,512),[[v,o.value]]),i(" Selected: "+h(o.value),1)])],64))}});export{G as default};