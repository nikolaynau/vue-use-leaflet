# vue-use-leaflet [![npm version](https://img.shields.io/npm/v/vue-use-leaflet.svg)](https://npmjs.org/package/vue-use-leaflet) [![npm downloads](https://img.shields.io/npm/dm/vue-use-leaflet.svg)](https://npmjs.org/package/vue-use-leaflet)

> Vue composition utilities for leaflet map.

[Demo & Documentation](https://vueuseleaflet.org)

## Installation

```bash
# NPM
$ npm install vue-use-leaflet leaflet

# Yarn
$ yarn add vue-use-leaflet leaflet

# pnpm
$ pnpm install vue-use-leaflet leaflet
```

## Usage

```js
import { useLeafletMap, useLeafletTileLayer, useLeafletDisplayLayer } from 'vue-use-leaflet';

export default {
  setup() {
    // dom element reference
    const element = ref(null);

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

## License

Licensed under the [MIT License](./LICENSE).
