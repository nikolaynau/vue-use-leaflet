---
category: Layer
---

# useLeafletTileLayer

Used to load and display tile layers on the map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);

// create tile layer
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  { attribution: 'Open Street Map' }
);

// display tile layer
useLeafletDisplayLayer(map, tileLayer);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
