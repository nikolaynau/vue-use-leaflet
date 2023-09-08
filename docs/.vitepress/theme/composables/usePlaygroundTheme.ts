import { watch, type Ref } from 'vue';
import { useDark } from './useDark';
import { usePlaygroundFrame } from './usePlaygroundFrame';

export function usePlaygroundTheme(
  frameElement: Ref<HTMLIFrameElement | null>
) {
  const isDark = useDark();
  const { ready, send } = usePlaygroundFrame(frameElement);

  watch(ready, () => {
    sendTheme();
  });

  watch(isDark, () => {
    sendTheme();
  });

  function sendTheme() {
    const styles = getComputedStyle(document.documentElement);
    send({
      cBg: styles.getPropertyValue('--vp-c-bg'),
      cText: styles.getPropertyValue('--vp-c-text-1')
    });
  }
}
