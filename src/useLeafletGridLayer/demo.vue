<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletGridLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);

const gridLayer = useLeafletGridLayer(coords => {
  const tile = document.createElement('div');
  tile.className = 'custom-tile';

  const content = document.createElement('div');
  content.textContent = `${coords.x}, ${coords.y}, ${coords.z}`;

  tile.appendChild(content);
  return tile;
});
useLeafletDisplayLayer(map, gridLayer);
</script>

<template>
  <div ref="el" style="height: 25rem"></div>
</template>

<style>
.custom-tile {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  background-color: white;
  border: 1px solid black;
}
.custom-tile > div {
  text-align: center;
  padding: 1rem;
}
</style>
