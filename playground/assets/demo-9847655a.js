import{t as s,l as f,n as d,d as j,e as D,i as h,u as F}from"./index-432443ae.js";import{u as R}from"./index-140bbb33.js";import{z as I,d as S,i as k,o as W,c as A,a as N,F as M}from"./index-d33f0b91.js";import{u as U}from"./index-d22fc539.js";function T(O,n,i={}){const{opacity:r,alt:o,zIndex:c,className:g,updateSources:a=[],factory:y,dispose:B,...E}=i,p=s(O),u=s(n),_=s(r),v=s(o),L=s(c),w=s(g),m=f.ImageOverlay.prototype.options;a.push({watch:p,handler:(e,t)=>{t&&e.setUrl(t)}}),a.push({watch:u,handler:(e,t)=>{t&&e.setBounds(I(t))}}),d(r)&&a.push({watch:_,handler:(e,t)=>{e.setOpacity(t??m.opacity)}}),d(o)&&a.push({watch:v,handler:(e,t)=>{const l=e.getElement();l&&(e.options.alt=t??m.alt,l.alt=e.options.alt)}}),d(c)&&a.push({watch:L,handler:(e,t)=>{e.setZIndex(t??m.zIndex)}}),d(g)&&a.push({watch:w,handler:(e,t,l)=>{const x=e.getElement();x&&(l&&x.classList.remove(...f.Util.splitWords(l)),e.options.className=t??m.className,e.options.className&&x.classList.add(...f.Util.splitWords(e.options.className)))}});const b=j(C,{watch:D(p,u),updateSources:a,dispose:B});function C(){return y?y(p.value,I(u.value),z()):new f.ImageOverlay(p.value,I(u.value),z())}function z(){const e={...E};return h(_)&&(e.opacity=_.value),h(v)&&(e.alt=v.value),h(L)&&(e.zIndex=L.value),h(w)&&(e.className=w.value),e}return b}const Z=N("br",null,null,-1),J=S({__name:"demo",setup(O){const n=k(null),i=F(n,{center:[-10,-10],zoom:3}),r=R("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");U(i,r);const o=k("images/img1.jpg"),c=T(o,[[0,0],[-20,-20]]);return U(i,c),(g,a)=>(W(),A(M,null,[N("div",{ref_key:"el",ref:n,style:{height:"21rem"}},null,512),Z,N("button",{onClick:a[0]||(a[0]=y=>o.value="images/img2.jpg")},"Change Image")],64))}});export{J as default};
