---
category: Layer
---

# useLeafletLayerPopup

Used to bind a popup to layer (marker, path, etc).

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletLayerPopup
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create marker
const marker = useLeafletMarker([0, 0]);

// bind popup to marker
const { visible, toggle } = useLeafletLayerPopup(marker, 'Text', {
  visible: true
});

// display marker and popup
useLeafletDisplayLayer(map, marker);

// visible.value = false; // hide popup
// toggle(); // show/hide popup
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
