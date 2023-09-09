import{_ as o,C as s,o as e,c as t,H as a,w as r,Q as n}from"./chunks/framework.1fa2d359.js";const f=JSON.parse('{"title":"useLeafletWmsTileLayer","description":"","frontmatter":{"category":"Layer"},"headers":[],"relativePath":"functions/useLeafletWmsTileLayer/index.md","filePath":"functions/useLeafletWmsTileLayer/index.md","lastUpdated":null}'),c={name:"functions/useLeafletWmsTileLayer/index.md"},y=n('<h1 id="useleafletwmstilelayer" tabindex="-1">useLeafletWmsTileLayer <a class="header-anchor" href="#useleafletwmstilelayer" aria-label="Permalink to &quot;useLeafletWmsTileLayer&quot;">​</a></h1><p>Used to display <a href="https://en.wikipedia.org/wiki/Web_Map_Service" target="_blank" rel="noreferrer">WMS</a> services as tile layers on the map.</p><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>',3),i=n(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">script</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">setup</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">lang</span><span style="color:#666666;">=</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#C98A7D;">ts</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">ref</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">vue</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletMap</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletWmsTileLayer</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletDisplayLayer</span></span>
<span class="line"><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">vue-use-leaflet</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">el</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">ref</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">HTMLElement</span><span style="color:#CB7676;"> </span><span style="color:#666666;">|</span><span style="color:#CB7676;"> null</span><span style="color:#666666;">&gt;(</span><span style="color:#CB7676;">null</span><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">map</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">useLeafletMap</span><span style="color:#666666;">(</span><span style="color:#BD976A;">el</span><span style="color:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// create WMS tile layer</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">wms</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">useLeafletWmsTileLayer</span><span style="color:#666666;">(</span></span>
<span class="line"><span style="color:#CB7676;">  </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">http://ows.mundialis.de/services/service?</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#CB7676;">  </span><span style="color:#666666;">{ </span><span style="color:#B8A965;">layers</span><span style="color:#666666;">: </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">TOPO-OSM-WMS</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;"> }</span></span>
<span class="line"><span style="color:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// display WMS tile layer</span></span>
<span class="line"><span style="color:#80A665;">useLeafletDisplayLayer</span><span style="color:#666666;">(</span><span style="color:#BD976A;">map</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">wms</span><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#666666;">&lt;/</span><span style="color:#4D9375;">script</span><span style="color:#666666;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">template</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">div</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">ref</span><span style="color:#666666;">=</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#C98A7D;">el</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">style</span><span style="color:#666666;">=</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#C98A7D;">height: 250px</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#666666;">&gt;&lt;/</span><span style="color:#4D9375;">div</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#666666;">&lt;/</span><span style="color:#4D9375;">template</span><span style="color:#666666;">&gt;</span></span></code></pre><pre class="shiki vitesse-light vp-code-light"><code><span class="line"><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">script</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">setup</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">lang</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">ts</span><span style="color:#B5695999;">&quot;</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#1E754F;">import</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">ref</span><span style="color:#393A34;"> </span><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#1E754F;">from</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">vue</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#1E754F;">import</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletMap</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletWmsTileLayer</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletDisplayLayer</span></span>
<span class="line"><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#1E754F;">from</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">vue-use-leaflet</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">el</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">ref</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">HTMLElement</span><span style="color:#AB5959;"> </span><span style="color:#999999;">|</span><span style="color:#AB5959;"> null</span><span style="color:#999999;">&gt;(</span><span style="color:#AB5959;">null</span><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">map</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">useLeafletMap</span><span style="color:#999999;">(</span><span style="color:#B07D48;">el</span><span style="color:#999999;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// create WMS tile layer</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">wms</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">useLeafletWmsTileLayer</span><span style="color:#999999;">(</span></span>
<span class="line"><span style="color:#AB5959;">  </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">http://ows.mundialis.de/services/service?</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#AB5959;">  </span><span style="color:#999999;">{ </span><span style="color:#998418;">layers</span><span style="color:#999999;">: </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">TOPO-OSM-WMS</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;"> }</span></span>
<span class="line"><span style="color:#999999;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// display WMS tile layer</span></span>
<span class="line"><span style="color:#59873A;">useLeafletDisplayLayer</span><span style="color:#999999;">(</span><span style="color:#B07D48;">map</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">wms</span><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">script</span><span style="color:#999999;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">template</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">div</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">ref</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">el</span><span style="color:#B5695999;">&quot;</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">style</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">height: 250px</span><span style="color:#B5695999;">&quot;</span><span style="color:#999999;">&gt;&lt;/</span><span style="color:#1E754F;">div</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">template</span><span style="color:#999999;">&gt;</span></span></code></pre></div><h2 id="type-declarations" tabindex="-1">Type Declarations <a class="header-anchor" href="#type-declarations" aria-label="Permalink to &quot;Type Declarations&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">interface</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletWmsTileLayerOptions</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">extends</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">WMSOptions</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">updateSources</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">UpdateWatchSource</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">TileLayer</span><span style="color:#666666;">.</span><span style="color:#5DA994;">WMS</span><span style="color:#666666;">&gt;[];</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#80A665;">factory</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: (...</span><span style="color:#BD976A;">args</span><span style="color:#666666;">: </span><span style="color:#5DA994;">any</span><span style="color:#666666;">[]) =&gt; </span><span style="color:#5DA994;">TileLayer</span><span style="color:#666666;">.</span><span style="color:#5DA994;">WMS</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">defParams</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">WMSParams</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">dispose</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#666666;">}</span></span>
<span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">type</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletWmsTileLayerReturn</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">Ref</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">TileLayer</span><span style="color:#666666;">.</span><span style="color:#5DA994;">WMS</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">|</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">null</span><span style="color:#666666;">&gt;;</span></span>
<span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">declare</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">function</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">useLeafletWmsTileLayer</span><span style="color:#666666;">(</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">url</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">string</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">params</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">WMSParams</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">options</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">UseLeafletWmsTileLayerOptions</span></span>
<span class="line"><span style="color:#666666;">):</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletWmsTileLayerReturn</span><span style="color:#666666;">;</span></span></code></pre><pre class="shiki vitesse-light vp-code-light"><code><span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">interface</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletWmsTileLayerOptions</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">extends</span><span style="color:#393A34;"> </span><span style="color:#59873A;">WMSOptions</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">updateSources</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">UpdateWatchSource</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">TileLayer</span><span style="color:#999999;">.</span><span style="color:#2E8F82;">WMS</span><span style="color:#999999;">&gt;[];</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#59873A;">factory</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: (...</span><span style="color:#B07D48;">args</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">any</span><span style="color:#999999;">[]) =&gt; </span><span style="color:#2E8F82;">TileLayer</span><span style="color:#999999;">.</span><span style="color:#2E8F82;">WMS</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">defParams</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">WMSParams</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">dispose</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#999999;">}</span></span>
<span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">type</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletWmsTileLayerReturn</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">Ref</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">TileLayer</span><span style="color:#999999;">.</span><span style="color:#2E8F82;">WMS</span><span style="color:#393A34;"> </span><span style="color:#999999;">|</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">null</span><span style="color:#999999;">&gt;;</span></span>
<span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">declare</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">function</span><span style="color:#393A34;"> </span><span style="color:#59873A;">useLeafletWmsTileLayer</span><span style="color:#999999;">(</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">url</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">string</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">params</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">WMSParams</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">options</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">UseLeafletWmsTileLayerOptions</span></span>
<span class="line"><span style="color:#999999;">):</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletWmsTileLayerReturn</span><span style="color:#999999;">;</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletWmsTileLayer/index.ts" target="_blank" rel="noreferrer">Source</a> • <a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletWmsTileLayer/demo.vue" target="_blank" rel="noreferrer">Demo</a> • <a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletWmsTileLayer/index.md" target="_blank" rel="noreferrer">Docs</a></p>`,6);function A(D,B,u,E,C,d){const l=s("Demo"),p=s("ClientOnly");return e(),t("div",null,[y,a(p,null,{default:r(()=>[a(l,{name:"useLeafletWmsTileLayer","source-url":"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletWmsTileLayer/demo.vue"})]),_:1}),i])}const L=o(c,[["render",A]]);export{f as __pageData,L as default};
