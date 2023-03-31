<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletRemoveObject
} from 'vue-use-leaflet';

const element = ref<HTMLElement | null>(null);
const map = useLeafletMap(element);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const destroyed = ref(false);

const remove = useLeafletRemoveObject(map, {
  remove: map => map.off().remove(),
  isRemoved: map => !(map.getContainer() as any)._leaflet_id,
  cleanRef: true,
  watch: destroyed
});
</script>

<template>
  <div ref="element" style="height: 250px"></div>
  <button @click="destroyed = true">Destroy Map</button>
  Destroyed: {{ destroyed }}
  <br />
  <button @click="remove">Manual Destroy Map</button>
</template>
