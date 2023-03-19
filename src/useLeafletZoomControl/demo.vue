<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayControl,
  useLeafletDisplayLayer,
  useLeafletZoomControl
} from 'vue-use-leaflet';

const element = ref<HTMLElement | null>(null);
const map = useLeafletMap(element, { zoomControl: false });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const disabled = ref(false);
const zoomControl = useLeafletZoomControl({
  disabled
});
useLeafletDisplayControl(map, zoomControl);
</script>

<template>
  <div ref="element" style="height: 250px"></div>
  <button @click="disabled = !disabled">
    {{ disabled ? 'Enable' : 'Disable' }}
  </button>
  <span> Disabled: {{ disabled }}</span>
</template>
