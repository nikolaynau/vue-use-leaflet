---
category: Other
---

# useLeafletReady

Returns computed `true` when all arguments are truthy.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletReady
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create ready
const ready = useLeafletReady(map, tileLayer);

// ready.value // true when map and tileLayer are initialized
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
