---
category: Layer
---

# useLeafletPolyline

A create object for drawing polyline overlays on a map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletPolyline
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// polyline color
const color = ref<string>('green');

// create polyline
const polyline = useLeafletPolyline(
  [
    [0, 0],
    [-10, -5],
    [-5, -10],
    [-20, -20]
  ],
  { color }
);

// display polyline
useLeafletDisplayLayer(map, polyline);

// color.value = 'black'; // redraw polyline
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
