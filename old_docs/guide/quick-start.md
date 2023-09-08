---
title: Quick Start
description: Quick start with Vue Use Leaflet
sidebarDepth: 1
meta:
  - name: og:title
    content: Quick Start
  - name: og:description
    content: Quick start with Vue Use Leaflet
---

# Quick Start

## Installation

> it works for Vue 2 & 3 within a single package by the power of [vue-demi](https://github.com/vueuse/vue-demi).

<CodeGroup>
  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
$ npm install vue-use-leaflet leaflet
```

  </CodeGroupItem>

  <CodeGroupItem title="YARN">

```bash:no-line-numbers
$ yarn add vue-use-leaflet leaflet
```

  </CodeGroupItem>

  <CodeGroupItem title="PNPM">

```bash:no-line-numbers
$ pnpm install vue-use-leaflet leaflet
```

  </CodeGroupItem>
</CodeGroup>

## Usage Example

```ts
import { useLeafletMap, useLeafletTileLayer, useLeafletDisplayLayer } from 'vue-use-leaflet';

export default {
  setup() {
    // dom element reference
    const element = ref<HTMLElement | null>(null);

    // create leaflet map
    const map = useLeafletMap(element);

    // create osm tile layer
    const tileLayer = useLeafletTileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    );

    // add layer to the map
    useLeafletDisplayLayer(map, tileLayer);

    return { element };
  }
};
```

Refer to [functions list](/functions/) for more details.
