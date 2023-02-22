import { markRaw, shallowRef, unref, watchEffect, type Ref } from 'vue-demi';
import { isDefined, tryOnScopeDispose } from '@vueuse/shared';
import type { Layer } from 'leaflet';

export interface UseLeafletLayerOptions<T> {
  create?: () => T | null;
  update?: (instance: T) => T | null | undefined;
  destroy?: (instance: T) => void;
}

export type UseLeafletLayerReturn<T> = Ref<T | null>;

export function useLeafletLayer<T extends Layer = Layer>(
  options: UseLeafletLayerOptions<T> = {}
): UseLeafletLayerReturn<T> {
  const { create, update, destroy } = options;

  const instance = shallowRef<T | null>(null);

  watchEffect(() => {
    if (isDefined(instance) && update) {
      const inst = update(unref(instance));
      if (isDefined(inst)) {
        if (instance.value !== inst) {
          clean();
          instance.value = markRaw(inst);
        }
      } else {
        clean();
      }
    } else if (create) {
      const inst = create();
      instance.value = isDefined(inst) ? markRaw(inst) : null;
    }
  });

  function clean() {
    if (isDefined(instance)) {
      if (destroy) {
        destroy(unref(instance));
      } else {
        instance.value.off().remove();
      }
      (instance as Ref<T | null>).value = null;
    }
  }

  tryOnScopeDispose(() => {
    clean();
  });

  return instance;
}
