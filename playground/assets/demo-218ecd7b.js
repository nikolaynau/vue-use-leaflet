import{t as u,l as E,n as p,i as h,g as Q,u as X}from"./index-fe65265e.js";import{u as Y}from"./index-d71a611f.js";import{u as Z}from"./index-16f278b2.js";import{s as j,i as q,z as tt,l as W,h as $,m as ot,d as et,o as it,c as nt,a as l,u as b,f as st,t as lt,F as at}from"./index-87347a2c.js";import{u as A}from"./index-186b9942.js";function ut(M,f,T={}){const{offset:_,direction:r,opacity:c,className:d,defOptions:y,visible:R=!1,updateSources:i=[],dispose:m=!0,...G}=T,k=j(null),n=u(M),U=q(f),v=u(R),w=u(_),L=u(r),N=u(c),O=u(d),a=y??E.Tooltip.prototype.options,H=tt({get:()=>k.value,set:t=>{t||x()}});i.push({watch:v,handler:(t,o)=>{o?C():S()}}),p(_)&&i.push({watch:w,handler:(t,o)=>{const e=t.getTooltip();e&&(e.options.offset=W(o)??a.offset,e.update())}}),p(r)&&i.push({watch:L,handler:(t,o)=>{const e=t.getTooltip();e&&(e.options.direction=o??a.direction,e.update())}}),p(c)&&i.push({watch:N,handler:(t,o)=>{const e=t.getTooltip();e&&e.setOpacity(o??a.opacity)}}),p(f)&&i.push({watch:U,handler:(t,o)=>{t.setTooltipContent(o??a.content)}}),p(d)&&i.push({watch:O,handler:(t,o,e)=>{const s=t.getTooltip();if(!s)return;s.options.className=o??a.className;const g=s.getElement();g&&(e&&g.classList.remove(...E.Util.splitWords(e)),s.options.className&&g.classList.add(...E.Util.splitWords(s.options.className)))}});function B(){if(h(n)){n.value.bindTooltip(U.value??a.content,K()).on("add",V).on("tooltipopen",z).on("tooltipclose",F);const t=n.value.getTooltip();t&&(k.value=ot(t))}}function x(){D(n.value)}function D(t){p(t)&&t.unbindTooltip().off("add",V).off("tooltipopen",z).off("tooltipclose",F),k.value=null}function C(t){var o;(o=n.value)==null||o.openTooltip(t)}function S(){var t;(t=n.value)==null||t.closeTooltip()}function I(){var t;n.value._map&&((t=n.value)==null||t.toggleTooltip())}function J(){var t;return(t=n.value)!=null&&t.getTooltip()?n.value.isTooltipOpen():!1}function z(){v.value=!0}function F(){v.value=!1}function V(){v.value&&C()}function K(){const t={...G};return h(w)&&(t.offset=W(w.value)),h(L)&&(t.direction=L.value),h(N)&&(t.opacity=N.value),h(O)&&(t.className=O.value),t}function P(t){const{handler:o,options:e}=t;$(t.watch,(s,g)=>{n.value&&o(n.value,s,g)},{...e})}return $(n,(t,o)=>{o&&D(o),t&&B()},{immediate:!0}),i.forEach(P),m&&Q(()=>{x()}),{visible:v,tooltip:H,bind:B,unbind:x,open:C,close:S,toggle:I,isOpened:J}}const pt=l("br",null,null,-1),ft=l("br",null,null,-1),rt=l("br",null,null,-1),ht=et({__name:"demo",setup(M){const f=q(null),T=X(f),_=Y("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");A(T,_);const r=Z([0,0]),{visible:c,toggle:d}=ut(r,"Text",{visible:!0}),y=A(T,r);return(R,i)=>(it(),nt(at,null,[l("div",{ref_key:"el",ref:f,style:{height:"21rem"}},null,512),pt,l("button",{onClick:i[0]||(i[0]=(...m)=>b(d)&&b(d)(...m))},"Toggle Tooltip"),st(" Visible: "+lt(b(c))+" ",1),ft,l("button",{onClick:i[1]||(i[1]=m=>b(y)())},"Toggle Marker"),rt,l("button",{onClick:i[2]||(i[2]=m=>c.value=!0)},"Set Visible")],64))}});export{ht as default};
