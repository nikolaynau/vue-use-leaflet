<script setup lang="ts">
/// <reference types="vite/client" />

import { ref, computed, StyleValue } from 'vue';
import { usePlaygroundTheme } from '../../composables/usePlaygroundTheme';
import { useExpand } from '../../composables/useExpand';
import LoadPanel from './LoadPanel.vue';
import Icon from './Icon.vue';
import ChevronsIcon from './ChevronsIcon.vue';
import GithubIcon from './GithubIcon.vue';

export interface Props {
  url?: string;
  baseUrl?: string;
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: '25rem'
});

const loading = ref(true);
const expanded = ref(false);
const frame = ref<HTMLIFrameElement | null>(null);

usePlaygroundTheme(frame);
const { expandEnter, expandAfterEnter, expandBeforeLeave } = useExpand();

const styles = computed<StyleValue>(() => ({
  width: props.width,
  height: props.height
}));

const frameUrl = computed(() => getUrl(props.baseUrl, props.url));
const githubUrl = computed(() => getGitHubUrl(props.url));

function onLoad() {
  loading.value = false;
}

function toggleExpand() {
  expanded.value = !expanded.value;
}

function normalizeUrl(url: string) {
  if (url.startsWith('/')) {
    return url.slice(1);
  }
  return url;
}

function getBaseUrl(): string {
  return import.meta.env.MODE === 'development'
    ? `http://localhost:3000/playground/`
    : `/playground/`;
}

function getUrl(baseUrl?: string, urlPath?: string): string {
  return `${baseUrl ?? getBaseUrl()}${normalizeUrl(urlPath ?? '')}`;
}

function getGitHubUrl(urlPath?: string): string {
  return `https://github.com/nikolaynau/vuemap.org/tree/master/playground/pages/${normalizeUrl(
    urlPath ?? ''
  )}.vue`;
}
</script>

<template>
  <div class="demo">
    <div v-if="url" class="demo-display" :style="styles">
      <LoadPanel v-if="loading" />
      <div class="demo-frame-container">
        <iframe
          ref="frame"
          class="demo-frame"
          loading="lazy"
          :src="frameUrl"
          @load="onLoad"
        ></iframe>
      </div>
    </div>
    <div class="demo-actions">
      <Icon
        tag="a"
        :href="githubUrl"
        target="_blank"
        class="demo-action"
        title="View on GitHub"
      >
        <GithubIcon />
      </Icon>
      <Icon class="demo-action" title="View source" @click="toggleExpand">
        <ChevronsIcon />
      </Icon>
    </div>
    <transition
      name="demo-source-expand"
      @enter="expandEnter"
      @after-enter="expandAfterEnter"
      @before-leave="expandBeforeLeave"
    >
      <div v-show="expanded" class="demo-source">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<style>
@import 'demo';
</style>
