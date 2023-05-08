---
category: Layer
---

# useLeafletCircle

A create object for drawing circle overlays on a map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletCircle
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [0, 0], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// path color
const color = ref<string>('green');

// radius of the circle, in meters
const radius = ref<number>(100000); // 100km

// create circle
const circle = useLeafletCircle([0, 0], { radius, color });

// display circle
useLeafletDisplayLayer(map, circle);

// color.value = 'black'; // redraw path
// radius.value = 200000; // change radius and redraw path
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
