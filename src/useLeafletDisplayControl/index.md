---
category: Control
---

# useLeafletDisplayControl

Show the control object on the map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletDisplayControl,
  useLeafletLayersControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// initial value
const visible = ref(true);

// create layers control
const layersControl = useLeafletLayersControl([
  { name: 'Open Street Map', layer: tileLayer }
]);

// display layers control
const { toggle } = useLeafletDisplayControl(map, layersControl, {
  controls: true,
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
