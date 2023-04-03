<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletToggleObject
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);

const toggle = useLeafletToggleObject(map, tileLayer, {
  onToggle: (source, target, value) => {
    if (value) {
      source.addLayer(target);
    } else {
      source.removeLayer(target);
    }
  }
});
</script>

<template>
  <div ref="el" style="height: 250px"></div>
  <button @click="toggle()">Toggle</button>
</template>
