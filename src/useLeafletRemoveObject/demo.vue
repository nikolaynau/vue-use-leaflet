<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletRemoveObject
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const watchSource = ref(false);
const remove = useLeafletRemoveObject(map, {
  remove: map => map.off().remove(),
  isRemoved: map => !(map.getContainer() as any)._leaflet_id,
  cleanRef: true,
  watch: watchSource
});
</script>

<template>
  <div ref="el" style="height: 19rem"></div>
  <br />
  <button @click="watchSource = true">Set WatchSource</button>
  WatchSource: {{ watchSource }}
  <br />
  <button @click="remove">Manual Destroy Map</button>
  <br />
  <button @click="map = null">Clean Map Ref</button>
</template>
