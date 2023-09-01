---
category: Layer
---

# useLeafletLayerTooltip

Used to bind a tooltip to layer (marker, path, etc).

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletLayerTooltip
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create marker
const marker = useLeafletMarker([0, 0]);

// bind tooltip to marker
const { visible, toggle } = useLeafletLayerTooltip(marker, 'Text', {
  visible: true
});

// display marker and tooltip
useLeafletDisplayLayer(map, marker);

// visible.value = false; // hide tooltip
// toggle(); // show/hide tooltip
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
