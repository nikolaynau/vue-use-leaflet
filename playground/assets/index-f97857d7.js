import{t as i,l as m,n as o,d as M,i as f,c as E}from"./index-e0a256b7.js";import{I as R}from"./index-ea24a0b6.js";function N(w,x={}){const{icon:h,opacity:b,zIndexOffset:O,draggable:l,factory:v,dispose:I,defOptions:_,updateSources:t=[],...k}=x,n=i(w),d=i(h),p=i(b),u=i(O),g=i(l),r=_??m.Marker.prototype.options;t.push({watch:n,handler:(e,a)=>{o(a)&&e.setLatLng(a)}}),o(h)&&t.push({watch:d,handler:(e,a)=>{e.setIcon(a??r.icon)}}),o(b)&&t.push({watch:p,handler:(e,a)=>{e.setOpacity(a??r.opacity)}}),o(O)&&t.push({watch:u,handler:(e,a)=>{e.setZIndexOffset(a??r.zIndexOffset)}}),o(l)&&t.push({watch:g,handler:(e,a)=>{const{dragging:s,options:L}=e;L.draggable=a??r.draggable,L.draggable?s&&!s.enabled()&&s.enable():s&&s.enabled()&&s.disable()}});const c=M(z,{watch:n,updateSources:t,dispose:I});function z(){return v?v(n.value,y()):new m.Marker(n.value,y())}function y(){const e={...k};return f(d)&&(e.icon=d.value),f(p)&&(e.opacity=p.value),f(u)&&(e.zIndexOffset=u.value),f(g)&&(e.draggable=g.value),e}return o(l)&&E(c,"moveend",()=>{!R(n)&&f(c)&&(n.value=c.value.getLatLng().clone())}),c}export{N as u};
