---
category: Layer
---

# useLeafletPolygon

A create object for drawing polygon overlays on a map.

## Usage

Note that points you pass when creating a polygon shouldn't have an additional last point equal to the first one — it's better to filter out such points.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletPolygon
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
const polygon = useLeafletPolygon(
  [
    [0, -15],
    [-5, -25],
    [-15, -25],
    [-10, -15]
  ],
  { color }
);

// display polygon
useLeafletDisplayLayer(map, polygon);

// color.value = 'black'; // redraw path
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

You can also pass an array of arrays of latlngs, with the first array representing the outer shape and the other arrays representing holes in the outer shape:

```vue
<script setup lang="ts">
// create polygon with holes
const polygonWithHoles = useLeafletPolygon([
  // outer ring
  [
    [-15, -15],
    [-17, -25],
    [-27, -25],
    [-27, -15]
  ],
  // hole
  [
    [-18, -20],
    [-18, -20],
    [-23, -23],
    [-24, -17]
  ]
]);

// display polygon
useLeafletDisplayLayer(map, polygonWithHoles);
</script>
```

Additionally, you can pass a multi-dimensional array to represent a MultiPolygon shape.

```vue
<script setup lang="ts">
// create multiPolygon
const multiPolygon = useLeafletPolygon([
  [
    [
      // first polygon
      [
        [0, -2],
        [-5, -10],
        [-10, -10],
        [-8, -2]
      ]
    ],
    [
      // second polygon
      [
        [-10, -2],
        [-15, -10],
        [-20, -10],
        [-15, -2]
      ]
    ]
  ]
]);

// display multiPolygon
useLeafletDisplayLayer(map, multiPolygon);
</script>
```
