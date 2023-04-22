---
category: Other
---

# useLeafletToggleObject

Switch between two states `true` and `false`.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Marker } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletToggleObject,
  useLeafletLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create marker
const marker = useLeafletLayer(() => new Marker([0, 0]));

// create toggle object
const toggle = useLeafletToggleObject(map, marker, {
  onToggle: (source, target, value) => {
    if (value) {
      source.addLayer(target);
    } else {
      source.removeLayer(target);
    }
  }
});

// toggle() // hide marker
// toggle() // show marker
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
