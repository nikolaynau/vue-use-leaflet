import{_ as e,C as a,o as t,c as r,H as n,w as c,k as s,a as l,Q as y}from"./chunks/framework.1fa2d359.js";const L=JSON.parse('{"title":"useLeafletCircleMarker","description":"","frontmatter":{"category":"Layer"},"headers":[],"relativePath":"functions/useLeafletCircleMarker/index.md","filePath":"functions/useLeafletCircleMarker/index.md","lastUpdated":null}'),i={name:"functions/useLeafletCircleMarker/index.md"},A=s("h1",{id:"useleafletcirclemarker",tabindex:"-1"},[l("useLeafletCircleMarker "),s("a",{class:"header-anchor",href:"#useleafletcirclemarker","aria-label":'Permalink to "useLeafletCircleMarker"'},"​")],-1),D=s("p",null,"A circle of a fixed size with radius specified in pixels.",-1),B=s("h2",{id:"demo",tabindex:"-1"},[l("Demo "),s("a",{class:"header-anchor",href:"#demo","aria-label":'Permalink to "Demo"'},"​")],-1),C=y(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">script</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">setup</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">lang</span><span style="color:#666666;">=</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#C98A7D;">ts</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">ref</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">vue</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletMap</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletTileLayer</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletDisplayLayer</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletCircleMarker</span></span>
<span class="line"><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">vue-use-leaflet</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">el</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">ref</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">HTMLElement</span><span style="color:#CB7676;"> </span><span style="color:#666666;">|</span><span style="color:#CB7676;"> null</span><span style="color:#666666;">&gt;(</span><span style="color:#CB7676;">null</span><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">map</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">useLeafletMap</span><span style="color:#666666;">(</span><span style="color:#BD976A;">el</span><span style="color:#666666;">,</span><span style="color:#CB7676;"> </span><span style="color:#666666;">{ </span><span style="color:#B8A965;">center</span><span style="color:#666666;">: [</span><span style="color:#4C9A91;">0</span><span style="color:#666666;">, </span><span style="color:#4C9A91;">0</span><span style="color:#666666;">], </span><span style="color:#B8A965;">zoom</span><span style="color:#666666;">: </span><span style="color:#4C9A91;">3</span><span style="color:#666666;"> });</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">tileLayer</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">useLeafletTileLayer</span><span style="color:#666666;">(</span></span>
<span class="line"><span style="color:#CB7676;">  </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png</span><span style="color:#C98A7D99;">&#39;</span></span>
<span class="line"><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#80A665;">useLeafletDisplayLayer</span><span style="color:#666666;">(</span><span style="color:#BD976A;">map</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">tileLayer</span><span style="color:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// path color</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">color</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">ref</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">string</span><span style="color:#666666;">&gt;(</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">green</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// radius of the circle, in pixels</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">radius</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">ref</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">number</span><span style="color:#666666;">&gt;(</span><span style="color:#4C9A91;">10</span><span style="color:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// create circle marker</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">circleMarker</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">useLeafletCircleMarker</span><span style="color:#666666;">([</span><span style="color:#4C9A91;">0</span><span style="color:#666666;">,</span><span style="color:#CB7676;"> </span><span style="color:#4C9A91;">0</span><span style="color:#666666;">],</span><span style="color:#CB7676;"> </span><span style="color:#666666;">{ </span><span style="color:#BD976A;">radius</span><span style="color:#666666;">, </span><span style="color:#BD976A;">color</span><span style="color:#666666;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// display circle marker</span></span>
<span class="line"><span style="color:#80A665;">useLeafletDisplayLayer</span><span style="color:#666666;">(</span><span style="color:#BD976A;">map</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">circleMarker</span><span style="color:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// color.value = &#39;black&#39;; // redraw path</span></span>
<span class="line"><span style="color:#758575DD;">// radius.value = 20; // change radius and redraw path</span></span>
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
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletCircleMarker</span></span>
<span class="line"><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#1E754F;">from</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">vue-use-leaflet</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">el</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">ref</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">HTMLElement</span><span style="color:#AB5959;"> </span><span style="color:#999999;">|</span><span style="color:#AB5959;"> null</span><span style="color:#999999;">&gt;(</span><span style="color:#AB5959;">null</span><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">map</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">useLeafletMap</span><span style="color:#999999;">(</span><span style="color:#B07D48;">el</span><span style="color:#999999;">,</span><span style="color:#AB5959;"> </span><span style="color:#999999;">{ </span><span style="color:#998418;">center</span><span style="color:#999999;">: [</span><span style="color:#2F798A;">0</span><span style="color:#999999;">, </span><span style="color:#2F798A;">0</span><span style="color:#999999;">], </span><span style="color:#998418;">zoom</span><span style="color:#999999;">: </span><span style="color:#2F798A;">3</span><span style="color:#999999;"> });</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">tileLayer</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">useLeafletTileLayer</span><span style="color:#999999;">(</span></span>
<span class="line"><span style="color:#AB5959;">  </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png</span><span style="color:#B5695999;">&#39;</span></span>
<span class="line"><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#59873A;">useLeafletDisplayLayer</span><span style="color:#999999;">(</span><span style="color:#B07D48;">map</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">tileLayer</span><span style="color:#999999;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// path color</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">color</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">ref</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">string</span><span style="color:#999999;">&gt;(</span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">green</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// radius of the circle, in pixels</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">radius</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">ref</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">number</span><span style="color:#999999;">&gt;(</span><span style="color:#2F798A;">10</span><span style="color:#999999;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// create circle marker</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">circleMarker</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">useLeafletCircleMarker</span><span style="color:#999999;">([</span><span style="color:#2F798A;">0</span><span style="color:#999999;">,</span><span style="color:#AB5959;"> </span><span style="color:#2F798A;">0</span><span style="color:#999999;">],</span><span style="color:#AB5959;"> </span><span style="color:#999999;">{ </span><span style="color:#B07D48;">radius</span><span style="color:#999999;">, </span><span style="color:#B07D48;">color</span><span style="color:#999999;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// display circle marker</span></span>
<span class="line"><span style="color:#59873A;">useLeafletDisplayLayer</span><span style="color:#999999;">(</span><span style="color:#B07D48;">map</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">circleMarker</span><span style="color:#999999;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// color.value = &#39;black&#39;; // redraw path</span></span>
<span class="line"><span style="color:#A0ADA0;">// radius.value = 20; // change radius and redraw path</span></span>
<span class="line"><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">script</span><span style="color:#999999;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">template</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">div</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">ref</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">el</span><span style="color:#B5695999;">&quot;</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">style</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">height: 250px</span><span style="color:#B5695999;">&quot;</span><span style="color:#999999;">&gt;&lt;/</span><span style="color:#1E754F;">div</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">template</span><span style="color:#999999;">&gt;</span></span></code></pre></div><h2 id="type-declarations" tabindex="-1">Type Declarations <a class="header-anchor" href="#type-declarations" aria-label="Permalink to &quot;Type Declarations&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">interface</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletCircleMarkerOptions</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#CB7676;">extends</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">Omit</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">Omit</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">CircleMarkerOptions</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">radius</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">&gt;,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">keyof</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">PathOptions</span><span style="color:#666666;">&gt;,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">    </span><span style="color:#80A665;">UseLeafletPathOptions</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">CircleMarker</span><span style="color:#666666;">&gt;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">radius</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">number</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">defOptions</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">CircleMarkerOptions</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#80A665;">factory</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: (...</span><span style="color:#BD976A;">args</span><span style="color:#666666;">: </span><span style="color:#5DA994;">any</span><span style="color:#666666;">[]) =&gt; </span><span style="color:#5DA994;">CircleMarker</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#666666;">}</span></span>
<span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">type</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletCircleMarkerReturn</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">Ref</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">CircleMarker</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">|</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">null</span><span style="color:#666666;">&gt;;</span></span>
<span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">declare</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">function</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">useLeafletCircleMarker</span><span style="color:#666666;">(</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">latlng</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">LatLngExpression</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">options</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">UseLeafletCircleMarkerOptions</span></span>
<span class="line"><span style="color:#666666;">):</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletCircleMarkerReturn</span><span style="color:#666666;">;</span></span></code></pre><pre class="shiki vitesse-light vp-code-light"><code><span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">interface</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletCircleMarkerOptions</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#AB5959;">extends</span><span style="color:#393A34;"> </span><span style="color:#59873A;">Omit</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">Omit</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">CircleMarkerOptions</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">radius</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">&gt;,</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">keyof</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">PathOptions</span><span style="color:#999999;">&gt;,</span></span>
<span class="line"><span style="color:#393A34;">    </span><span style="color:#59873A;">UseLeafletPathOptions</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">CircleMarker</span><span style="color:#999999;">&gt;</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">radius</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">number</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">defOptions</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">CircleMarkerOptions</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#59873A;">factory</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: (...</span><span style="color:#B07D48;">args</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">any</span><span style="color:#999999;">[]) =&gt; </span><span style="color:#2E8F82;">CircleMarker</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#999999;">}</span></span>
<span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">type</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletCircleMarkerReturn</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">Ref</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">CircleMarker</span><span style="color:#393A34;"> </span><span style="color:#999999;">|</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">null</span><span style="color:#999999;">&gt;;</span></span>
<span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">declare</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">function</span><span style="color:#393A34;"> </span><span style="color:#59873A;">useLeafletCircleMarker</span><span style="color:#999999;">(</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">latlng</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">LatLngExpression</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">options</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">UseLeafletCircleMarkerOptions</span></span>
<span class="line"><span style="color:#999999;">):</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletCircleMarkerReturn</span><span style="color:#999999;">;</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCircleMarker/index.ts" target="_blank" rel="noreferrer">Source</a> • <a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCircleMarker/demo.vue" target="_blank" rel="noreferrer">Demo</a> • <a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCircleMarker/index.md" target="_blank" rel="noreferrer">Docs</a></p>`,6);function u(E,d,f,m,g,h){const p=a("Demo"),o=a("ClientOnly");return t(),r("div",null,[A,D,B,n(o,null,{default:c(()=>[n(p,{name:"useLeafletCircleMarker","source-url":"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCircleMarker/demo.vue"})]),_:1}),C])}const M=e(i,[["render",u]]);export{L as __pageData,M as default};
