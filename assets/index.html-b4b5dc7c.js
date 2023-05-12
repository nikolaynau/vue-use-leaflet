import{_ as l,M as t,p as c,q as i,N as a,V as r,R as n,t as s,a1 as u}from"./framework-5866ffd3.js";const k={},d=n("h1",{id:"useleafletlayertooltip",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#useleafletlayertooltip","aria-hidden":"true"},"#"),s(" useLeafletLayerTooltip")],-1),v=n("p",null,"Used to bind a tooltip to layer (marker, path, etc).",-1),m=n("h2",{id:"demo",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#demo","aria-hidden":"true"},"#"),s(" Demo")],-1),b=u(`<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>
  useLeafletMap<span class="token punctuation">,</span>
  useLeafletTileLayer<span class="token punctuation">,</span>
  useLeafletDisplayLayer<span class="token punctuation">,</span>
  useLeafletMarker<span class="token punctuation">,</span>
  useLeafletLayerTooltip
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-use-leaflet&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> el <span class="token operator">=</span> ref<span class="token operator">&lt;</span>HTMLElement <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token function">useLeafletMap</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> tileLayer <span class="token operator">=</span> <span class="token function">useLeafletTileLayer</span><span class="token punctuation">(</span>
  <span class="token string">&#39;https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png&#39;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">useLeafletDisplayLayer</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> tileLayer<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create marker</span>
<span class="token keyword">const</span> marker <span class="token operator">=</span> <span class="token function">useLeafletMarker</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// bind tooltip to marker</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> visible<span class="token punctuation">,</span> toggle <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useLeafletLayerTooltip</span><span class="token punctuation">(</span>marker<span class="token punctuation">,</span> <span class="token string">&#39;Text&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">visible</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// display marker and tooltip</span>
<span class="token function">useLeafletDisplayLayer</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> marker<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// visible.value = false; // hide tooltip</span>
<span class="token comment">// toggle(); // show/hide tooltip</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>el<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 250px</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="type-declarations" tabindex="-1"><a class="header-anchor" href="#type-declarations" aria-hidden="true">#</a> Type Declarations</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">UseLeafletLayerTooltipOptions</span>
  <span class="token keyword">extends</span> <span class="token class-name">Omit<span class="token operator">&lt;</span>
    TooltipOptions<span class="token punctuation">,</span>
    <span class="token string">&#39;offset&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;direction&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;opacity&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;className&#39;</span>
  <span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  visible<span class="token operator">?</span><span class="token operator">:</span> MaybeRef<span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  offset<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span>PointExpression <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  direction<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span>Direction <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  opacity<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  className<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  defOptions<span class="token operator">?</span><span class="token operator">:</span> TooltipOptions<span class="token punctuation">;</span>
  autoBind<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  updateSources<span class="token operator">?</span><span class="token operator">:</span> UpdateWatchSource<span class="token operator">&lt;</span>Layer<span class="token operator">&gt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  dispose<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">UseLeafletLayerTooltipReturn</span> <span class="token punctuation">{</span>
  visible<span class="token operator">:</span> Ref<span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  tooltip<span class="token operator">:</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> Tooltip <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function-variable function">bind</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token function-variable function">unbind</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token function-variable function">open</span><span class="token operator">:</span> <span class="token punctuation">(</span>latlng<span class="token operator">?</span><span class="token operator">:</span> LatLngExpression<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token function-variable function">close</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token function-variable function">toggle</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token function-variable function">isOpened</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">useLeafletLayerTooltip</span><span class="token punctuation">(</span>
  source<span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span>Layer <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  content<span class="token operator">?</span><span class="token operator">:</span> MaybeRef<span class="token operator">&lt;</span>
    <span class="token punctuation">(</span><span class="token punctuation">(</span>layer<span class="token operator">:</span> Layer<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Content<span class="token punctuation">)</span> <span class="token operator">|</span> Tooltip <span class="token operator">|</span> Content <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span>
  <span class="token operator">&gt;</span><span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> UseLeafletLayerTooltipOptions
<span class="token punctuation">)</span><span class="token operator">:</span> UseLeafletLayerTooltipReturn<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="source" tabindex="-1"><a class="header-anchor" href="#source" aria-hidden="true">#</a> Source</h2>`,5),f={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerTooltip/index.ts",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerTooltip/demo.vue",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerTooltip/index.md",target:"_blank",rel:"noopener noreferrer"};function h(L,w){const p=t("Demo"),o=t("ClientOnly"),e=t("ExternalLinkIcon");return c(),i("div",null,[d,v,m,a(o,null,{default:r(()=>[a(p,{name:"useLeafletLayerTooltip","source-url":"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerTooltip/demo.vue"})]),_:1}),b,n("p",null,[n("a",f,[s("Source"),a(e)]),s(" • "),n("a",y,[s("Demo"),a(e)]),s(" • "),n("a",g,[s("Docs"),a(e)])])])}const x=l(k,[["render",h],["__file","index.html.vue"]]);export{x as default};
