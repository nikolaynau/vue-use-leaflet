---
category: Layer
---

# useLeafletMarker

Marker is used to display clickable/draggable icons on the map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create marker
const marker = useLeafletMarker([0, 0]);

// display marker
useLeafletDisplayLayer(map, marker);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
