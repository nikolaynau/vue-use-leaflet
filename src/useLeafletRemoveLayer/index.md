---
category: Layer
---

# useLeafletRemoveLayer

Remove layer when component is unmounted, set ref to null or manually.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletRemoveLayer,
  useLeafletMarker
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const marker = useLeafletMarker([0, 0]);
useLeafletDisplayLayer(map, marker);

const remove = useLeafletRemoveLayer(marker);
// remove() // OR
// marker.value = null // OR
// component is unmounted
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
