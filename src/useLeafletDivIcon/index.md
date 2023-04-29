---
category: Layer
---

# useLeafletDivIcon

Represents a lightweight icon for markers that uses a simple \<div\> element instead of an image.

## Usage

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletDivIcon
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create counter
const counter = ref(10);

// create div icon html
const html = computed(() => `<div>${counter.value}</div>`);

// create div icon
const icon = useLeafletDivIcon(html, {
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  className: 'custom-marker'
});

// create marker with icon
const marker = useLeafletMarker([0, 0], { icon });

// display marker
useLeafletDisplayLayer(map, marker);

// counter.value += 1; // update icon
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
