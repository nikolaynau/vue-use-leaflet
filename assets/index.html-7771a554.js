import{_ as l,M as t,p as c,q as r,N as a,V as i,R as n,t as s,a1 as u}from"./framework-5866ffd3.js";const k={},d=n("h1",{id:"useleafleticon",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#useleafleticon","aria-hidden":"true"},"#"),s(" useLeafletIcon")],-1),v=n("p",null,"Represents an icon to provide when creating a marker.",-1),m=n("h2",{id:"demo",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#demo","aria-hidden":"true"},"#"),s(" Demo")],-1),b=u(`<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>
  useLeafletMap<span class="token punctuation">,</span>
  useLeafletTileLayer<span class="token punctuation">,</span>
  useLeafletDisplayLayer<span class="token punctuation">,</span>
  useLeafletMarker<span class="token punctuation">,</span>
  useLeafletIcon
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-use-leaflet&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> el <span class="token operator">=</span> ref<span class="token operator">&lt;</span>HTMLElement <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token function">useLeafletMap</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> tileLayer <span class="token operator">=</span> <span class="token function">useLeafletTileLayer</span><span class="token punctuation">(</span>
  <span class="token string">&#39;https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png&#39;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">useLeafletDisplayLayer</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> tileLayer<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// icon image url</span>
<span class="token keyword">const</span> iconUrl <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;custom/marker-icon.png&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create icon</span>
<span class="token keyword">const</span> icon <span class="token operator">=</span> <span class="token function">useLeafletIcon</span><span class="token punctuation">(</span>iconUrl<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">iconSize</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">iconAnchor</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create marker with icon</span>
<span class="token keyword">const</span> marker <span class="token operator">=</span> <span class="token function">useLeafletMarker</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> icon <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// display icon</span>
<span class="token function">useLeafletDisplayLayer</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> marker<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// change icon image</span>
<span class="token comment">// iconUrl.value = &#39;custom/marker-icon-alt.png&#39;;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>el<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 250px</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="type-declarations" tabindex="-1"><a class="header-anchor" href="#type-declarations" aria-hidden="true">#</a> Type Declarations</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">UseLeafletIconOptions</span>
  <span class="token keyword">extends</span> <span class="token class-name">Omit<span class="token operator">&lt;</span>
    IconOptions<span class="token punctuation">,</span>
    <span class="token operator">|</span> <span class="token string">&#39;iconUrl&#39;</span>
    <span class="token operator">|</span> <span class="token string">&#39;iconRetinaUrl&#39;</span>
    <span class="token operator">|</span> <span class="token string">&#39;iconSize&#39;</span>
    <span class="token operator">|</span> <span class="token string">&#39;iconAnchor&#39;</span>
    <span class="token operator">|</span> <span class="token string">&#39;shadowUrl&#39;</span>
    <span class="token operator">|</span> <span class="token string">&#39;shadowRetinaUrl&#39;</span>
    <span class="token operator">|</span> <span class="token string">&#39;shadowSize&#39;</span>
    <span class="token operator">|</span> <span class="token string">&#39;shadowAnchor&#39;</span>
    <span class="token operator">|</span> <span class="token string">&#39;className&#39;</span>
  <span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  iconRetinaUrl<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  iconSize<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span>PointExpression <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  iconAnchor<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span>PointExpression <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  shadowUrl<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  shadowRetinaUrl<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  shadowSize<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span>PointExpression <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  shadowAnchor<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span>PointExpression <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  className<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  factory<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Icon<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">UseLeafletIconReturn</span> <span class="token operator">=</span> Ref<span class="token operator">&lt;</span>Icon <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">useLeafletIcon</span><span class="token punctuation">(</span>
  iconUrl<span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> UseLeafletIconOptions
<span class="token punctuation">)</span><span class="token operator">:</span> UseLeafletIconReturn<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="source" tabindex="-1"><a class="header-anchor" href="#source" aria-hidden="true">#</a> Source</h2>`,5),f={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletIcon/index.ts",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletIcon/demo.vue",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletIcon/index.md",target:"_blank",rel:"noopener noreferrer"};function h(w,_){const p=t("Demo"),o=t("ClientOnly"),e=t("ExternalLinkIcon");return c(),r("div",null,[d,v,m,a(o,null,{default:i(()=>[a(p,{name:"useLeafletIcon","source-url":"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletIcon/demo.vue"})]),_:1}),b,n("p",null,[n("a",f,[s("Source"),a(e)]),s(" • "),n("a",g,[s("Demo"),a(e)]),s(" • "),n("a",y,[s("Docs"),a(e)])])])}const x=l(k,[["render",h],["__file","index.html.vue"]]);export{x as default};