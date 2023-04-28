---
category: Other
---

# useLeafletCreate

Lazy creation object with source watching.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Marker, type LatLngExpression } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletCreate
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// marker position
const position = ref<LatLngExpression | undefined>(undefined);

// lazy create
const marker = useLeafletCreate(() => new Marker(position.value!), {
  watch: position
});

// display marker when created
useLeafletDisplayLayer(map, marker);

// create and show marker
// position.value = [0, 0];
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
