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
import { useLeafletToggleObject } from '.';

describe('useLeafletToggleObject', () => {
  let source: string;
  let target: string;
  let sourceRef: Ref<string | null>;
  let targetRef: Ref<string | null>;
  let addSpy: Mock;
  let removeSpy: Mock;
  let hasSpy: Mock;
  let options: Record<string, Function>;

  beforeEach(() => {
    source = 'a';
    target = 'b';
    sourceRef = ref(source);
    targetRef = ref(target);
    addSpy = vi.fn();
    removeSpy = vi.fn();
    hasSpy = vi.fn();
    options = {
      add: addSpy,
      remove: removeSpy,
      has: hasSpy
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function expectAddCalled(count = 1) {
    expect(addSpy).toBeCalledTimes(count);
    expect(addSpy).toBeCalledWith(source, target);
  }

  function expectRemoveCalled(count = 1) {
    expect(removeSpy).toBeCalledTimes(count);
    expect(removeSpy).toBeCalledWith(source, target);
  }

  function expectHasCalled(count = 1) {
    expect(hasSpy).toBeCalledTimes(count);
    expect(hasSpy).toBeCalledWith(source, target);
  }

  function expectRemoveNotCalled() {
    expect(removeSpy).toBeCalledTimes(0);
  }

  function expectHasNotCalled() {
    expect(hasSpy).toBeCalledTimes(0);
  }

  function expectAddNotCalled() {
    expect(addSpy).toBeCalledTimes(0);
  }

  function expectAllNotCalled() {
    expectAddNotCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();
  }

  it('should call add with ref', () => {
    useLeafletToggleObject(sourceRef, targetRef, options);
    expectAddCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();
  });

  it('should call add with raw', () => {
    useLeafletToggleObject(source, target, options);
    expectAddCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();
  });

  it('should work when lazy init source and target', async () => {
    sourceRef.value = null;
    targetRef.value = null;

    useLeafletToggleObject(sourceRef, targetRef, options);
    expectAllNotCalled();

    sourceRef.value = source;
    await nextTick();
    expectAllNotCalled();

    targetRef.value = target;
    await nextTick();

    expectAddCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();
  });

  it('should work toggle fn', async () => {
    const toggle = useLeafletToggleObject(sourceRef, targetRef, options);
    expectAddCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();

    toggle();
    await nextTick();
    expectAddCalled(1);
    expectRemoveCalled();
    expectHasNotCalled();

    toggle();
    await nextTick();
    expectAddCalled(2);
    expectRemoveCalled(1);
    expectHasNotCalled();
  });

  it('should work with flush sync', () => {
    const toggle = useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      flushSync: true
    });
    expectAddCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();

    toggle();
    expectAddCalled(1);
    expectRemoveCalled();
    expectHasNotCalled();

    toggle();
    expectAddCalled(2);
    expectHasNotCalled();
  });

  it('should work with initial value', async () => {
    const toggle = useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      initialValue: false
    });
    expectAllNotCalled();

    toggle();
    await nextTick();

    expectAddCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();
  });

  it('should work with initial value as ref', async () => {
    const initialValue = ref(false);
    const toggle = useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      initialValue
    });
    expectAllNotCalled();
    expect(initialValue.value).toBe(false);

    toggle();
    await nextTick();

    expectAddCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();
    expect(initialValue.value).toBe(true);
  });

  it('should work when change initial value', async () => {
    const initialValue = ref(false);
    useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      initialValue
    });

    expectAllNotCalled();
    expect(initialValue.value).toBe(false);

    initialValue.value = true;
    await nextTick();

    expectAddCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();
    expect(initialValue.value).toBe(true);
  });

  it('should work when manually call add', async () => {
    const { add } = useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      initialValue: false,
      controls: true
    });
    expectAllNotCalled();

    add();
    await nextTick();

    expectAddCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();
  });

  it('should work when manually call remove', async () => {
    const { remove } = useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      controls: true
    });
    expectAddCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();

    remove();
    await nextTick();

    expectAddCalled(1);
    expectRemoveCalled();
    expectHasNotCalled();
  });

  it('should work has', async () => {
    const { has } = useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      controls: true
    });
    expectAddCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();

    has();
    await nextTick();

    expectAddCalled(1);
    expectHasCalled();
    expectRemoveNotCalled();
  });

  it('should work toggle with controls', async () => {
    const { toggle } = useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      controls: true
    });
    expectAddCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();

    toggle();
    await nextTick();

    expectAddCalled(1);
    expectRemoveCalled();
    expectHasNotCalled();
  });

  it('should work value with controls', async () => {
    const { value } = useLeafletToggleObject(sourceRef, targetRef, {
      ...options,
      controls: true
    });
    expectAddCalled();
    expectRemoveNotCalled();
    expectHasNotCalled();
    expect(unref(value)).toBeTruthy();

    value.value = false;
    await nextTick();

    expectAddCalled(1);
    expectRemoveCalled();
    expectHasNotCalled();
    expect(unref(value)).toBeFalsy();
  });

  it('should work dispose', () => {
    expect.assertions(9);

    const vm = mount(
      defineComponent({
        setup() {
          useLeafletToggleObject(sourceRef, targetRef, {
            ...options,
            dispose: true
          });
          expectAddCalled();
          expectRemoveNotCalled();
          expectHasNotCalled();
        },
        render() {
          return null;
        }
      })
    );

    vm.unmount();
    expectAddCalled(1);
    expectRemoveCalled();
    expectHasNotCalled();
  });
});
