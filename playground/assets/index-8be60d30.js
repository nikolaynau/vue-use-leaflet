import{t,b,l as k,i as n}from"./index-aea1fb4f.js";import{h as i}from"./index-dbeeb41e.js";function M(L,g={}){const{iconRetinaUrl:m,iconAnchor:S,iconSize:R,shadowUrl:z,shadowRetinaUrl:A,shadowSize:E,shadowAnchor:I,className:y,factory:N,...x}=g,l=t(L),u=t(m),f=t(S),h=t(R),w=t(z),d=t(A),v=t(E),p=t(I),_=t(y),e=b(O,{watch:l});function O(){const o=typeof N=="function"?N(C()):new k.Icon(C());return $(o)}function C(){const o={...x};return o.iconUrl=l.value,n(u)&&(o.iconRetinaUrl=u.value),n(f)&&(o.iconAnchor=f.value),n(h)&&(o.iconSize=h.value),n(w)&&(o.shadowUrl=w.value),n(d)&&(o.shadowRetinaUrl=d.value),n(v)&&(o.shadowSize=v.value),n(p)&&(o.shadowAnchor=p.value),n(_)&&(o.className=_.value),o}function $(o){const a=o.createIcon,c=o.createShadow;return o.createIcon=function(U){return this._iconElement=a.call(this,U),this._iconElement},o.createShadow=function(U){return this._shadowElement=c.call(this,U),this._shadowElement},o}function r(o,a){const c=o[`_${a}Element`];c instanceof HTMLImageElement&&(c.src=o._getIconUrl(a))}function s(o,a){const c=o[`_${a}Element`];c&&o._setIconStyles(c,a)}return i(l,o=>{n(e)&&(e.value.options.iconUrl=o??"",r(e.value,"icon"))}),n(m)&&i(u,o=>{n(e)&&(e.value.options.iconRetinaUrl=o??"",r(e.value,"icon"))}),n(R)&&i(h,o=>{n(e)&&(e.value.options.iconSize=o,s(e.value,"icon"))}),n(S)&&i(f,o=>{n(e)&&(e.value.options.iconAnchor=o,s(e.value,"icon"))}),n(z)&&i(w,o=>{n(e)&&(e.value.options.shadowUrl=o??"",r(e.value,"shadow"))}),n(A)&&i(d,o=>{n(e)&&(e.value.options.shadowRetinaUrl=o??"",r(e.value,"shadow"))}),n(E)&&i(v,o=>{n(e)&&(e.value.options.shadowSize=o,s(e.value,"shadow"))}),n(I)&&i(p,o=>{n(e)&&(e.value.options.shadowAnchor=o,s(e.value,"shadow"))}),n(y)&&i(_,o=>{n(e)&&(e.value.options.className=o,s(e.value,"icon"),s(e.value,"shadow"))}),e}export{M as u};
