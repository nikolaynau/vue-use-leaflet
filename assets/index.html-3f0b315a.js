import{_ as c,M as e,p as l,q as i,N as a,V as r,R as n,t as s,a1 as u}from"./framework-5866ffd3.js";const k={},d=n("h1",{id:"useleafletdisplayobject",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#useleafletdisplayobject","aria-hidden":"true"},"#"),s(" useLeafletDisplayObject")],-1),v=n("p",null,"Manage the visibility of a custom object.",-1),m=n("h2",{id:"demo",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#demo","aria-hidden":"true"},"#"),s(" Demo")],-1),b=u(`<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>
  useLeafletMap<span class="token punctuation">,</span>
  useLeafletTileLayer<span class="token punctuation">,</span>
  useLeafletDisplayObject
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-use-leaflet&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> el <span class="token operator">=</span> ref<span class="token operator">&lt;</span>HTMLElement <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token function">useLeafletMap</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> tileLayer <span class="token operator">=</span> <span class="token function">useLeafletTileLayer</span><span class="token punctuation">(</span>
  <span class="token string">&#39;https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png&#39;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> toggle <span class="token operator">=</span> <span class="token function">useLeafletDisplayObject</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> tileLayer<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">show</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> source<span class="token punctuation">.</span><span class="token function">addLayer</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">hide</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> source<span class="token punctuation">.</span><span class="token function">removeLayer</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">shown</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> source<span class="token punctuation">.</span><span class="token function">hasLayer</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// toggle() // hide tile layer</span>
<span class="token comment">// toggle() // show tile layer</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>el<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 250px</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="type-declarations" tabindex="-1"><a class="header-anchor" href="#type-declarations" aria-hidden="true">#</a> Type Declarations</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">UseLeafletDisplayObjectOptions<span class="token operator">&lt;</span>Controls <span class="token keyword">extends</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span> <span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span>
  <span class="token keyword">extends</span> <span class="token class-name">Omit<span class="token operator">&lt;</span>UseLeafletToggleObjectOptions<span class="token operator">&lt;</span>Controls<span class="token punctuation">,</span> <span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token string">&#39;onToggle&#39;</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  show<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>source<span class="token operator">:</span> <span class="token constant">S</span><span class="token punctuation">,</span> target<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  hide<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>source<span class="token operator">:</span> <span class="token constant">S</span><span class="token punctuation">,</span> target<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  shown<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>source<span class="token operator">:</span> <span class="token constant">S</span><span class="token punctuation">,</span> target<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">UseLeafletDisplayObjectReturn</span> <span class="token operator">=</span> UseLeafletToggleObjectReturn<span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">UseLeafletDisplayObjectReturnWithControls</span>
  <span class="token keyword">extends</span> <span class="token class-name">UseLeafletToggleObjectReturnWithControls</span> <span class="token punctuation">{</span>
  show<span class="token operator">:</span> Fn<span class="token punctuation">;</span>
  hide<span class="token operator">:</span> Fn<span class="token punctuation">;</span>
  <span class="token function-variable function">shown</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">useLeafletDisplayObject</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
  source<span class="token operator">:</span> MaybeComputedRef<span class="token operator">&lt;</span><span class="token constant">S</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  target<span class="token operator">:</span> MaybeComputedRef<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> UseLeafletDisplayObjectOptions<span class="token operator">&lt;</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token operator">:</span> UseLeafletDisplayObjectReturn<span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">useLeafletDisplayObject</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
  source<span class="token operator">:</span> MaybeComputedRef<span class="token operator">&lt;</span><span class="token constant">S</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  target<span class="token operator">:</span> MaybeComputedRef<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  options<span class="token operator">:</span> UseLeafletDisplayObjectOptions<span class="token operator">&lt;</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token operator">:</span> UseLeafletDisplayObjectReturnWithControls<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="source" tabindex="-1"><a class="header-anchor" href="#source" aria-hidden="true">#</a> Source</h2>`,5),g={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayObject/index.ts",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayObject/demo.vue",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayObject/index.md",target:"_blank",rel:"noopener noreferrer"};function h(w,_){const p=e("Demo"),o=e("ClientOnly"),t=e("ExternalLinkIcon");return l(),i("div",null,[d,v,m,a(o,null,{default:r(()=>[a(p,{name:"useLeafletDisplayObject","source-url":"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayObject/demo.vue"})]),_:1}),b,n("p",null,[n("a",g,[s("Source"),a(t)]),s(" • "),n("a",f,[s("Demo"),a(t)]),s(" • "),n("a",y,[s("Docs"),a(t)])])])}const x=c(k,[["render",h],["__file","index.html.vue"]]);export{x as default};
