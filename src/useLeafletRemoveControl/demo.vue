<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletRemoveControl,
  useLeafletDisplayControl,
  useLeafletScaleControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const scaleControl = useLeafletScaleControl();
useLeafletDisplayControl(map, scaleControl);

const remove = useLeafletRemoveControl(scaleControl);
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <button @click="remove">Remove Scale Control</button>
</template>
