import { type Ref, ref, onUnmounted } from 'vue';

export interface UsePlaygroundFrameReturn {
  ready: Ref<boolean>;
  send<T = any>(data: T): void;
}

const ALLOW_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:8080',
  'https://github.com',
  'https://nikolaynau.github.io',
  'https://vuemap.org'
];

export function usePlaygroundFrame(
  frameElement: Ref<HTMLIFrameElement | null>
): UsePlaygroundFrameReturn {
  const ready = ref(false);

  function send<T = any>(message: T) {
    frameElement.value?.contentWindow?.postMessage(message, '*');
  }

  function onReceiveMessage(e: MessageEvent) {
    if (ALLOW_ORIGINS.includes(e.origin)) {
      if (e.data === 'playground:ready') {
        ready.value = true;
      }
    }
  }

  window.addEventListener('message', onReceiveMessage, false);

  onUnmounted(() => {
    window.removeEventListener('message', onReceiveMessage, false);
  });

  return { ready, send };
}
