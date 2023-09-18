---
category: Control
---

# useLeafletLocateControl

A useful control to geolocate the user with many options. Read more in the [@leaflet-extensions/locatecontrol](https://github.com/nikolaynau/leaflet-extensions/tree/master/packages/leaflet-locatecontrol) documentation.

## Install

```bash
$ npm install @leaflet-extensions/locatecontrol
```

```js
import '@leaflet-extensions/locatecontrol';
import '@leaflet-extensions/locatecontrol/dist/leaflet-locatecontrol.css';
```

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayControl,
  useLeafletDisplayLayer,
  useLeafletLocateControl
} from 'vue-use-leaflet';
import '@leaflet-extensions/locatecontrol';
import '@leaflet-extensions/locatecontrol/dist/leaflet-locatecontrol.css';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create locate control
const locateControl = useLeafletLocateControl();

// display locate control
useLeafletDisplayControl(map, locateControl);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```
