---
category: Layer
---

# useLeafletDisplayLayer

Show the layer object on the map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Marker } from 'leaflet';
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

// initial visible value
const visible = ref(true);

// create marker
const marker = useLeafletLayer(() => new Marker([0, 0]));

// display marker
const toggle = useLeafletDisplayLayer(map, marker, {
  initialValue: visible
});

// toggle() // show / hide control
// visible.value = false // hide control
// visible.value = true // show control
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
