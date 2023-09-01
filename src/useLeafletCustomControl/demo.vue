<script setup lang="ts">
import { ref } from 'vue';
import { DomEvent } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayControl,
  useLeafletDisplayLayer,
  useLeafletCustomControl,
  useLeafletMarker
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const marker = useLeafletMarker([0, 0]);
const { value: visible } = useLeafletDisplayLayer(map, marker, {
  controls: true
});

const disabled = ref(false);
const controlElement = ref<HTMLElement | null>(null);
const customControl = useLeafletCustomControl({
  disabled,
  onAdd: map => {
    console.log('useLeafletCustomControl::onAdd', map);

    const container = document.createElement('div');
    DomEvent.disableClickPropagation(container);
    DomEvent.disableScrollPropagation(container);

    if (controlElement.value) {
      container.appendChild(controlElement.value);
    }
    return container;
  },
  onRemove: map => console.log('useLeafletCustomControl::onRemove', map),
  onDisable: (map, control) =>
    console.log('useLeafletCustomControl::onDisable', map, control),
  onEnable: (map, control) =>
    console.log('useLeafletCustomControl::onEnable', map, control)
});

useLeafletDisplayControl(map, customControl);
</script>

<template>
  <div ref="el" style="height: 22rem"></div>
  <div
    ref="controlElement"
    class="custom-control"
    :class="{ 'custom-control--disabled': disabled }"
  >
    <label>
      <span>visible: </span>
      <input type="checkbox" v-model="visible" :disabled="disabled" />
    </label>
  </div>
  <br />
  <button @click="disabled = !disabled">Toggle Disabled</button>
  <span> Disabled: {{ disabled }}</span>
</template>

<style scoped>
.custom-control {
  padding: 0.2rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  user-select: none;
  color: black;
}
.custom-control--disabled {
  opacity: 70%;
}
.custom-control span,
.custom-control input {
  vertical-align: middle;
}
</style>
