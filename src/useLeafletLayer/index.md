---
category: Layer
---

# useLeafletLayer

Factory for creating map layers. Supports auto-remove.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Marker, type LatLngExpression } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// initial marker position
const position = ref<LatLngExpression>([0, 0]);

// create marker
const marker = useLeafletLayer(() => new Marker(position.value), {
  updateSources: [
    {
      watch: position,
      handler: instance => instance.setLatLng(position.value)
    }
  ]
});

// display marker
useLeafletDisplayLayer(map, marker);

// change marker position
// position.value = [-10, -10];
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
