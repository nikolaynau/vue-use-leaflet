---
category: Layer
---

# useLeafletIcon

Represents an icon to provide when creating a marker.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletIcon
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// icon image url
const iconUrl = ref('custom/marker-icon.png');

// create icon
const icon = useLeafletIcon(iconUrl, {
  iconSize: [32, 42],
  iconAnchor: [16, 42]
});

// create marker with icon
const marker = useLeafletMarker([0, 0], { icon });

// display icon
useLeafletDisplayLayer(map, marker);

// change icon image
// iconUrl.value = 'custom/marker-icon-alt.png';
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
