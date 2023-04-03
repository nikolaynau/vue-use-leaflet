<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const visible = ref(true);
const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);

const toggle = useLeafletDisplayLayer(map, tileLayer, {
  initialValue: visible
});
</script>

<template>
  <div ref="el" style="height: 250px"></div>
  <button @click="toggle()">Toggle Visible</button>
  <span> Visible: {{ visible }}</span>
  <br />
  <button @click="tileLayer = null">Clear Ref</button>
</template>
