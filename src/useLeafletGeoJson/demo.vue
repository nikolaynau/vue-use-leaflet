<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { PathOptions } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletGeoJson
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { zoom: 2 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const geojson = ref({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [0, 0] },
      properties: { name: 'a' }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [0, 0],
          [-10, -10],
          [-20, -20]
        ]
      },
      properties: {
        name: 'b'
      }
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-20, -20] },
      properties: { name: 'c' }
    }
  ]
});

const style = reactive({ color: 'green' }) as PathOptions;

const geoJsonLayer = useLeafletGeoJson(geojson, { style });
useLeafletDisplayLayer(map, geoJsonLayer);
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <div>
    Color:
    <select v-model="style.color">
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="red">Red</option>
      <option value="black">Black</option>
    </select>
    Selected: {{ style.color }}
  </div>
</template>
