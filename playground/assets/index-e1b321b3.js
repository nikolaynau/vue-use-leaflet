import{t as m,l as p}from"./index-1ea82280.js";import{u as d}from"./index-677431ed.js";import{s as b,h as v,m as w,u as R}from"./index-fde67865.js";function C(l={}){const{disabled:i,factory:n,dispose:c=!0,...t}=l,o=b(null),a=m(i);function f(){const e=n?n(t):new p.Control.Zoom(t);o.value=w(e)}function s(){R(a)?u():r()}function r(){const e=o.value;e&&typeof e.enable=="function"&&e._map&&e.enable()}function u(){const e=o.value;e&&typeof e.disable=="function"&&e._map&&e.disable()}return d(o,{dispose:c}),v(a,s),f(),s(),o}export{C as u};
