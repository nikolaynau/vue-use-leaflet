---
outline: deep
---

# Getting Started

## Installation

> it works for Vue 2 & 3 within a single package by the power of [vue-demi](https://github.com/vueuse/vue-demi).

### NPM

```bash:no-line-numbers
$ npm install vue-use-leaflet leaflet
```

### YARN

```bash:no-line-numbers
$ yarn add vue-use-leaflet leaflet
```

### PNPM

```bash:no-line-numbers
$ pnpm install vue-use-leaflet leaflet
```

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

Refer to [functions](/functions/) for more details.
