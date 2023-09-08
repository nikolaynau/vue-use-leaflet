import { type Ref, ref, onUnmounted } from 'vue';

export function useDark(): Ref<boolean> {
  const isDark = ref(false);
  const observer = new MutationObserver(onMutationCallback);
  observer.observe(document.documentElement, { attributes: true });

  function onMutationCallback(mutations: MutationRecord[]) {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        checkDarkMode();
      }
    }
  }

  function checkDarkMode() {
    isDark.value = document.documentElement.classList.contains('dark');
  }

  onUnmounted(() => {
    observer.disconnect();
  });

  checkDarkMode();
  return isDark;
}
