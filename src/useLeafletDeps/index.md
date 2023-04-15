---
category: Other
---

# useLeafletDeps

Returns undefined if any of the dependencies is falsy, otherwise returns the value from the source.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Marker } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletLayer,
  useLeafletDeps
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// init dependency
const dep = ref(false);

// create marker
const marker = useLeafletLayer(() => new Marker([0, 0]));

// display marker when dependency is truthy
useLeafletDisplayLayer(map, useLeafletDeps(marker, dep));
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
