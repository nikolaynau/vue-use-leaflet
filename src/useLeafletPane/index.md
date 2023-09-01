---
category: Map
---

# useLeafletPane

Creates a new map panes. Panes are DOM elements used to control the ordering of layers on the map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { CircleMarker, Marker } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletLayer,
  useLeafletMarker,
  useLeafletDeps,
  useLeafletPane
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create paneA with z-index 800
const { paneElements } = useLeafletPane(map, 'paneA', { zIndex: 800 });

// create sync paneA with z-index 900
useLeafletPane(map, 'paneB', { zIndex: 900, flushSync: true });

// create a marker and place it on paneA
const marker = useLeafletMarker([0, 0], { pane: 'paneA' });

// create a circle marker and place it on paneB
const circle = useLeafletLayer(
  () =>
    new CircleMarker([0, 0], { radius: 20, pane: 'paneB', fillColor: '#000' })
);

// wait for the pane to be created and display marker on the map
useLeafletDisplayLayer(
  map,
  useLeafletDeps(marker, () => paneElements.value.paneA)
);

// display circle marker
useLeafletDisplayLayer(map, circle);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
