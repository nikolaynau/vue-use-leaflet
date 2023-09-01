<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletMarker,
  useLeafletLayersControl,
  useLeafletDisplayControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);

// Open Street Map
const osm = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);

// Google Streets
const google = useLeafletTileLayer(
  'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  { subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }
);

// Arc Gis
const arcGis = useLeafletTileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
);

const markerA = useLeafletMarker([0, 0]);
const markerB = useLeafletMarker([-10, -10]);

const layers = reactive([
  { name: 'Open Street Map', layer: osm },
  { name: 'Google Streets', layer: google },
  { name: 'Arc Gis', layer: arcGis },
  { name: 'Marker A', layer: markerA, overlay: true },
  { name: 'Marker B', layer: markerB, overlay: true }
]);

const baseLayers = computed(() =>
  layers.filter(({ overlay }) => !overlay).map(({ name }) => name)
);

const overlays = computed(() =>
  layers.filter(({ overlay }) => overlay).map(({ name }) => name)
);

const currentBaseLayer = ref('Open Street Map');
const currentOverlays = ref([]);

const layersControl = useLeafletLayersControl(layers, {
  currentBaseLayer,
  currentOverlays
});

useLeafletDisplayControl(map, layersControl);
</script>

<template>
  <div ref="el" style="height: 230px"></div>
  <div class="section">
    Current Base Layer:
    <select v-model="currentBaseLayer">
      <option v-for="name in baseLayers" :key="name" :value="name">
        {{ name }}
      </option>
    </select>
    <div>Selected: {{ currentBaseLayer }}</div>
  </div>
  <div class="section">
    Current Overlays:
    <select v-model="currentOverlays" multiple>
      <option v-for="name in overlays" :key="name" :value="name">
        {{ name }}
      </option>
    </select>
    <div>Selected: {{ currentOverlays }}</div>
  </div>
</template>

<style scoped>
.section {
  margin-top: 1rem;
}
.section select {
  vertical-align: top;
}
</style>
