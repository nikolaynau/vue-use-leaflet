<script setup lang="ts">
import { Marker } from 'leaflet';
import { ref, reactive } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletLayer,
  useLeafletLayersControl,
  useLeafletDisplayControl
} from 'vue-use-leaflet';

const element = ref<HTMLElement | null>(null);
const map = useLeafletMap(element);

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

const markerA = useLeafletLayer({ create: () => new Marker([0, 0]) });
const markerB = useLeafletLayer({ create: () => new Marker([-10, -10]) });

const baseLayers = reactive({
  'Open Street Map': osm,
  'Google Streets': google,
  'Arc Gis': arcGis
});

const overlays = reactive({
  'Marker A': markerA,
  'Marker B': markerB
});

const currentBaseLayer = ref('Open Street Map');
const currentOverlays = ref([]);

const layersControl = useLeafletLayersControl(baseLayers, overlays, {
  currentBaseLayer,
  currentOverlays
});

useLeafletDisplayControl(map, layersControl);
</script>

<template>
  <div ref="element" style="height: 250px"></div>
  <div class="section">
    Current Base Layer:
    <select v-model="currentBaseLayer">
      <option v-for="(value, name) in baseLayers" :key="name" :value="name">
        {{ name }}
      </option>
    </select>
    <div>Selected: {{ currentBaseLayer }}</div>
  </div>
  <div class="section">
    Current Overlays:
    <select v-model="currentOverlays" multiple>
      <option v-for="(value, name) in overlays" :key="name" :value="name">
        {{ name }}
      </option>
    </select>
    <div>Selected: {{ currentOverlays }}</div>
  </div>
</template>

<style scoped>
.section {
  margin-bottom: 1rem;
}
.section select {
  vertical-align: top;
}
</style>
