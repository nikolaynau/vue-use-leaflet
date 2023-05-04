---
category: Layer
---

# useLeafletImageOverlay

Used to load and display a single image over specific bounds of the map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletImageOverlay
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create image overlay
const imageOverlay = useLeafletImageOverlay(
  'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
  [
    [0, 0],
    [-20, -20]
  ]
);

// display image overlay
useLeafletDisplayLayer(map, imageOverlay);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
