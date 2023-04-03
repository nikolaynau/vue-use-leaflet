import {
  type Mock,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi
} from 'vitest';
import { defineComponent, nextTick, Ref, ref } from 'vue-demi';
import { mount } from '../../.test';
import {
  useLeafletDisplayObject,
  type UseLeafletDisplayObjectOptions
} from '.';

describe('useLeafletDisplayObject', () => {
  let source: string;
  let target: string;
  let sourceRef: Ref<string | null>;
  let targetRef: Ref<string | null>;
  let showSpy: Mock;
  let hideSpy: Mock;
  let shownSpy: Mock;
  let options: UseLeafletDisplayObjectOptions<false, string, string>;

  beforeEach(() => {
    source = 'a';
    target = 'b';
    sourceRef = ref(source);
    targetRef = ref(target);
    showSpy = vi.fn();
    hideSpy = vi.fn();
    shownSpy = vi.fn();
    options = {
      show: showSpy,
      hide: hideSpy,
      shown: shownSpy
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function expectShowCalled(count = 1) {
    expect(showSpy).toBeCalledTimes(count);
    expect(showSpy).toBeCalledWith(source, target);
  }

  function expectHideCalled(count = 1) {
    expect(hideSpy).toBeCalledTimes(count);
    expect(hideSpy).toBeCalledWith(source, target);
  }

  function expectShownCalled(count = 1) {
    expect(shownSpy).toBeCalledTimes(count);
    expect(shownSpy).toBeCalledWith(source, target);
  }

  function expectHideNotCalled() {
    expect(hideSpy).toBeCalledTimes(0);
  }

  function expectShownNotCalled() {
    expect(shownSpy).toBeCalledTimes(0);
  }

  function expectShowNotCalled() {
    expect(showSpy).toBeCalledTimes(0);
  }

  function expectAllNotCalled() {
    expectShowNotCalled();
    expectHideNotCalled();
    expectShownNotCalled();
  }

  it('should work with ref', () => {
    useLeafletDisplayObject(sourceRef, targetRef, options);
    expectShowCalled();
    expectShownCalled();
    expectHideNotCalled();
  });

  it('should work with raw', () => {
    useLeafletDisplayObject(source, target, options);
    expectShowCalled();
    expectShownCalled();
    expectHideNotCalled();
  });

  it('should work when lazy init source and target', async () => {
    let isShown = false;
    shownSpy.mockImplementation(() => isShown);
    showSpy.mockImplementation(() => (isShown = true));
    hideSpy.mockImplementation(() => (isShown = false));

    sourceRef.value = null;
    targetRef.value = null;

    useLeafletDisplayObject(sourceRef, targetRef, options);
    expectAllNotCalled();

    sourceRef.value = source;
    await nextTick();
    expectAllNotCalled();

    targetRef.value = target;
    await nextTick();

    expectShowCalled(1);
    expectShownCalled(2);
    expectHideNotCalled();
  });

  it('should call hide when toggle target ref', async () => {
    let isShown = false;
    shownSpy.mockImplementation(() => isShown);
    showSpy.mockImplementation(() => (isShown = true));
    hideSpy.mockImplementation(() => (isShown = false));

    useLeafletDisplayObject(sourceRef, targetRef, options);
    expectShowCalled();
    expectShownCalled();
    expectHideNotCalled();

    targetRef.value = null;
    await nextTick();

    expectShowCalled(1);
    expectShownCalled(2);
    expectHideCalled(1);

    targetRef.value = target;
    await nextTick();

    expectShowCalled(2);
    expectShownCalled(4);
    expectHideCalled(1);
  });

  it.each([[true], [false]])('should work change target', async sync => {
    let isShown = false;
    shownSpy.mockImplementation(() => isShown);
    showSpy.mockImplementation(() => (isShown = true));
    hideSpy.mockImplementation(() => (isShown = false));

    const newTarget = 'c';

    useLeafletDisplayObject(sourceRef, targetRef, {
      flushSync: sync,
      ...options
    });
    expectShowCalled();
    expectShownCalled();
    expectHideNotCalled();

    targetRef.value = newTarget;
    if (!sync) {
      await nextTick();
    }

    expect(hideSpy).toBeCalledTimes(1);
    expect(hideSpy).toBeCalledWith(source, target);

    expect(showSpy).toBeCalledTimes(2);
    expect(showSpy).toBeCalledWith(source, newTarget);
  });

  it('should work toggle fn', async () => {
    const toggle = useLeafletDisplayObject(sourceRef, targetRef, options);
    expectShowCalled(1);
    expectShownCalled(1);
    expectHideNotCalled();

    toggle();
    await nextTick();
    expectShowCalled(1);
    expectHideCalled(1);
    expectShownCalled(2);

    toggle();
    await nextTick();
    expectShowCalled(2);
    expectHideCalled(1);
    expectShownCalled(3);
  });

  it('should work with controls', async () => {
    let isShown = false;
    shownSpy.mockImplementation(() => isShown);
    showSpy.mockImplementation(() => (isShown = true));
    hideSpy.mockImplementation(() => (isShown = false));

    const { shown, show, hide } = useLeafletDisplayObject(
      sourceRef,
      targetRef,
      {
        ...options,
        initialValue: false,
        controls: true
      }
    );
    expectAllNotCalled();
    expect(shown()).toBeFalsy();

    show();
    await nextTick();
    expect(shown()).toBeTruthy();

    hide();
    await nextTick();
    expect(shown()).toBeFalsy();

    expect(showSpy.mock.calls).toHaveLength(1);
    expect(hideSpy.mock.calls).toHaveLength(1);
    expect(shownSpy.mock.calls).toHaveLength(5);
    expect(shownSpy.mock.calls[0]).toEqual([source, target]);
  });

  it('should work dispose', () => {
    expect.assertions(11);

    const vm = mount(
      defineComponent({
        setup() {
          useLeafletDisplayObject(sourceRef, targetRef, {
            ...options,
            dispose: true
          });
          expectShowCalled(1);
          expectShownCalled(1);
          expectHideNotCalled();
        },
        render() {
          return null;
        }
      })
    );

    vm.unmount();
    expectShowCalled(1);
    expectHideCalled(1);
    expectShownCalled(2);
  });
});
