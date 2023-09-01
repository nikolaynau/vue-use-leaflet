---
category: Other
---

# useLeafletDiff

Watch the source of the array and call the `add` and `remove` functions when the array changes.

## Usage

```vue
<script setup lang="ts">
import { markRaw, reactive, ref } from 'vue';
import { Marker, LayerGroup, Util } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletDiff
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create layer group
const layerGroup = new LayerGroup();

// create markers
const markerA = markRaw(new Marker([0, 0]));
const markerB = markRaw(new Marker([-20, -20]));
const markerC = markRaw(new Marker([-40, -40]));

// source for diff
const layers = reactive([markerA, markerB]);

// create array diff
useLeafletDiff(layers, compare, {
  // called when items need to be added
  add: layers => {
    layers.forEach(layer => {
      layerGroup.addLayer(layer);
    });
  },

  // called when items need to be removed
  remove: layers => {
    layers.forEach(layer => {
      layerGroup.removeLayer(layer);
    });
  },

  // watch options
  watchOptions: {
    immediate: true
  }
});

// display layer group
const toggle = useLeafletDisplayLayer(map, layerGroup);

// compare function
function compare(a: Marker, b: Marker): boolean {
  return Util.stamp(a) === Util.stamp(b);
}

// add marker to layer group
// layers.push(markerC);

// show/hide layer group with markers
// toggle();
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
