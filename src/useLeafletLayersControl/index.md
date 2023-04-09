---
category: Control
---

# useLeafletLayersControl

The layers control gives users the ability to switch between different base layers and switch overlays on/off.

## Usage

```vue
<script setup lang="ts">
import { Marker } from 'leaflet';
import { ref, reactive, computed } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletLayer,
  useLeafletLayersControl,
  useLeafletDisplayControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);

// create osm tile layer
const osm = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);

// create google streets tile layer
const google = useLeafletTileLayer(
  'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  { subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }
);

// create arc gis tile layer
const arcGis = useLeafletTileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
);

// create marker A
const markerA = useLeafletLayer(() => new Marker([0, 0]));

// create marter B
const markerB = useLeafletLayer(() => new Marker([-10, -10]));

// list of layers
const layers = reactive([
  { name: 'Open Street Map', layer: osm },
  { name: 'Google Streets', layer: google },
  { name: 'Arc Gis', layer: arcGis },
  { name: 'Marker A', layer: markerA, overlay: true },
  { name: 'Marker B', layer: markerB, overlay: true }
]);

// set current base layer
const currentBaseLayer = ref('Open Street Map');

// set current overlays
const currentOverlays = ref(['Marker A']);

// create layers control
const layersControl = useLeafletLayersControl(layers, {
  currentBaseLayer,
  currentOverlays
});

// display layers control
useLeafletDisplayControl(map, layersControl);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

Use index numbers instead of names to select current layer or overlays.

```vue
<script setup lang="ts">
const currentBaseLayer = ref(0);
const currentOverlays = ref([0, 1]);

const layersControl = useLeafletLayersControl(layers, {
  currentBaseLayer,
  currentOverlays,
  indexes: true
});

useLeafletDisplayControl(map, layersControl);
</script>
```
