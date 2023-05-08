---
category: Layer
---

# useLeafletPolyline

A create object for drawing polyline overlays on a map.

## Usage

Create a polyline from an array of LatLng points:

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

// path color
const color = ref<string>('green');

// create simple polyline
const polyline = useLeafletPolyline(
  [
    [0, 0],
    [-20, -20]
  ],
  { color }
);

// display simple polyline
useLeafletDisplayLayer(map, polyline);

// color.value = 'black'; // redraw path
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

You can also pass a multi-dimensional array to represent a MultiPolyline shape:

```vue
<script setup lang="ts">
// create multiPolyline
const multiPolyline = useLeafletPolyline([
  // create line1
  [
    [-10, 0],
    [-15, -5]
  ],
  // create line2
  [
    [-16, -6],
    [-21, -11]
  ],
  // create line3
  [
    [-22, -12],
    [-26, -16]
  ]
]);

// display multiPolyline
useLeafletDisplayLayer(map, multiPolyline);
</script>
```
