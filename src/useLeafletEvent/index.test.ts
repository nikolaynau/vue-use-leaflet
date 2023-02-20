import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { ref, markRaw, nextTick, type Ref } from 'vue-demi';
import { Evented } from 'leaflet';
import { useLeafletEvent } from '.';

describe('useLeafletEvent', () => {
  const EventTest = class extends Evented {};
  let eventSource: Evented;
  let target: Ref<Evented | null>;
  let listener: Mock;

  const events = ['eventA', 'eventB'];
  const data = [{ a: 1 }, { b: 2 }];

  beforeEach(() => {
    eventSource = new EventTest();
    target = ref<Evented | null>(markRaw(eventSource));
    listener = vi.fn();
  });

  it('should work', () => {
    useLeafletEvent(target, events, listener);

    eventSource.fire(events[0], data[0]);
    eventSource.fire(events[1], data[1]);

    expect(listener.mock.calls).toHaveLength(2);

    expect(listener.mock.calls[0][0]).contains(data[0]);
    expect(listener.mock.calls[0][0].type).toBe(events[0]);

    expect(listener.mock.calls[1][0]).contains(data[1]);
    expect(listener.mock.calls[1][0].type).toBe(events[1]);
  });

  it('should unsubscribe events when target set is null', async () => {
    useLeafletEvent(target, events, listener);

    target.value = null;
    await nextTick();
    eventSource.fire(events[0], data[0]);

    expect(listener.mock.calls).toHaveLength(0);
  });

  it('should unsubscribe events when call stop', () => {
    const stop = useLeafletEvent(target, events, listener);

    stop();
    eventSource.fire(events[0], data[0]);

    expect(listener.mock.calls).toHaveLength(0);
  });

  it('should resubsribe events when target changed', async () => {
    const eventSource1 = markRaw(new EventTest());
    const eventSource2 = markRaw(new EventTest());

    const target = ref<Evented>(eventSource1);
    const events = ['es1:event', 'es2:event'];

    useLeafletEvent(target, events, listener);

    eventSource1.fire(events[0]);
    target.value = eventSource2;
    await nextTick();

    eventSource1.fire(events[0]);
    eventSource2.fire(events[1]);

    expect(listener.mock.calls).toHaveLength(2);
    expect(listener.mock.calls[0][0].type).toBe(events[0]);
    expect(listener.mock.calls[1][0].type).toBe(events[1]);
  });
});
