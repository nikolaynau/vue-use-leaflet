import{n as l,e as x}from"./index-da82d77a.js";import{h as y}from"./index-2e15105f.js";function O(c,n,m={}){const{enabled:a=!0,diffFn:h,update:r,add:f,remove:i,watchOptions:p}=m,v=y(()=>[...x(c)],(t,e)=>{if(a)if(l(e)){const{add:o,remove:s}=(h??D)(t,e);i==null||i(s),f==null||f(o)}else f==null||f(t);else r==null||r(t,e)},{deep:!0,...p});function D(t,e){return{add:u(t,e,n),remove:u(e,t,n)}}function u(t,e,o){return t.filter(s=>!e.some(b=>o(s,b)))}return v}export{O as u};