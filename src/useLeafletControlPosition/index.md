---
category: Control
---

# useLeafletControlPosition

Creates a new control positions. Control positions are DOM elements used to control the position on the map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletControlPosition,
  useLeafletZoomControl,
  useLeafletDisplayControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { zoomControl: false });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create custom control position
useLeafletControlPosition(map, ['center', 'right'], { flushSync: true });

// create zoom control in center right
const zoomControl = useLeafletZoomControl({
  position: 'centerright'
});

// display zoom control
useLeafletDisplayControl(map, zoomControl);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>

<style>
.leaflet-center {
  position: absolute;
  z-index: 1000;
  pointer-events: none;
}

.leaflet-center {
  top: 50%;
  transform: translateY(-50%);
}
</style>
```
