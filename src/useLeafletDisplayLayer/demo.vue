<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const visible = ref(true);
const element = ref<HTMLElement | null>(null);
const map = useLeafletMap(element);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);

const toggle = useLeafletDisplayLayer(map, tileLayer, {
  initialValue: visible
});
</script>

<template>
  <div ref="element" style="height: 250px"></div>
  <button @click="toggle()">Toggle Visible</button>
  <span> Visible: {{ visible }}</span>
  <br />
  <button @click="tileLayer = null">Clear Ref</button>
</template>
