import{d as O,i,r as V,y,o as s,c as a,a as r,f as v,j as _,k as f,F as p,b as g,t as c,u as k}from"./index-4806f730.js";import{u as w,a as m,b as L,l as x}from"./index-3c2b32e6.js";import{u as D}from"./index-b617cb32.js";import{a as E}from"./index-3afbeb48.js";import{_ as F}from"./_plugin-vue_export-helper-c27b6911.js";import"./index-6f2b982a.js";const I={class:"section"},N=["value"],T={class:"section"},U=["value"],j=O({__name:"demo",setup(W){const d=i(null),S=w(d),M=m("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),h=m("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",{subdomains:["mt0","mt1","mt2","mt3"]}),B=m("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"),C=L(()=>new x.Marker([0,0])),b=L(()=>new x.Marker([-10,-10])),u=V([{name:"Open Street Map",layer:M},{name:"Google Streets",layer:h},{name:"Arc Gis",layer:B},{name:"Marker A",layer:C,overlay:!0},{name:"Marker B",layer:b,overlay:!0}]),z=y(()=>u.filter(({overlay:t})=>!t).map(({name:t})=>t)),A=y(()=>u.filter(({overlay:t})=>t).map(({name:t})=>t)),o=i("Open Street Map"),l=i([]),G=D(u,{currentBaseLayer:o,currentOverlays:l});return E(S,G),(t,n)=>(s(),a(p,null,[r("div",{ref_key:"el",ref:d,style:{height:"250px"}},null,512),r("div",I,[v(" Current Base Layer: "),_(r("select",{"onUpdate:modelValue":n[0]||(n[0]=e=>o.value=e)},[(s(!0),a(p,null,g(k(z),e=>(s(),a("option",{key:e,value:e},c(e),9,N))),128))],512),[[f,o.value]]),r("div",null,"Selected: "+c(o.value),1)]),r("div",T,[v(" Current Overlays: "),_(r("select",{"onUpdate:modelValue":n[1]||(n[1]=e=>l.value=e),multiple:""},[(s(!0),a(p,null,g(k(A),e=>(s(),a("option",{key:e,value:e},c(e),9,U))),128))],512),[[f,l.value]]),r("div",null,"Selected: "+c(l.value),1)])],64))}});const R=F(j,[["__scopeId","data-v-acc6c683"]]);export{R as default};
