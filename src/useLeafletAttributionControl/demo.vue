<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayControl,
  useLeafletDisplayLayer,
  useLeafletAttributionControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { attributionControl: false });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  { attribution: 'Open Street Map' }
);
useLeafletDisplayLayer(map, tileLayer);

const prefix = ref<string | undefined>(undefined);
const attributions = ref([]);
const attributionControl = useLeafletAttributionControl({
  prefix,
  attributions
});
useLeafletDisplayControl(map, attributionControl);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
  <div>Prefix: <input type="text" v-model="prefix" /></div>
  <br />
  <div>
    Attributions:
    <select v-model="attributions" multiple>
      <option value="">None</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
    </select>
    Selected: {{ attributions }}
  </div>
</template>
