---
category: Layer
---

# useLeafletVideoOverlay

Used to load and display a video player over specific bounds of the map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletVideoOverlay
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create video overlay
const videoOverlay = useLeafletVideoOverlay(
  'https://labs.mapbox.com/bites/00188/patricia_nasa.webm',
  [
    [0, 0],
    [-20, -20]
  ]
);

// display video overlay
useLeafletDisplayLayer(map, videoOverlay);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
