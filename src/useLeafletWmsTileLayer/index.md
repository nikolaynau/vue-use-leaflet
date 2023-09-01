---
category: Layer
---

# useLeafletWmsTileLayer

Used to display [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services as tile layers on the map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletWmsTileLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);

// create WMS tile layer
const wms = useLeafletWmsTileLayer(
  'http://ows.mundialis.de/services/service?',
  { layers: 'TOPO-OSM-WMS' }
);

// display WMS tile layer
useLeafletDisplayLayer(map, wms);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
