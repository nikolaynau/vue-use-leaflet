import{_ as l,M as t,p as c,q as r,R as n,t as s,N as a,V as i,a1 as u}from"./framework-5866ffd3.js";const k={},d=n("h1",{id:"useleafletwmstilelayer",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#useleafletwmstilelayer","aria-hidden":"true"},"#"),s(" useLeafletWmsTileLayer")],-1),m={href:"https://en.wikipedia.org/wiki/Web_Map_Service",target:"_blank",rel:"noopener noreferrer"},v=n("h2",{id:"demo",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#demo","aria-hidden":"true"},"#"),s(" Demo")],-1),y=u(`<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>
  useLeafletMap<span class="token punctuation">,</span>
  useLeafletWmsTileLayer<span class="token punctuation">,</span>
  useLeafletDisplayLayer
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-use-leaflet&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> el <span class="token operator">=</span> ref<span class="token operator">&lt;</span>HTMLElement <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token function">useLeafletMap</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create WMS tile layer</span>
<span class="token keyword">const</span> wms <span class="token operator">=</span> <span class="token function">useLeafletWmsTileLayer</span><span class="token punctuation">(</span>
  <span class="token string">&#39;http://ows.mundialis.de/services/service?&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">layers</span><span class="token operator">:</span> <span class="token string">&#39;TOPO-OSM-WMS&#39;</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// display WMS tile layer</span>
<span class="token function">useLeafletDisplayLayer</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> wms<span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>el<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 250px</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="type-declarations" tabindex="-1"><a class="header-anchor" href="#type-declarations" aria-hidden="true">#</a> Type Declarations</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">UseLeafletWmsTileLayerOptions</span> <span class="token keyword">extends</span> <span class="token class-name">WMSOptions</span> <span class="token punctuation">{</span>
  updateSources<span class="token operator">?</span><span class="token operator">:</span> UpdateWatchSource<span class="token operator">&lt;</span>TileLayer<span class="token punctuation">.</span><span class="token constant">WMS</span><span class="token operator">&gt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  factory<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> TileLayer<span class="token punctuation">.</span><span class="token constant">WMS</span><span class="token punctuation">;</span>
  defParams<span class="token operator">?</span><span class="token operator">:</span> WMSParams<span class="token punctuation">;</span>
  dispose<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">UseLeafletWmsTileLayerReturn</span> <span class="token operator">=</span> Ref<span class="token operator">&lt;</span>TileLayer<span class="token punctuation">.</span><span class="token constant">WMS</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">useLeafletWmsTileLayer</span><span class="token punctuation">(</span>
  url<span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  params<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span>WMSParams <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> UseLeafletWmsTileLayerOptions
<span class="token punctuation">)</span><span class="token operator">:</span> UseLeafletWmsTileLayerReturn<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="source" tabindex="-1"><a class="header-anchor" href="#source" aria-hidden="true">#</a> Source</h2>`,5),b={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletWmsTileLayer/index.ts",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletWmsTileLayer/demo.vue",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletWmsTileLayer/index.md",target:"_blank",rel:"noopener noreferrer"};function g(_,L){const e=t("ExternalLinkIcon"),p=t("Demo"),o=t("ClientOnly");return c(),r("div",null,[d,n("p",null,[s("Used to display "),n("a",m,[s("WMS"),a(e)]),s(" services as tile layers on the map.")]),v,a(o,null,{default:i(()=>[a(p,{name:"useLeafletWmsTileLayer","source-url":"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletWmsTileLayer/demo.vue"})]),_:1}),y,n("p",null,[n("a",b,[s("Source"),a(e)]),s(" • "),n("a",f,[s("Demo"),a(e)]),s(" • "),n("a",h,[s("Docs"),a(e)])])])}const W=l(k,[["render",g],["__file","index.html.vue"]]);export{W as default};