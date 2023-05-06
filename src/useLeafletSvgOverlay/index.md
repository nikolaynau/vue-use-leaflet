---
category: Layer
---

# useLeafletSvgOverlay

Used to load, display and provide DOM access to an SVG file over specific bounds of the map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import type { LatLngBoundsLiteral } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletSvgOverlay
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create svg element
const svgElement = document.createElementNS(
  'http://www.w3.org/2000/svg',
  'svg'
);
svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
svgElement.setAttribute('viewBox', '0 0 200 200');
svgElement.innerHTML =
  '<rect width="200" height="200"/><rect x="75" y="23" width="50" height="50" style="fill:red"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>';

// svg overlay bounds
const bounds: LatLngBoundsLiteral = [
  [0, 0],
  [-20, -20]
];

// create svg overlay
const videoOverlay = useLeafletSvgOverlay(svgElement, bounds);

// display image overlay
useLeafletDisplayLayer(map, videoOverlay);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
