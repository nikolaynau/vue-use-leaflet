import{_ as e,D as n,o as t,c,I as a,w as r,k as s,a as l,R as y}from"./chunks/framework._4g7boG9.js";const h=JSON.parse('{"title":"useLeafletLayerTooltip","description":"","frontmatter":{"category":"Layer"},"headers":[],"relativePath":"functions/useLeafletLayerTooltip/index.md","filePath":"functions/useLeafletLayerTooltip/index.md","lastUpdated":null}'),i={name:"functions/useLeafletLayerTooltip/index.md"},A=s("h1",{id:"useleafletlayertooltip",tabindex:"-1"},[l("useLeafletLayerTooltip "),s("a",{class:"header-anchor",href:"#useleafletlayertooltip","aria-label":'Permalink to "useLeafletLayerTooltip"'},"​")],-1),D=s("p",null,"Used to bind a tooltip to layer (marker, path, etc).",-1),B=s("h2",{id:"demo",tabindex:"-1"},[l("Demo "),s("a",{class:"header-anchor",href:"#demo","aria-label":'Permalink to "Demo"'},"​")],-1),E=y(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">script</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">setup</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">lang</span><span style="color:#666666;">=</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#C98A7D;">ts</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">ref</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">vue</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletMap</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletTileLayer</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletDisplayLayer</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletMarker</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletLayerTooltip</span></span>
<span class="line"><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">vue-use-leaflet</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">el</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">ref</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">HTMLElement</span><span style="color:#CB7676;"> </span><span style="color:#666666;">|</span><span style="color:#CB7676;"> null</span><span style="color:#666666;">&gt;(</span><span style="color:#CB7676;">null</span><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">map</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">useLeafletMap</span><span style="color:#666666;">(</span><span style="color:#BD976A;">el</span><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">tileLayer</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">useLeafletTileLayer</span><span style="color:#666666;">(</span></span>
<span class="line"><span style="color:#CB7676;">  </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png</span><span style="color:#C98A7D99;">&#39;</span></span>
<span class="line"><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#80A665;">useLeafletDisplayLayer</span><span style="color:#666666;">(</span><span style="color:#BD976A;">map</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">tileLayer</span><span style="color:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// create marker</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">marker</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">useLeafletMarker</span><span style="color:#666666;">([</span><span style="color:#4C9A91;">0</span><span style="color:#666666;">,</span><span style="color:#CB7676;"> </span><span style="color:#4C9A91;">0</span><span style="color:#666666;">]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// bind tooltip to marker</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#666666;">{</span><span style="color:#CB7676;"> </span><span style="color:#BD976A;">visible</span><span style="color:#666666;">,</span><span style="color:#CB7676;"> </span><span style="color:#BD976A;">toggle</span><span style="color:#CB7676;"> </span><span style="color:#666666;">}</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">useLeafletLayerTooltip</span><span style="color:#666666;">(</span><span style="color:#BD976A;">marker</span><span style="color:#666666;">,</span><span style="color:#CB7676;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">Text</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">,</span><span style="color:#CB7676;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#666666;">  </span><span style="color:#B8A965;">visible</span><span style="color:#666666;">: </span><span style="color:#4D9375;">true</span></span>
<span class="line"><span style="color:#666666;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// display marker and tooltip</span></span>
<span class="line"><span style="color:#80A665;">useLeafletDisplayLayer</span><span style="color:#666666;">(</span><span style="color:#BD976A;">map</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">marker</span><span style="color:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// visible.value = false; // hide tooltip</span></span>
<span class="line"><span style="color:#758575DD;">// toggle(); // show/hide tooltip</span></span>
<span class="line"><span style="color:#666666;">&lt;/</span><span style="color:#4D9375;">script</span><span style="color:#666666;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">template</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">div</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">ref</span><span style="color:#666666;">=</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#C98A7D;">el</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">style</span><span style="color:#666666;">=</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#C98A7D;">height: 250px</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#666666;">&gt;&lt;/</span><span style="color:#4D9375;">div</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#666666;">&lt;/</span><span style="color:#4D9375;">template</span><span style="color:#666666;">&gt;</span></span></code></pre><pre class="shiki vitesse-light vp-code-light"><code><span class="line"><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">script</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">setup</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">lang</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">ts</span><span style="color:#B5695999;">&quot;</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#1E754F;">import</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">ref</span><span style="color:#393A34;"> </span><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#1E754F;">from</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">vue</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#1E754F;">import</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletMap</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletTileLayer</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletDisplayLayer</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletMarker</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletLayerTooltip</span></span>
<span class="line"><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#1E754F;">from</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">vue-use-leaflet</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">el</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">ref</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">HTMLElement</span><span style="color:#AB5959;"> </span><span style="color:#999999;">|</span><span style="color:#AB5959;"> null</span><span style="color:#999999;">&gt;(</span><span style="color:#AB5959;">null</span><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">map</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">useLeafletMap</span><span style="color:#999999;">(</span><span style="color:#B07D48;">el</span><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">tileLayer</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">useLeafletTileLayer</span><span style="color:#999999;">(</span></span>
<span class="line"><span style="color:#AB5959;">  </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png</span><span style="color:#B5695999;">&#39;</span></span>
<span class="line"><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#59873A;">useLeafletDisplayLayer</span><span style="color:#999999;">(</span><span style="color:#B07D48;">map</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">tileLayer</span><span style="color:#999999;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// create marker</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">marker</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">useLeafletMarker</span><span style="color:#999999;">([</span><span style="color:#2F798A;">0</span><span style="color:#999999;">,</span><span style="color:#AB5959;"> </span><span style="color:#2F798A;">0</span><span style="color:#999999;">]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// bind tooltip to marker</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#999999;">{</span><span style="color:#AB5959;"> </span><span style="color:#B07D48;">visible</span><span style="color:#999999;">,</span><span style="color:#AB5959;"> </span><span style="color:#B07D48;">toggle</span><span style="color:#AB5959;"> </span><span style="color:#999999;">}</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">useLeafletLayerTooltip</span><span style="color:#999999;">(</span><span style="color:#B07D48;">marker</span><span style="color:#999999;">,</span><span style="color:#AB5959;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">Text</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">,</span><span style="color:#AB5959;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#999999;">  </span><span style="color:#998418;">visible</span><span style="color:#999999;">: </span><span style="color:#1E754F;">true</span></span>
<span class="line"><span style="color:#999999;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// display marker and tooltip</span></span>
<span class="line"><span style="color:#59873A;">useLeafletDisplayLayer</span><span style="color:#999999;">(</span><span style="color:#B07D48;">map</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">marker</span><span style="color:#999999;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// visible.value = false; // hide tooltip</span></span>
<span class="line"><span style="color:#A0ADA0;">// toggle(); // show/hide tooltip</span></span>
<span class="line"><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">script</span><span style="color:#999999;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">template</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">div</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">ref</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">el</span><span style="color:#B5695999;">&quot;</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">style</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">height: 250px</span><span style="color:#B5695999;">&quot;</span><span style="color:#999999;">&gt;&lt;/</span><span style="color:#1E754F;">div</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">template</span><span style="color:#999999;">&gt;</span></span></code></pre></div><h2 id="type-declarations" tabindex="-1">Type Declarations <a class="header-anchor" href="#type-declarations" aria-label="Permalink to &quot;Type Declarations&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">interface</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletLayerTooltipOptions</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#CB7676;">extends</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">Omit</span><span style="color:#666666;">&lt;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">    </span><span style="color:#5DA994;">TooltipOptions</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">    </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">offset</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">|</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">direction</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">|</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">opacity</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">|</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">className</span><span style="color:#C98A7D99;">&#39;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#666666;">&gt;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">visible</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRef</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">&gt;;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">autoBind</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">offset</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">PointExpression</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">direction</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">Direction</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">opacity</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">number</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">className</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">string</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">defOptions</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">TooltipOptions</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">updateSources</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">UpdateWatchSource</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">Layer</span><span style="color:#666666;">&gt;[];</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">dispose</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#666666;">}</span></span>
<span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">interface</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletLayerTooltipReturn</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">visible</span><span style="color:#666666;">: </span><span style="color:#5DA994;">Ref</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">&gt;;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">tooltip</span><span style="color:#666666;">: {</span></span>
<span class="line"><span style="color:#666666;">    </span><span style="color:#BD976A;">value</span><span style="color:#666666;">: </span><span style="color:#5DA994;">Tooltip</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#666666;">  };</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#80A665;">bind</span><span style="color:#666666;">: () =&gt; </span><span style="color:#5DA994;">void</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#80A665;">unbind</span><span style="color:#666666;">: () =&gt; </span><span style="color:#5DA994;">void</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#80A665;">open</span><span style="color:#666666;">: (</span><span style="color:#BD976A;">latlng</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">LatLngExpression</span><span style="color:#666666;">) =&gt; </span><span style="color:#5DA994;">void</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#80A665;">close</span><span style="color:#666666;">: () =&gt; </span><span style="color:#5DA994;">void</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#80A665;">toggle</span><span style="color:#666666;">: () =&gt; </span><span style="color:#5DA994;">void</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#80A665;">isOpened</span><span style="color:#666666;">: () =&gt; </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#666666;">}</span></span>
<span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">declare</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">function</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">useLeafletLayerTooltip</span><span style="color:#666666;">(</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">source</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">Layer</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">content</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRef</span><span style="color:#666666;">&lt;</span></span>
<span class="line"><span style="color:#666666;">    ((</span><span style="color:#BD976A;">layer</span><span style="color:#666666;">: </span><span style="color:#5DA994;">Layer</span><span style="color:#666666;">) =&gt; </span><span style="color:#5DA994;">Content</span><span style="color:#666666;">) | </span><span style="color:#5DA994;">Tooltip</span><span style="color:#666666;"> | </span><span style="color:#5DA994;">Content</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span></span>
<span class="line"><span style="color:#666666;">  &gt;,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">options</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">UseLeafletLayerTooltipOptions</span></span>
<span class="line"><span style="color:#666666;">):</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletLayerTooltipReturn</span><span style="color:#666666;">;</span></span></code></pre><pre class="shiki vitesse-light vp-code-light"><code><span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">interface</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletLayerTooltipOptions</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#AB5959;">extends</span><span style="color:#393A34;"> </span><span style="color:#59873A;">Omit</span><span style="color:#999999;">&lt;</span></span>
<span class="line"><span style="color:#393A34;">    </span><span style="color:#2E8F82;">TooltipOptions</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">    </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">offset</span><span style="color:#B5695999;">&#39;</span><span style="color:#393A34;"> </span><span style="color:#999999;">|</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">direction</span><span style="color:#B5695999;">&#39;</span><span style="color:#393A34;"> </span><span style="color:#999999;">|</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">opacity</span><span style="color:#B5695999;">&#39;</span><span style="color:#393A34;"> </span><span style="color:#999999;">|</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">className</span><span style="color:#B5695999;">&#39;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#999999;">&gt;</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">visible</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRef</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">&gt;;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">autoBind</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">offset</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">PointExpression</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">direction</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">Direction</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">opacity</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">number</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">className</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">string</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">defOptions</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">TooltipOptions</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">updateSources</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">UpdateWatchSource</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">Layer</span><span style="color:#999999;">&gt;[];</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">dispose</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#999999;">}</span></span>
<span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">interface</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletLayerTooltipReturn</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">visible</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">Ref</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">&gt;;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">tooltip</span><span style="color:#999999;">: {</span></span>
<span class="line"><span style="color:#999999;">    </span><span style="color:#B07D48;">value</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">Tooltip</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#999999;">  };</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#59873A;">bind</span><span style="color:#999999;">: () =&gt; </span><span style="color:#2E8F82;">void</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#59873A;">unbind</span><span style="color:#999999;">: () =&gt; </span><span style="color:#2E8F82;">void</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#59873A;">open</span><span style="color:#999999;">: (</span><span style="color:#B07D48;">latlng</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">LatLngExpression</span><span style="color:#999999;">) =&gt; </span><span style="color:#2E8F82;">void</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#59873A;">close</span><span style="color:#999999;">: () =&gt; </span><span style="color:#2E8F82;">void</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#59873A;">toggle</span><span style="color:#999999;">: () =&gt; </span><span style="color:#2E8F82;">void</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#59873A;">isOpened</span><span style="color:#999999;">: () =&gt; </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#999999;">}</span></span>
<span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">declare</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">function</span><span style="color:#393A34;"> </span><span style="color:#59873A;">useLeafletLayerTooltip</span><span style="color:#999999;">(</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">source</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">Layer</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">content</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRef</span><span style="color:#999999;">&lt;</span></span>
<span class="line"><span style="color:#999999;">    ((</span><span style="color:#B07D48;">layer</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">Layer</span><span style="color:#999999;">) =&gt; </span><span style="color:#2E8F82;">Content</span><span style="color:#999999;">) | </span><span style="color:#2E8F82;">Tooltip</span><span style="color:#999999;"> | </span><span style="color:#2E8F82;">Content</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span></span>
<span class="line"><span style="color:#999999;">  &gt;,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">options</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">UseLeafletLayerTooltipOptions</span></span>
<span class="line"><span style="color:#999999;">):</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletLayerTooltipReturn</span><span style="color:#999999;">;</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerTooltip/index.ts" target="_blank" rel="noreferrer">Source</a> • <a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerTooltip/demo.vue" target="_blank" rel="noreferrer">Demo</a> • <a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerTooltip/index.md" target="_blank" rel="noreferrer">Docs</a></p>`,6);function u(C,d,f,g,L,m){const p=n("Demo"),o=n("ClientOnly");return t(),c("div",null,[A,D,B,a(o,null,{default:r(()=>[a(p,{name:"useLeafletLayerTooltip","source-url":"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerTooltip/demo.vue"})]),_:1}),E])}const v=e(i,[["render",u]]);export{h as __pageData,v as default};