---
category: Control
---

# useLeafletRemoveControl

Remove control when component is unmounted, set ref to null or manually.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletRemoveControl,
  useLeafletScaleControl,
  useLeafletDisplayControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const scaleControl = useLeafletScaleControl();
useLeafletDisplayControl(map, scaleControl);

const remove = useLeafletRemoveControl(scaleControl);
// remove() // OR
// scaleControl.value = null // OR
// component is unmounted
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
