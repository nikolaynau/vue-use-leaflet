---
category: Layer
---

# useLeafletPath

An abstract function that contains options and constants shared between vector overlays (Polygon, Polyline, Circle). This is used with the `factory` function.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Polygon, Polyline } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletPath
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// path color
const color = ref<string>('green');

// create polygon
const polygon = useLeafletPath(
  opt =>
    new Polygon(
      [
        [0, -15],
        [-5, -25],
        [-15, -25],
        [-10, -15]
      ],
      opt
    ),
  { color }
);

// create polyline
const polyline = useLeafletPath(
  opt =>
    new Polyline(
      [
        [0, 0],
        [-10, -5],
        [-5, -10],
        [-20, -15]
      ],
      opt
    ),
  { color }
);

// display polyline
useLeafletDisplayLayer(map, polyline);

// display polygon
useLeafletDisplayLayer(map, polygon);

// color.value = 'black'; // redraw path
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
