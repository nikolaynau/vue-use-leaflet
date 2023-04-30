<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletWmsTileLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const wms = useLeafletWmsTileLayer(
  'http://ows.mundialis.de/services/service?',
  { layers: 'TOPO-OSM-WMS' }
);
useLeafletDisplayLayer(map, wms);
</script>

<template>
  <div ref="el" style="height: 25rem"></div>
</template>
