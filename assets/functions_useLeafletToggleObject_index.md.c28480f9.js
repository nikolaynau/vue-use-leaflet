import{_ as e,C as n,o as t,c,H as l,w as r,k as s,a,Q as y}from"./chunks/framework.1fa2d359.js";const T=JSON.parse('{"title":"useLeafletToggleObject","description":"","frontmatter":{"category":"Other"},"headers":[],"relativePath":"functions/useLeafletToggleObject/index.md","filePath":"functions/useLeafletToggleObject/index.md","lastUpdated":null}'),A={name:"functions/useLeafletToggleObject/index.md"},D=s("h1",{id:"useleaflettoggleobject",tabindex:"-1"},[a("useLeafletToggleObject "),s("a",{class:"header-anchor",href:"#useleaflettoggleobject","aria-label":'Permalink to "useLeafletToggleObject"'},"​")],-1),i=s("p",null,[a("Switch between two states "),s("code",null,"true"),a(" and "),s("code",null,"false"),a(".")],-1),B=s("h2",{id:"demo",tabindex:"-1"},[a("Demo "),s("a",{class:"header-anchor",href:"#demo","aria-label":'Permalink to "Demo"'},"​")],-1),g=y(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">script</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">setup</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">lang</span><span style="color:#666666;">=</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#C98A7D;">ts</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">ref</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">vue</span><span style="color:#C98A7D99;">&#39;</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletMap</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletTileLayer</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletToggleObject</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletMarker</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">useLeafletDisplayLayer</span></span>
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
<span class="line"><span style="color:#758575DD;">// create toggle object</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#BD976A;">toggle</span><span style="color:#CB7676;"> </span><span style="color:#666666;">=</span><span style="color:#CB7676;"> </span><span style="color:#80A665;">useLeafletToggleObject</span><span style="color:#666666;">(</span><span style="color:#BD976A;">map</span><span style="color:#666666;">,</span><span style="color:#CB7676;"> </span><span style="color:#BD976A;">marker</span><span style="color:#666666;">,</span><span style="color:#CB7676;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#666666;">  </span><span style="color:#80A665;">onToggle</span><span style="color:#666666;">: (</span><span style="color:#BD976A;">source</span><span style="color:#666666;">, </span><span style="color:#BD976A;">target</span><span style="color:#666666;">, </span><span style="color:#BD976A;">value</span><span style="color:#666666;">) =&gt; {</span></span>
<span class="line"><span style="color:#666666;">    </span><span style="color:#4D9375;">if</span><span style="color:#666666;"> (</span><span style="color:#BD976A;">value</span><span style="color:#666666;">) {</span></span>
<span class="line"><span style="color:#666666;">      </span><span style="color:#BD976A;">source</span><span style="color:#666666;">.</span><span style="color:#80A665;">addLayer</span><span style="color:#666666;">(</span><span style="color:#BD976A;">target</span><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#666666;">    } </span><span style="color:#4D9375;">else</span><span style="color:#666666;"> {</span></span>
<span class="line"><span style="color:#666666;">      </span><span style="color:#BD976A;">source</span><span style="color:#666666;">.</span><span style="color:#80A665;">removeLayer</span><span style="color:#666666;">(</span><span style="color:#BD976A;">target</span><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#666666;">    }</span></span>
<span class="line"><span style="color:#666666;">  }</span></span>
<span class="line"><span style="color:#666666;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// toggle() // hide marker</span></span>
<span class="line"><span style="color:#758575DD;">// toggle() // show marker</span></span>
<span class="line"><span style="color:#666666;">&lt;/</span><span style="color:#4D9375;">script</span><span style="color:#666666;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">template</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">div</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">ref</span><span style="color:#666666;">=</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#C98A7D;">el</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">style</span><span style="color:#666666;">=</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#C98A7D;">height: 250px</span><span style="color:#C98A7D99;">&quot;</span><span style="color:#666666;">&gt;&lt;/</span><span style="color:#4D9375;">div</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#666666;">&lt;/</span><span style="color:#4D9375;">template</span><span style="color:#666666;">&gt;</span></span></code></pre><pre class="shiki vitesse-light vp-code-light"><code><span class="line"><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">script</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">setup</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">lang</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">ts</span><span style="color:#B5695999;">&quot;</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#1E754F;">import</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">ref</span><span style="color:#393A34;"> </span><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#1E754F;">from</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">vue</span><span style="color:#B5695999;">&#39;</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#1E754F;">import</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletMap</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletTileLayer</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletToggleObject</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletMarker</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">useLeafletDisplayLayer</span></span>
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
<span class="line"><span style="color:#A0ADA0;">// create toggle object</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#B07D48;">toggle</span><span style="color:#AB5959;"> </span><span style="color:#999999;">=</span><span style="color:#AB5959;"> </span><span style="color:#59873A;">useLeafletToggleObject</span><span style="color:#999999;">(</span><span style="color:#B07D48;">map</span><span style="color:#999999;">,</span><span style="color:#AB5959;"> </span><span style="color:#B07D48;">marker</span><span style="color:#999999;">,</span><span style="color:#AB5959;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#999999;">  </span><span style="color:#59873A;">onToggle</span><span style="color:#999999;">: (</span><span style="color:#B07D48;">source</span><span style="color:#999999;">, </span><span style="color:#B07D48;">target</span><span style="color:#999999;">, </span><span style="color:#B07D48;">value</span><span style="color:#999999;">) =&gt; {</span></span>
<span class="line"><span style="color:#999999;">    </span><span style="color:#1E754F;">if</span><span style="color:#999999;"> (</span><span style="color:#B07D48;">value</span><span style="color:#999999;">) {</span></span>
<span class="line"><span style="color:#999999;">      </span><span style="color:#B07D48;">source</span><span style="color:#999999;">.</span><span style="color:#59873A;">addLayer</span><span style="color:#999999;">(</span><span style="color:#B07D48;">target</span><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#999999;">    } </span><span style="color:#1E754F;">else</span><span style="color:#999999;"> {</span></span>
<span class="line"><span style="color:#999999;">      </span><span style="color:#B07D48;">source</span><span style="color:#999999;">.</span><span style="color:#59873A;">removeLayer</span><span style="color:#999999;">(</span><span style="color:#B07D48;">target</span><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#999999;">    }</span></span>
<span class="line"><span style="color:#999999;">  }</span></span>
<span class="line"><span style="color:#999999;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// toggle() // hide marker</span></span>
<span class="line"><span style="color:#A0ADA0;">// toggle() // show marker</span></span>
<span class="line"><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">script</span><span style="color:#999999;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">template</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">div</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">ref</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">el</span><span style="color:#B5695999;">&quot;</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">style</span><span style="color:#999999;">=</span><span style="color:#B5695999;">&quot;</span><span style="color:#B56959;">height: 250px</span><span style="color:#B5695999;">&quot;</span><span style="color:#999999;">&gt;&lt;/</span><span style="color:#1E754F;">div</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">template</span><span style="color:#999999;">&gt;</span></span></code></pre></div><h2 id="type-declarations" tabindex="-1">Type Declarations <a class="header-anchor" href="#type-declarations" aria-label="Permalink to &quot;Type Declarations&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">interface</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletToggleObjectOptions</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">Controls</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">extends</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">S</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">T</span><span style="color:#666666;">&gt;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">initialValue</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRef</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">&gt;;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">controls</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">Controls</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">flushSync</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">dispose</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#80A665;">onToggle</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: (</span><span style="color:#BD976A;">source</span><span style="color:#666666;">: </span><span style="color:#5DA994;">S</span><span style="color:#666666;">, </span><span style="color:#BD976A;">target</span><span style="color:#666666;">: </span><span style="color:#5DA994;">T</span><span style="color:#666666;">, </span><span style="color:#BD976A;">value</span><span style="color:#666666;">: </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">) =&gt; </span><span style="color:#5DA994;">void</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#666666;">}</span></span>
<span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">type</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletToggleObjectReturn</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">(</span><span style="color:#BD976A;">value</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">)</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=&gt;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">interface</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletToggleObjectReturnWithControls</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#80A665;">toggle</span><span style="color:#666666;">: (</span><span style="color:#BD976A;">value</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">) =&gt; </span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">value</span><span style="color:#666666;">: </span><span style="color:#5DA994;">Ref</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">boolean</span><span style="color:#666666;">&gt;;</span></span>
<span class="line"><span style="color:#666666;">}</span></span>
<span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">declare</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">function</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">useLeafletToggleObject</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">S</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">T</span><span style="color:#666666;">&gt;(</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">source</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">S</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">target</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">T</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">options</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA994;">UseLeafletToggleObjectOptions</span><span style="color:#666666;">&lt;</span><span style="color:#CB7676;">false</span><span style="color:#666666;">, </span><span style="color:#5DA994;">S</span><span style="color:#666666;">, </span><span style="color:#5DA994;">T</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#666666;">):</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletToggleObjectReturn</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#4D9375;">export</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">declare</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">function</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">useLeafletToggleObject</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">S</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">T</span><span style="color:#666666;">&gt;(</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">source</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">S</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">target</span><span style="color:#666666;">: </span><span style="color:#5DA994;">MaybeRefOrGetter</span><span style="color:#666666;">&lt;</span><span style="color:#5DA994;">T</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">null</span><span style="color:#666666;"> | </span><span style="color:#CB7676;">undefined</span><span style="color:#666666;">&gt;,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">options</span><span style="color:#666666;">: </span><span style="color:#5DA994;">UseLeafletToggleObjectOptions</span><span style="color:#666666;">&lt;</span><span style="color:#CB7676;">true</span><span style="color:#666666;">, </span><span style="color:#5DA994;">S</span><span style="color:#666666;">, </span><span style="color:#5DA994;">T</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#666666;">):</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA994;">UseLeafletToggleObjectReturnWithControls</span><span style="color:#666666;">;</span></span></code></pre><pre class="shiki vitesse-light vp-code-light"><code><span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">interface</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletToggleObjectOptions</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">Controls</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">extends</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">S</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">T</span><span style="color:#999999;">&gt;</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">initialValue</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRef</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">&gt;;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">controls</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">Controls</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">flushSync</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">dispose</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#59873A;">onToggle</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: (</span><span style="color:#B07D48;">source</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">S</span><span style="color:#999999;">, </span><span style="color:#B07D48;">target</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">T</span><span style="color:#999999;">, </span><span style="color:#B07D48;">value</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">) =&gt; </span><span style="color:#2E8F82;">void</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#999999;">}</span></span>
<span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">type</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletToggleObjectReturn</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#999999;">(</span><span style="color:#B07D48;">value</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">)</span><span style="color:#393A34;"> </span><span style="color:#999999;">=&gt;</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">interface</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletToggleObjectReturnWithControls</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#59873A;">toggle</span><span style="color:#999999;">: (</span><span style="color:#B07D48;">value</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">) =&gt; </span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">value</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">Ref</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">boolean</span><span style="color:#999999;">&gt;;</span></span>
<span class="line"><span style="color:#999999;">}</span></span>
<span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">declare</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">function</span><span style="color:#393A34;"> </span><span style="color:#59873A;">useLeafletToggleObject</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">S</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">T</span><span style="color:#999999;">&gt;(</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">source</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">S</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">target</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">T</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">options</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">UseLeafletToggleObjectOptions</span><span style="color:#999999;">&lt;</span><span style="color:#AB5959;">false</span><span style="color:#999999;">, </span><span style="color:#2E8F82;">S</span><span style="color:#999999;">, </span><span style="color:#2E8F82;">T</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#999999;">):</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletToggleObjectReturn</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#1E754F;">export</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">declare</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">function</span><span style="color:#393A34;"> </span><span style="color:#59873A;">useLeafletToggleObject</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">S</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">T</span><span style="color:#999999;">&gt;(</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">source</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">S</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">target</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">MaybeRefOrGetter</span><span style="color:#999999;">&lt;</span><span style="color:#2E8F82;">T</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">null</span><span style="color:#999999;"> | </span><span style="color:#AB5959;">undefined</span><span style="color:#999999;">&gt;,</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">options</span><span style="color:#999999;">: </span><span style="color:#2E8F82;">UseLeafletToggleObjectOptions</span><span style="color:#999999;">&lt;</span><span style="color:#AB5959;">true</span><span style="color:#999999;">, </span><span style="color:#2E8F82;">S</span><span style="color:#999999;">, </span><span style="color:#2E8F82;">T</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#999999;">):</span><span style="color:#393A34;"> </span><span style="color:#2E8F82;">UseLeafletToggleObjectReturnWithControls</span><span style="color:#999999;">;</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletToggleObject/index.ts" target="_blank" rel="noreferrer">Source</a> • <a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletToggleObject/demo.vue" target="_blank" rel="noreferrer">Demo</a> • <a href="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletToggleObject/index.md" target="_blank" rel="noreferrer">Docs</a></p>`,6);function E(u,C,f,d,b,m){const p=n("Demo"),o=n("ClientOnly");return t(),c("div",null,[D,i,B,l(o,null,{default:r(()=>[l(p,{name:"useLeafletToggleObject","source-url":"https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletToggleObject/demo.vue"})]),_:1}),g])}const L=e(A,[["render",E]]);export{T as __pageData,L as default};
