---
category: Control
---

# useLeafletAttributionControl

The attribution control allows you to display attribution data in a small text box on a map.

## Usage

It is put on the map by default unless you set its `attributionControl` option to `false`.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayControl,
  useLeafletDisplayLayer,
  useLeafletAttributionControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { attributionControl: false });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  { attribution: 'Open Street Map' }
);
useLeafletDisplayLayer(map, tileLayer);

// starts with attribution text
const prefix = ref<string | undefined>('Some Prefix');

// custom attributions
const attributions = ref(['A', 'B', 'C']);

// create attributions control
const attributionControl = useLeafletAttributionControl({
  prefix,
  attributions
});

// display attributions control
useLeafletDisplayControl(map, attributionControl);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
