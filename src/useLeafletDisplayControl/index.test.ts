import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { nextTick, Ref, ref, markRaw } from 'vue-demi';
import { Control } from 'leaflet';
import { type LeafletDisplayControl, useLeafletDisplayControl } from '.';

describe('useLeafletDisplayControl', () => {
  let source: LeafletDisplayControl;
  let target: Control;
  let sourceRef: Ref<LeafletDisplayControl | null | undefined>;
  let targetRef: Ref<Control | null | undefined>;

  beforeEach(() => {
    source = {
      addControl: vi.fn(),
      removeControl: vi.fn()
    };
    target = new Control();
    sourceRef = ref(source);
    targetRef = ref(markRaw(target));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function expectAddControlCalled(count = 1) {
    expect(source.addControl).toBeCalledTimes(count);
    expect(source.addControl).toBeCalledWith(target);
  }

  function expectRemoveControlCalled(count = 1) {
    expect(source.removeControl).toBeCalledTimes(count);
    expect(source.removeControl).toBeCalledWith(target);
  }

  it('should work with raw', () => {
    useLeafletDisplayControl(source, target);
    expectAddControlCalled();
  });

  it('should work with ref', () => {
    useLeafletDisplayControl(sourceRef, targetRef);
    expectAddControlCalled();
  });

  it('should work toggle', async () => {
    const toggle = useLeafletDisplayControl(sourceRef, targetRef);
    expectAddControlCalled();

    (target as any)._map = {};
    toggle();
    await nextTick();

    expectRemoveControlCalled(1);
    expectAddControlCalled(1);
  });

  it('should work has with controls', async () => {
    const { has } = useLeafletDisplayControl(sourceRef, targetRef, {
      controls: true
    });
    expectAddControlCalled();

    expect(has()).toBeFalsy();
    (target as any)._map = {};
    expect(has()).toBeTruthy();

    expectAddControlCalled(1);
    expect(source.removeControl).not.toBeCalled();
  });
});
