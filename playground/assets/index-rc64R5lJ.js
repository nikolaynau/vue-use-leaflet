import{n as l,b as x}from"./index-XMFbUhFf.js";import{h as y}from"./index-sEMHmT-4.js";function O(c,n,m={}){const{enabled:a=!0,diffFn:h,update:r,add:f,remove:i,watchOptions:p}=m,b=y(()=>[...x(c)],(t,e)=>{if(a)if(l(e)){const{add:o,remove:s}=(h??v)(t,e);i==null||i(s),f==null||f(o)}else f==null||f(t);else r==null||r(t,e)},{deep:!0,...p});function v(t,e){return{add:u(t,e,n),remove:u(e,t,n)}}function u(t,e,o){return t.filter(s=>!e.some(D=>o(s,D)))}return b}export{O as u};