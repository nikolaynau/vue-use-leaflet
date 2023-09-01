---
category: Layer
---

# useLeafletLayerGroup

Used to group several layers and handle them as one. If you add it to the map, any layers added or removed from the group will be added/removed on the map as well.

## Usage

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletLayerGroup,
  useLeafletMarker
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create markers
const markerA = useLeafletMarker([0, 0]);
const markerB = useLeafletMarker([-20, -20]);
const markerC = useLeafletMarker([-40, -40]);

// layers list
const layers = reactive([markerA, markerB]);

// create layer group
const layerGroup = useLeafletLayerGroup(layers);

// display layer group
const toggle = useLeafletDisplayLayer(map, layerGroup);

// add marker to layer group
// layers.push(markerC);

// show/hide layer group with markers
// toggle();
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
