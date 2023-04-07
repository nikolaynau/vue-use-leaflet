---
category: Control
---

# useLeafletScaleControl

A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayControl,
  useLeafletDisplayLayer,
  useLeafletScaleControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create scale control
const scaleControl = useLeafletScaleControl();

// display scale control
useLeafletDisplayControl(map, scaleControl);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
