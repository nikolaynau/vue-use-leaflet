<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletLayerGroup,
  useLeafletMarker
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const markerA = useLeafletMarker([0, 0]);
const markerB = useLeafletMarker([-20, -20]);
const markerC = useLeafletMarker([-40, -40]);

const layers = reactive([markerA, markerB]);
const layerGroup = useLeafletLayerGroup(layers);
const toggle = useLeafletDisplayLayer(map, layerGroup);

function addMarker() {
  layers.push(markerC);
}
</script>

<template>
  <div ref="el" style="height: 20rem"></div>
  <br />
  <button @click="addMarker">Add Marker</button>
  <br />
  <button @click="toggle()">Toggle Show</button>
</template>
