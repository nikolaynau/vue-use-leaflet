---
category: Layer
---

# useLeafletDefaultIcon

Represents the blue icon Leaflet uses for markers by default.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletDefaultIcon
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create default marker
const icon = useLeafletDefaultIcon();

// create marker with icon
const marker = useLeafletMarker([0, 0], { icon });

// display marker
useLeafletDisplayLayer(map, marker);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
