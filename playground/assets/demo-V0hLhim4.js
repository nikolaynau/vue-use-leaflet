import{t as i,n as H,f as I,l as M,i as O,u as C,w as b}from"./index-XMFbUhFf.js";import{l as r,n as l,d as A,p as k,i as E,o as Z,c as G}from"./index-sEMHmT-4.js";import{u as R}from"./index-_zfS4-SC.js";function V(S,o,u={}){const{opacity:n,zIndex:p,className:m,factory:c,dispose:v,defOptions:_,updateSources:t=[],...f}=u,d=i(S),h=i(o),w=i(n),y=i(p),g=i(m),x=_??r.SVGOverlay.prototype.options;t.push({watch:d,handler:(e,s)=>{if(s instanceof SVGElement){const a=e;a._url=s,a._initImage(),a._updateOpacity(),a._updateZIndex(),a._map&&a._reset()}}}),t.push({watch:h,handler:(e,s)=>{s&&e.setBounds(l(s))}}),H(n)&&t.push({watch:w,handler:(e,s)=>{e.setOpacity(s??x.opacity)}}),H(p)&&t.push({watch:y,handler:(e,s)=>{e.setZIndex(s??x.zIndex)}}),H(m)&&t.push({watch:g,handler:(e,s,a)=>{e.options.className=s??x.className;const z=e.getElement();z&&(a&&z.classList.remove(...r.Util.splitWords(a)),e.options.className&&z.classList.add(...r.Util.splitWords(e.options.className)))}});const L=I(N,{watch:M(d,h),updateSources:t,dispose:v});function N(){return c?c(l(d.value),l(h.value),B()):new r.SVGOverlay(l(d.value),l(h.value),B())}function B(){const e={...f};return O(w)&&(e.opacity=w.value),O(y)&&(e.zIndex=y.value),O(g)&&(e.className=g.value),e}return L}const D=512,U=512,T=A({__name:"demo",setup(S){const o=k(()=>[c(0,0),c(D,U)]),u=E(null),n=C(u,{center:[0,0],zoom:0,crs:r.CRS.Simple,minZoom:-2,maxZoom:4,maxBounds:o.value,maxBoundsViscosity:.5}),p=E(_()),m=V(p,o);R(n,m),b(n,()=>{v(n.value)});function c(t,f){return[f,t]}function v(t){t.fitBounds(o.value,{animate:!1})}function _(){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t.setAttribute("viewBox","0 0 512 512"),t.innerHTML='<path fill="#01BAEF" d="M256 480c16.7 0 40.4-14.4 61.9-57.3c9.9-19.8 18.2-43.7 24.1-70.7H170c5.9 27 14.2 50.9 24.1 70.7C215.6 465.6 239.3 480 256 480zM164.3 320H347.7c2.8-20.2 4.3-41.7 4.3-64s-1.5-43.8-4.3-64H164.3c-2.8 20.2-4.3 41.7-4.3 64s1.5 43.8 4.3 64zM170 160H342c-5.9-27-14.2-50.9-24.1-70.7C296.4 46.4 272.7 32 256 32s-40.4 14.4-61.9 57.3C184.2 109.1 175.9 133 170 160zm210 32c2.6 20.5 4 41.9 4 64s-1.4 43.5-4 64h90.8c6-20.3 9.3-41.8 9.3-64s-3.2-43.7-9.3-64H380zm78.5-32c-25.9-54.5-73.1-96.9-130.9-116.3c21 28.3 37.6 68.8 47.2 116.3h83.8zm-321.1 0c9.6-47.6 26.2-88 47.2-116.3C126.7 63.1 79.4 105.5 53.6 160h83.7zm-96 32c-6 20.3-9.3 41.8-9.3 64s3.2 43.7 9.3 64H132c-2.6-20.5-4-41.9-4-64s1.4-43.5 4-64H41.3zM327.5 468.3c57.8-19.5 105-61.8 130.9-116.3H374.7c-9.6 47.6-26.2 88-47.2 116.3zm-143 0c-21-28.3-37.5-68.8-47.2-116.3H53.6c25.9 54.5 73.1 96.9 130.9 116.3zM256 512A256 256 0 1 1 256 0a256 256 0 1 1 0 512z"/>',t}return(t,f)=>(Z(),G("div",{ref_key:"el",ref:u,style:{height:"25rem"}},null,512))}});export{T as default};
