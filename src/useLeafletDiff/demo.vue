<script setup lang="ts">
import { markRaw, reactive, ref } from 'vue';
import { Marker, LayerGroup, Util } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletDiff
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const layerGroup = new LayerGroup();

const markerA = markRaw(new Marker([0, 0]));
const markerB = markRaw(new Marker([-20, -20]));
const markerC = markRaw(new Marker([-40, -40]));

const layers = reactive([markerA, markerB]);

useLeafletDiff(layers, compare, {
  add: layers => {
    layers.forEach(layer => {
      layerGroup.addLayer(layer);
    });
  },
  remove: layers => {
    layers.forEach(layer => {
      layerGroup.removeLayer(layer);
    });
  },
  watchOptions: {
    immediate: true
  }
});

const toggle = useLeafletDisplayLayer(map, layerGroup);

function compare(a: Marker, b: Marker): boolean {
  return Util.stamp(a) === Util.stamp(b);
}

function addMarker() {
  layers.push(markerC);
}
</script>

<template>
  <div ref="el" style="height: 20rem"></div>
  <br />
  <button @click="addMarker">Add Marker</button>
  <br />
  <button @click="toggle()">Toggle Show</button>
</template>
