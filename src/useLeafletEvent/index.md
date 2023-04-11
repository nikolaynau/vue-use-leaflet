---
category: Event
---

# useLeafletEvent

A set of methods shared between event-powered classes (like Map and Marker).

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import type { LatLng, LeafletEvent, Map } from 'leaflet';
import {
  useLeafletMap,
  useLeafletEvent,
  useLeafletTileLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// subscribe to moveend map event
const cleanup = useLeafletEvent(map, 'moveend', (e: LeafletEvent) => {
  // called when the center of the map stops changing
});
// cleanup() // unregister the listener
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
