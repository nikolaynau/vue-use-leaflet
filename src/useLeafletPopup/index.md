---
category: Layer
---

# useLeafletPopup

Used to open popups in certain places of the map.

## Usage

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';
import type { LatLngTuple } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletPopup
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// popup position
const latlng = ref<LatLngTuple>([0, 0]);

// popup content
const content = computed(() => `LatLng: ${latlng.value[0]},${latlng.value[1]}`);

// create popup
const popup = useLeafletPopup(latlng, { content });

// display popup
useLeafletDisplayLayer(map, popup);

// latlng.value = [-10, -10]; // change popup position and redraw content
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
