import {
  type Mock,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi
} from 'vitest';
import { defineComponent, nextTick, Ref, ref, unref } from 'vue-demi';
import { mount } from '../../.test';
import { useLeafletToggleObject, UseLeafletToggleObjectOptions } from '.';

describe('useLeafletToggleObject', () => {
  let source: string;
  let target: string;
  let sourceRef: Ref<string | null>;
  let targetRef: Ref<string | null>;
  let callbackSpy: Mock;
  let options: UseLeafletToggleObjectOptions<false, string, string>;

  beforeEach(() => {
    source = 'a';
    target = 'b';
    sourceRef = ref(source);
    targetRef = ref(target);
    callbackSpy = vi.fn();
    options = {
      onToggle: callbackSpy
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function expectCallbackCalled(value = false, count = 1) {
    expect(callbackSpy).toBeCalledTimes(count);
    expect(callbackSpy).toBeCalledWith(source, target, value);
  }

  function expectCallbackCalledWithTrue(count = 1) {
    expectCallbackCalled(true, count);
  }

  function expectCallbackCalledWithFalse(count = 1) {
    expectCallbackCalled(false, count);
  }

  function expectCallbackNotCalled() {
    expect(callbackSpy).not.toBeCalled();
  }

  it('should work with ref', () => {
    useLeafletToggleObject(sourceRef, targetRef, options);
    expectCallbackCalledWithTrue();
  });

  it('should work with raw', () => {
    useLeafletToggleObject(source, target, options);
    expectCallbackCalledWithTrue();
  });

  it('should work when lazy init source and target', async () => {
    sourceRef.value = null;
    targetRef.value = null;

    useLeafletToggleObject(sourceRef, targetRef, options);
    expectCallbackNotCalled();

    sourceRef.value = source;
    await nextTick();
    expectCallbackNotCalled();

    targetRef.value = target;
    await nextTick();
    expectCallbackCalledWithTrue();
  });

  it('should work toggle fn', async () => {
    const toggle = useLeafletToggleObject(sourceRef, targetRef, options);

    toggle();
    await nextTick();

    toggle();
    await nextTick();

    expect(callbackSpy).toBeCalledTimes(3);
    expect(callbackSpy.mock.calls[0]).toEqual([source, target, true]);
    expect(callbackSpy.mock.calls[1]).toEqual([source, target, false]);
    expect(callbackSpy.mock.calls[2]).toEqual([source, target, true]);
  });

  it('should work with flush sync', () => {
    const toggle = useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      flushSync: true
    });

    toggle();
    toggle();

    expect(callbackSpy).toBeCalledTimes(3);
    expect(callbackSpy.mock.calls[0]).toEqual([source, target, true]);
    expect(callbackSpy.mock.calls[1]).toEqual([source, target, false]);
    expect(callbackSpy.mock.calls[2]).toEqual([source, target, true]);
  });

  it('should work with initial value', async () => {
    const toggle = useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      initialValue: false
    });
    expectCallbackNotCalled();

    toggle();
    await nextTick();

    expectCallbackCalledWithTrue();
  });

  it('should work with initial value as ref', async () => {
    const initialValue = ref(false);
    const toggle = useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      initialValue
    });
    expectCallbackNotCalled();
    expect(initialValue.value).toBe(false);

    toggle();
    await nextTick();

    expectCallbackCalledWithTrue();
    expect(initialValue.value).toBe(true);
  });

  it('should work when change initial value', async () => {
    const initialValue = ref(false);
    useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      initialValue
    });

    expectCallbackNotCalled();
    expect(initialValue.value).toBe(false);

    initialValue.value = true;
    await nextTick();

    expectCallbackCalledWithTrue();
    expect(initialValue.value).toBe(true);
  });

  it('should work toggle with controls', async () => {
    const { toggle } = useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      controls: true
    });
    expectCallbackCalledWithTrue();

    toggle();
    await nextTick();

    expectCallbackCalledWithFalse(2);
  });

  it('should work value with controls', async () => {
    const { value } = useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      controls: true
    });
    expectCallbackCalledWithTrue();
    expect(unref(value)).toBeTruthy();

    value.value = false;
    await nextTick();

    expectCallbackCalledWithFalse(2);
    expect(unref(value)).toBeFalsy();
  });

  it('should work dispose', () => {
    expect.assertions(4);

    const vm = mount(
      defineComponent({
        setup() {
          useLeafletToggleObject(sourceRef, targetRef, {
            ...options,
            dispose: true
          });
          expectCallbackCalledWithTrue();
        },
        render() {
          return null;
        }
      })
    );

    vm.unmount();
    expectCallbackCalledWithFalse(2);
  });
});
