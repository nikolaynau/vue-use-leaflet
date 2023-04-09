---
category: Control
---

# useLeafletCustomControl

Create custom control. Your should implement the `onAdd` method.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { DomEvent, Marker } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayControl,
  useLeafletDisplayLayer,
  useLeafletCustomControl,
  useLeafletLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create marker
const marker = useLeafletLayer(() => new Marker([0, 0]));

// display marker
const { value: visible } = useLeafletDisplayLayer(map, marker, {
  controls: true
});

// custom control DOM element
const controlElement = ref<HTMLElement | null>(null);

// create custom control
const customControl = useLeafletCustomControl({
  onAdd: map => {
    // implement the onAdd method

    // create a control container and return it in this method
    const container = document.createElement('div');

    // disable zoom and moving map on container element
    DomEvent.disableClickPropagation(container);
    DomEvent.disableScrollPropagation(container);

    // add a custom control element to the container
    if (controlElement.value) {
      container.appendChild(controlElement.value);
    }

    // return container element
    return container;
  },
  onRemove: map => {
    // called when the custom control is removed
  },
  onDisable: (map, control) => {
    // called when the custom control is disabled
  },
  onEnable: (map, control) => {
    // called when the custom control is enabled
  }
});

// display custom control
useLeafletDisplayControl(map, customControl);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
  <div ref="controlElement">
    <label>
      <span>visible: </span>
      <input type="checkbox" v-model="visible" />
    </label>
  </div>
</template>
```
