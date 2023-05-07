import{_ as l,M as t,p as c,q as r,N as a,V as i,R as n,t as s,a1 as u}from"./framework-5866ffd3.js";const k={},d=n("h1",{id:"useleafletpath",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#useleafletpath","aria-hidden":"true"},"#"),s(" useLeafletPath")],-1),v=n("p",null,[s("An abstract function that contains options and constants shared between vector overlays (Polygon, Polyline, Circle). This is used with the "),n("code",null,"factory"),s(" function.")],-1),m=n("h2",{id:"demo",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#demo","aria-hidden":"true"},"#"),s(" Demo")],-1),b=u(`<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Polygon<span class="token punctuation">,</span> Polyline <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;leaflet&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>
  useLeafletMap<span class="token punctuation">,</span>
  useLeafletTileLayer<span class="token punctuation">,</span>
  useLeafletDisplayLayer<span class="token punctuation">,</span>
  useLeafletPath
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-use-leaflet&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> el <span class="token operator">=</span> ref<span class="token operator">&lt;</span>HTMLElement <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token function">useLeafletMap</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">zoom</span><span class="token operator">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> tileLayer <span class="token operator">=</span> <span class="token function">useLeafletTileLayer</span><span class="token punctuation">(</span>
  <span class="token string">&#39;https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png&#39;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">useLeafletDisplayLayer</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> tileLayer<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// path color</span>
<span class="token keyword">const</span> color <span class="token operator">=</span> ref<span class="token operator">&lt;</span>string<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token string">&#39;green&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create polygon</span>
<span class="token keyword">const</span> polygon <span class="token operator">=</span> <span class="token function">useLeafletPath</span><span class="token punctuation">(</span>
  <span class="token parameter">opt</span> <span class="token operator">=&gt;</span>
    <span class="token keyword">new</span> <span class="token class-name">Polygon</span><span class="token punctuation">(</span>
      <span class="token punctuation">[</span>
        <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">15</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">25</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">15</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">25</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">15</span><span class="token punctuation">]</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      opt
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> color <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create polyline</span>
<span class="token keyword">const</span> polyline <span class="token operator">=</span> <span class="token function">useLeafletPath</span><span class="token punctuation">(</span>
  <span class="token parameter">opt</span> <span class="token operator">=&gt;</span>
    <span class="token keyword">new</span> <span class="token class-name">Polyline</span><span class="token punctuation">(</span>
      <span class="token punctuation">[</span>
        <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">15</span><span class="token punctuation">]</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      opt
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> color <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// display polyline</span>
<span class="token function">useLeafletDisplayLayer</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> polyline<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// display polygon</span>
<span class="token function">useLeafletDisplayLayer</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> polygon<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// color.value = &#39;black&#39;; // change path style</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>el<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 250px</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="type-declarations" tabindex="-1"><a class="header-anchor" href="#type-declarations" aria-hidden="true">#</a> Type Declarations</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">PathReactiveProperty</span> <span class="token operator">=</span>
  <span class="token operator">|</span> <span class="token string">&#39;stroke&#39;</span>
  <span class="token operator">|</span> <span class="token string">&#39;color&#39;</span>
  <span class="token operator">|</span> <span class="token string">&#39;weight&#39;</span>
  <span class="token operator">|</span> <span class="token string">&#39;opacity&#39;</span>
  <span class="token operator">|</span> <span class="token string">&#39;lineCap&#39;</span>
  <span class="token operator">|</span> <span class="token string">&#39;lineJoin&#39;</span>
  <span class="token operator">|</span> <span class="token string">&#39;dashArray&#39;</span>
  <span class="token operator">|</span> <span class="token string">&#39;dashOffset&#39;</span>
  <span class="token operator">|</span> <span class="token string">&#39;fill&#39;</span>
  <span class="token operator">|</span> <span class="token string">&#39;fillColor&#39;</span>
  <span class="token operator">|</span> <span class="token string">&#39;fillOpacity&#39;</span>
  <span class="token operator">|</span> <span class="token string">&#39;fillRule&#39;</span>
  <span class="token operator">|</span> <span class="token string">&#39;className&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">UseLeafletPathOptions<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> Path <span class="token operator">=</span> Path<span class="token operator">&gt;</span></span>
  <span class="token keyword">extends</span> <span class="token class-name">Omit<span class="token operator">&lt;</span>PathOptions<span class="token punctuation">,</span> PathReactiveProperty<span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  stroke<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  color<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  weight<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  opacity<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  lineCap<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span>LineCapShape <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  lineJoin<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span>LineJoinShape <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  dashArray<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  dashOffset<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  fill<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  fillColor<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  fillOpacity<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  fillRule<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span>FillRule <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  className<span class="token operator">?</span><span class="token operator">:</span> MaybeRefOrGetter<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  updateSources<span class="token operator">?</span><span class="token operator">:</span> UpdateWatchSource<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  watch<span class="token operator">?</span><span class="token operator">:</span> WatchSource<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  dispose<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">UseLeafletPathReturn<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> Path <span class="token operator">=</span> Path<span class="token operator">&gt;</span></span> <span class="token operator">=</span> Ref<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">useLeafletPath</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> Path <span class="token operator">=</span> Path<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
  <span class="token function-variable function">factory</span><span class="token operator">:</span> <span class="token punctuation">(</span>opt<span class="token operator">:</span> PathOptions<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span><span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> UseLeafletPathOptions<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token operator">:</span> UseLeafletPathReturn<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="source" tabindex="-1"><a class="header-anchor" href="#source" aria-hidden="true">#</a> Source</h2>`,5),y={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPath/index.ts",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPath/demo.vue",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPath/index.md",target:"_blank",rel:"noopener noreferrer"};function h(w,_){const p=t("Demo"),o=t("ClientOnly"),e=t("ExternalLinkIcon");return c(),r("div",null,[d,v,m,a(o,null,{default:i(()=>[a(p,{name:"useLeafletPath","source-url":"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPath/demo.vue"})]),_:1}),b,n("p",null,[n("a",y,[s("Source"),a(e)]),s(" • "),n("a",f,[s("Demo"),a(e)]),s(" • "),n("a",g,[s("Docs"),a(e)])])])}const P=l(k,[["render",h],["__file","index.html.vue"]]);export{P as default};
