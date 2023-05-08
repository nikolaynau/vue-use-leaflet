---
category: Layer
---

# useLeafletRectangle

A create object for drawing rectangle overlays on a map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletRectangle
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// path color
const color = ref<string>('green');

// create rectangle
const rectangle = useLeafletRectangle(
  [
    [0, 0],
    [-20, -20]
  ],
  { color }
);

// display rectangle
useLeafletDisplayLayer(map, rectangle);

// color.value = 'black'; // redraw path
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
