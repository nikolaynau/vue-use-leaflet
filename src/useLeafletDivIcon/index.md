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
const iconA = useLeafletDivIcon(html, {
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  className: 'custom-marker'
});

// create marker with icon
const markerA = useLeafletMarker([0, 0], { icon: iconA });

// display marker
useLeafletDisplayLayer(map, markerA);

// icon dom element
const iconEl = ref<HTMLElement | null>(null);

// create icon with dom element
const iconB = useLeafletDivIcon(iconEl, {
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  className: 'counter-marker'
});

// create marker
const markerB = useLeafletMarker([-25, -25], { icon: iconB });

// display marker
useLeafletDisplayLayer(map, markerB);

// counter.value += 1; // update icons
</script>

<template>
  <div ref="el" style="height: 250px"></div>
  <div ref="iconEl">{{ counter }}</div>
</template>
```
