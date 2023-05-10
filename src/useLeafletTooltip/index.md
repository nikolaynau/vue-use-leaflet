---
category: Layer
---

# useLeafletTooltip

Used to display small texts on top of map layers.

## Usage

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';
import type { LatLngTuple } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletTooltip
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// tooltip position
const latlng = ref<LatLngTuple>([0, 0]);

// tooltip content
const content = computed(() => `LatLng: ${latlng.value[0]},${latlng.value[1]}`);

// create tooltip
const tooltip = useLeafletTooltip(latlng, { content });

// display tooltip
useLeafletDisplayLayer(map, tooltip);

// latlng.value = [-10, -10]; // change tooltip position and redraw content
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
