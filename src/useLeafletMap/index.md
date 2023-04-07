---
category: Map
---

# useLeafletMap

Create a leaflet map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

// map DOM element
const el = ref<HTMLElement | null>(null);

// create map
const map = useLeafletMap(el);

// create default tile layer
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);

// display tile layer
useLeafletDisplayLayer(map, tileLayer);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
