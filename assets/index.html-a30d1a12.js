import{_ as l,M as t,p as c,q as r,N as a,V as i,R as n,t as s,a1 as u}from"./framework-5866ffd3.js";const k={},d=n("h1",{id:"useleafletmap",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#useleafletmap","aria-hidden":"true"},"#"),s(" useLeafletMap")],-1),v=n("p",null,"Create a leaflet map.",-1),m=n("h2",{id:"demo",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#demo","aria-hidden":"true"},"#"),s(" Demo")],-1),b=u(`<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>
  useLeafletTileLayer<span class="token punctuation">,</span>
  useLeafletDisplayLayer<span class="token punctuation">,</span>
  useLeafletMap
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-use-leaflet&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> el <span class="token operator">=</span> ref<span class="token operator">&lt;</span>HTMLElement <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token function">useLeafletMap</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> tileLayer <span class="token operator">=</span> <span class="token function">useLeafletTileLayer</span><span class="token punctuation">(</span>
  <span class="token string">&#39;https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png&#39;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">useLeafletDisplayLayer</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> tileLayer<span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>el<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 250px</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="type-declarations" tabindex="-1"><a class="header-anchor" href="#type-declarations" aria-hidden="true">#</a> Type Declarations</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">UseLeafletMapOptions</span>
  <span class="token keyword">extends</span> <span class="token class-name">Omit<span class="token operator">&lt;</span>MapOptions<span class="token punctuation">,</span> <span class="token string">&#39;center&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;zoom&#39;</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  center<span class="token operator">?</span><span class="token operator">:</span> MaybeComputedRef<span class="token operator">&lt;</span>LatLngExpression <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  zoom<span class="token operator">?</span><span class="token operator">:</span> MaybeComputedRef<span class="token operator">&lt;</span><span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  bounds<span class="token operator">?</span><span class="token operator">:</span> MaybeComputedRef<span class="token operator">&lt;</span>LatLngBoundsExpression <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  useFly<span class="token operator">?</span><span class="token operator">:</span> MaybeComputedRef<span class="token operator">&lt;</span><span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  flushSync<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  factory<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Map<span class="token punctuation">;</span>
  dispose<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  onViewChanged<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>event<span class="token operator">:</span> ViewChangedEvent<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">UseLeafletMapReturn</span> <span class="token operator">=</span> Ref<span class="token operator">&lt;</span>Map <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">ViewChangedEvent</span> <span class="token keyword">extends</span> <span class="token class-name">LeafletEvent</span> <span class="token punctuation">{</span>
  center<span class="token operator">:</span> LatLng<span class="token punctuation">;</span>
  zoom<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  bounds<span class="token operator">:</span> LatLngBounds<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">useLeafletMap</span><span class="token punctuation">(</span>
  element<span class="token operator">:</span> MaybeComputedElementRef<span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> UseLeafletMapOptions
<span class="token punctuation">)</span><span class="token operator">:</span> UseLeafletMapReturn<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="source" tabindex="-1"><a class="header-anchor" href="#source" aria-hidden="true">#</a> Source</h2>`,5),f={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMap/index.ts",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMap/demo.vue",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMap/index.md",target:"_blank",rel:"noopener noreferrer"};function y(_,L){const p=t("Demo"),o=t("ClientOnly"),e=t("ExternalLinkIcon");return c(),r("div",null,[d,v,m,a(o,null,{default:i(()=>[a(p,{name:"useLeafletMap","source-url":"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMap/demo.vue"})]),_:1}),b,n("p",null,[n("a",f,[s("Source"),a(e)]),s(" • "),n("a",g,[s("Demo"),a(e)]),s(" • "),n("a",h,[s("Docs"),a(e)])])])}const x=l(k,[["render",y],["__file","index.html.vue"]]);export{x as default};