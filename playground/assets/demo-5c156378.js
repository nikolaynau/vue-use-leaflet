import{t as l,b as C,l as B,i as t,u as D,a as P}from"./index-72e00917.js";import{u as b}from"./index-18ca9fc0.js";import{u as A}from"./index-963073ba.js";import{h as u,d as F,i as N,y as M,o as O,c as T,a as k,t as z,f as V,F as $}from"./index-adca1c1f.js";function E(g,f={}){const{bgPos:a,iconAnchor:m,iconSize:o,className:p,watch:L,factory:v,..._}=f,s=l(g),i=l(a),h=l(m),c=l(o),d=l(p),n=C(I,{watch:L});function I(){const e=typeof v=="function"?v(S()):new B.DivIcon(S());return w(e)}function S(){const e={..._};return t(s)&&(e.html=s.value),t(i)&&(e.bgPos=i.value),t(h)&&(e.iconAnchor=h.value),t(c)&&(e.iconSize=c.value),t(d)&&(e.className=d.value),e}function w(e){const y=e.createIcon;return e.createIcon=function(x){return this._iconElement=y.call(this,x),this._iconElement},e}function r(e){const y=e._iconElement;y&&e.createIcon(y)}return g!=null&&u(s,e=>{t(n)&&(n.value.options.html=e,r(n.value))}),a!=null&&u(i,e=>{t(n)&&(n.value.options.bgPos=e,r(n.value))}),o!=null&&u(c,e=>{t(n)&&(n.value.options.iconSize=e,r(n.value))}),m!=null&&u(h,e=>{t(n)&&(n.value.options.iconAnchor=e,r(n.value))}),p!=null&&u(d,e=>{t(n)&&(n.value.options.className=e,r(n.value))}),n}const R=k("br",null,null,-1),J=F({__name:"demo",setup(g){const f=N(null),a=D(f),m=P("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");A(a,m);const o=N(10),p=M(()=>`<div>${o.value}</div>`),L=E(p,{iconSize:[26,26],iconAnchor:[13,13],className:"counter-marker"}),v=b([0,0],{icon:L});A(a,v);const _=N(null),s=E(_,{iconSize:[20,20],iconAnchor:[10,10],className:"counter-marker"}),i=b([-25,-25],{icon:s});return A(a,i),(h,c)=>(O(),T($,null,[k("div",{ref_key:"el",ref:f,style:{height:"21rem"}},null,512),k("div",{ref_key:"iconEl",ref:_},z(o.value),513),R,k("button",{onClick:c[0]||(c[0]=d=>o.value++)},"Increment Counter"),V(" Counter: "+z(o.value),1)],64))}});export{J as default};
