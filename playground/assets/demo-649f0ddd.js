import{d as O,i,r as V,z as v,o as s,c as a,a as r,f as y,j as _,k as f,F as m,b as g,t as u,u as k}from"./index-8fcbc575.js";import{u as b}from"./index-aa5283be.js";import{u as p}from"./index-6385ef3e.js";import{u as L}from"./index-82d6fea3.js";import{u as D}from"./index-b9ada6be.js";import{a as F}from"./index-f216a23f.js";import{_ as I}from"./_plugin-vue_export-helper-c27b6911.js";const N={class:"section"},T=["value"],U={class:"section"},j=["value"],w=O({__name:"demo",setup(E){const d=i(null),x=b(d),S=p("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),M=p("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",{subdomains:["mt0","mt1","mt2","mt3"]}),h=p("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"),B=L([0,0]),C=L([-10,-10]),c=V([{name:"Open Street Map",layer:S},{name:"Google Streets",layer:M},{name:"Arc Gis",layer:h},{name:"Marker A",layer:B,overlay:!0},{name:"Marker B",layer:C,overlay:!0}]),z=v(()=>c.filter(({overlay:t})=>!t).map(({name:t})=>t)),A=v(()=>c.filter(({overlay:t})=>t).map(({name:t})=>t)),o=i("Open Street Map"),l=i([]),G=D(c,{currentBaseLayer:o,currentOverlays:l});return F(x,G),(t,n)=>(s(),a(m,null,[r("div",{ref_key:"el",ref:d,style:{height:"230px"}},null,512),r("div",N,[y(" Current Base Layer: "),_(r("select",{"onUpdate:modelValue":n[0]||(n[0]=e=>o.value=e)},[(s(!0),a(m,null,g(k(z),e=>(s(),a("option",{key:e,value:e},u(e),9,T))),128))],512),[[f,o.value]]),r("div",null,"Selected: "+u(o.value),1)]),r("div",U,[y(" Current Overlays: "),_(r("select",{"onUpdate:modelValue":n[1]||(n[1]=e=>l.value=e),multiple:""},[(s(!0),a(m,null,g(k(A),e=>(s(),a("option",{key:e,value:e},u(e),9,j))),128))],512),[[f,l.value]]),r("div",null,"Selected: "+u(l.value),1)])],64))}});const R=I(w,[["__scopeId","data-v-7e7e2653"]]);export{R as default};
