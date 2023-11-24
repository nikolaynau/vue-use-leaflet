import{_ as e,D as n,o as t,c as r,I as a,w as c,k as s,a as l,R as y}from"./chunks/framework._4g7boG9.js";const b=JSON.parse('{"title":"useLeafletControlPosition","description":"","frontmatter":{"category":"Control"},"headers":[],"relativePath":"functions/useLeafletControlPosition/index.md","filePath":"functions/useLeafletControlPosition/index.md","lastUpdated":null}'),i={name:"functions/useLeafletControlPosition/index.md"},A=s("h1",{id:"useleafletcontrolposition",tabindex:"-1"},[l("useLeafletControlPosition "),s("a",{class:"header-anchor",href:"#useleafletcontrolposition","aria-label":'Permalink to "useLeafletControlPosition"'},"​")],-1),D=s("p",null,"Creates a new control positions. Control positions are DOM elements used to control the position on the map.",-1),B=s("h2",{id:"demo",tabindex:"-1"},[l("Demo "),s("a",{class:"header-anchor",href:"#demo","aria-label":'Permalink to "Demo"'},"​")],-1),C=y(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">script</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">setup</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">lang</span><span style="color:#666666;">=</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#C98A7D;">ts</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">ref</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">vue</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletMap</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletTileLayer</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletDisplayLayer</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletControlPosition</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletZoomControl</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletDisplayControl</span></span>
<span class="line"><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">vue-use-leaflet</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">el</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">ref</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">HTMLElement</span><span style="color:#CB7676;"> </span><span style="color:#666666;">|</span><span style="color:#CB7676;"> null</span><span style="color:#666666;">&gt;(</span><span style="color:#CB7676;">null</span><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">map</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">useLeafletMap</span><span style="color:#666666;">(</span><span style="color:#BD976A;">el</span><span style="color:#666666;">,</span><span style="color:#CB7676;"> </span><span style="color:#666666;">{ </span><span style="color:#B8A965;">zoomControl</span><span style="color:#666666;">: </span><span style="color:#4D9375;">false</span><span style="color:#666666;"> });</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">tileLayer</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">useLeafletTileLayer</span><span style="color:#666666;">(</span></span>
<span class="line"><span style="color:#CB7676;">  </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png</span><span style="color:#C98A7D99;">&#39;</span></span>
<span class="line"><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#80A665;">useLeafletDisplayLayer</span><span style="color:#666666;">(</span><span style="color:#BD976A;">map</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">tileLayer</span><span style="color:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// create custom control position</span></span>
<span class="line"><span style="color:#80A665;">useLeafletControlPosition</span><span style="color:#666666;">(</span><span style="color:#BD976A;">map</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">[</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">center</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">right</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">],</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{ </span><span style="color:#B8A965;">flushSync</span><span style="color:#666666;">: </span><span style="color:#4D9375;">true</span><span style="color:#666666;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// create zoom control in center right</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">zoomControl</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">useLeafletZoomControl</span><span style="color:#666666;">({</span></span>
<span class="line"><span style="color:#666666;">  </span><span style="color:#B8A965;">position</span><span style="color:#666666;">: </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">centerright</span><span style="color:#C98A7D99;">&#39;</span></span>
<span class="line"><span style="color:#666666;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// display zoom control</span></span>
<span class="line"><span style="color:#80A665;">useLeafletDisplayControl</span><span style="color:#666666;">(</span><span style="color:#BD976A;">map</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">zoomControl</span><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#666666;">&lt;/</span><span style="color:#4D9375;">script</span><span style="color:#666666;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">template</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">div</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">ref</span><span style="color:#666666;">=</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#C98A7D;">el</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">style</span><span style="color:#666666;">=</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#C98A7D;">height: 250px</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#666666;">&gt;&lt;/</span><span style="color:#4D9375;">div</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#666666;">&lt;/</span><span style="color:#4D9375;">template</span><span style="color:#666666;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">style</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#666666;">.</span><span style="color:#BD976A;">leaflet-center</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#B8A965;">position</span><span style="color:#666666;">:</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C99076;">absolute</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#B8A965;">z-index</span><span style="color:#666666;">:</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4C9A91;">1000</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#B8A965;">pointer-events</span><span style="color:#666666;">:</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C99076;">none</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#666666;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#666666;">.</span><span style="color:#BD976A;">leaflet-center</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#B8A965;">top</span><span style="color:#666666;">:</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4C9A91;">50</span><span style="color:#CB7676;">%</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#B8A965;">transform</span><span style="color:#666666;">:</span><span style="color:#DBD7CAEE;"> </span><span style="color:#B8A965;">translateY</span><span style="color:#666666;">(</span><span style="color:#4C9A91;">-50</span><span style="color:#CB7676;">%</span><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#666666;">}</span></span>
<span class="line"><span style="color:#666666;">&lt;/</span><span style="color:#4D9375;">style</span><span style="color:#666666;">&gt;</span></span></code></pre><pre class="shiki vitesse-light vp-code-light"><code><span class="line"><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">script</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">setup</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">lang</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">ts</span><span style="color:#B5695999;">&quot;</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#1E754F;">import</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">ref</span><span style="color:#393A34;"> </span><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#1E754F;">from</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">vue</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#1E754F;">import</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletMap</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletTileLayer</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletDisplayLayer</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletControlPosition</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletZoomControl</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletDisplayControl</span></span>
<span class="line"><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#1E754F;">from</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">vue-use-leaflet</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">el</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">ref</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">HTMLElement</span><span style="color:#AB5959;"> </span><span style="color:#999999;">|</span><span style="color:#AB5959;"> null</span><span style="color:#999999;">&gt;(</span><span style="color:#AB5959;">null</span><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">map</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">useLeafletMap</span><span style="color:#999999;">(</span><span style="color:#B07D48;">el</span><span style="color:#999999;">,</span><span style="color:#AB5959;"> </span><span style="color:#999999;">{ </span><span style="color:#998418;">zoomControl</span><span style="color:#999999;">: </span><span style="color:#1E754F;">false</span><span style="color:#999999;"> });</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">tileLayer</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">useLeafletTileLayer</span><span style="color:#999999;">(</span></span>
<span class="line"><span style="color:#AB5959;">  </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png</span><span style="color:#B5695999;">&#39;</span></span>
<span class="line"><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#59873A;">useLeafletDisplayLayer</span><span style="color:#999999;">(</span><span style="color:#B07D48;">map</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">tileLayer</span><span style="color:#999999;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// create custom control position</span></span>
<span class="line"><span style="color:#59873A;">useLeafletControlPosition</span><span style="color:#999999;">(</span><span style="color:#B07D48;">map</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#999999;">[</span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">center</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">right</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">],</span><span style="color:#393A34;"> </span><span style="color:#999999;">{ </span><span style="color:#998418;">flushSync</span><span style="color:#999999;">: </span><span style="color:#1E754F;">true</span><span style="color:#999999;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// create zoom control in center right</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">zoomControl</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">useLeafletZoomControl</span><span style="color:#999999;">({</span></span>
<span class="line"><span style="color:#999999;">  </span><span style="color:#998418;">position</span><span style="color:#999999;">: </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">centerright</span><span style="color:#B5695999;">&#39;</span></span>
<span class="line"><span style="color:#999999;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// display zoom control</span></span>
<span class="line"><span style="color:#59873A;">useLeafletDisplayControl</span><span style="color:#999999;">(</span><span style="color:#B07D48;">map</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">zoomControl</span><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">script</span><span style="color:#999999;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">template</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">div</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">ref</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">el</span><span style="color:#B5695999;">&quot;</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">style</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">height: 250px</span><span style="color:#B5695999;">&quot;</span><span style="color:#999999;">&gt;&lt;/</span><span style="color:#1E754F;">div</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">template</span><span style="color:#999999;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">style</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#999999;">.</span><span style="color:#B07D48;">leaflet-center</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#998418;">position</span><span style="color:#999999;">:</span><span style="color:#393A34;"> </span><span style="color:#A65E2B;">absolute</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#998418;">z-index</span><span style="color:#999999;">:</span><span style="color:#393A34;"> </span><span style="color:#2F798A;">1000</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#998418;">pointer-events</span><span style="color:#999999;">:</span><span style="color:#393A34;"> </span><span style="color:#A65E2B;">none</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#999999;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#999999;">.</span><span style="color:#B07D48;">leaflet-center</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#998418;">top</span><span style="color:#999999;">:</span><span style="color:#393A34;"> </span><span style="color:#2F798A;">50</span><span style="color:#AB5959;">%</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#998418;">transform</span><span style="color:#999999;">:</span><span style="color:#393A34;"> </span><span style="color:#998418;">translateY</span><span style="color:#999999;">(</span><span style="color:#2F798A;">-50</span><span style="color:#AB5959;">%</span><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#999999;">}</span></span>
<span class="line"><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">style</span><span style="color:#999999;">&gt;</span></span></code></pre></div><h2 id="type-declarations" tabindex="-1">Type Declarations <a class="header-anchor" href="#type-declarations" aria-label="Permalink to &quot;Type Declarations&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">interface</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletControlPositionOptions</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">flushSync</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">dispose</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#666666;">}</span></span>
<span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">interface</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletControlPositionReturn</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">positionElements</span><span style="color:#666666;">: </span><span style="color:#5DA994;">LeafletControlPositionElements</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#666666;">}</span></span>
<span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">type</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">LeafletControlPositionElements</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">Readonly</span><span style="color:#666666;">&lt;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#5DA994;">Ref</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">Record</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">string</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">HTMLElement</span><span style="color:#666666;">&gt;&gt;</span></span>
<span class="line"><span style="color:#666666;">&gt;;</span></span>
<span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">declare</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">function</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">useLeafletControlPosition</span><span style="color:#666666;">(</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">source</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">Map</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">position</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">Arrayable</span><span style="color:#666666;">&lt;[</span><span style="color:#5DA994;">string</span><span style="color:#666666;">, </span><span style="color:#5DA994;">string</span><span style="color:#666666;">]&gt; | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">options</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">UseLeafletControlPositionOptions</span></span>
<span class="line"><span style="color:#666666;">):</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletControlPositionReturn</span><span style="color:#666666;">;</span></span></code></pre><pre class="shiki vitesse-light vp-code-light"><code><span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">interface</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletControlPositionOptions</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">flushSync</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">dispose</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#999999;">}</span></span>
<span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">interface</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletControlPositionReturn</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">positionElements</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">LeafletControlPositionElements</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#999999;">}</span></span>
<span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">type</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">LeafletControlPositionElements</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">Readonly</span><span style="color:#999999;">&lt;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#2E8F82;">Ref</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">Record</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">string</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">HTMLElement</span><span style="color:#999999;">&gt;&gt;</span></span>
<span class="line"><span style="color:#999999;">&gt;;</span></span>
<span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">declare</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">function</span><span style="color:#393A34;"> </span><span style="color:#59873A;">useLeafletControlPosition</span><span style="color:#999999;">(</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">source</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">Map</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">position</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">Arrayable</span><span style="color:#999999;">&lt;[</span><span style="color:#2E8F82;">string</span><span style="color:#999999;">, </span><span style="color:#2E8F82;">string</span><span style="color:#999999;">]&gt; | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">options</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">UseLeafletControlPositionOptions</span></span>
<span class="line"><span style="color:#999999;">):</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletControlPositionReturn</span><span style="color:#999999;">;</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletControlPosition/index.ts" target="_blank" rel="noreferrer">Source</a> • <a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletControlPosition/demo.vue" target="_blank" rel="noreferrer">Demo</a> • <a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletControlPosition/index.md" target="_blank" rel="noreferrer">Docs</a></p>`,6);function E(u,f,d,m,g,h){const o=n("Demo"),p=n("ClientOnly");return t(),r("div",null,[A,D,B,a(p,null,{default:c(()=>[a(o,{name:"useLeafletControlPosition","source-url":"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletControlPosition/demo.vue"})]),_:1}),C])}const F=e(i,[["render",E]]);export{b as __pageData,F as default};