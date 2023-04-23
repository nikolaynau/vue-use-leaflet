import { useEventListener } from '@vueuse/core';
import type { Arrayable, MaybeRefOrGetter } from '@vueuse/shared';
import type { Evented, LeafletEvent } from 'leaflet';

export function useLeafletEvent(
  target: MaybeRefOrGetter<Evented | null | undefined> | undefined,
  event: Arrayable<string>,
  listener: Arrayable<(ev: LeafletEvent) => any>
) {
  return useEventListener(target as any, event, listener, undefined);
}

export type UseLeafletEventReturn = ReturnType<typeof useLeafletEvent>;
