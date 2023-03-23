import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  type Mock
} from 'vitest';
import { nextTick, Ref, ref, markRaw } from 'vue-demi';
import { Control } from 'leaflet';
import { type LeafletDisplayControl, useLeafletDisplayControl } from '.';

describe('useLeafletDisplayControl', () => {
  let source: LeafletDisplayControl;
  let target: Control;
  let targetArray: Control[];
  let sourceRef: Ref<LeafletDisplayControl | null | undefined>;
  let targetRef: Ref<Control | null | undefined>;
  let targetArrRef: Ref<Control[] | null | undefined>;

  beforeEach(() => {
    source = {
      addControl: vi.fn(),
      removeControl: vi.fn()
    };
    target = new Control();
    targetArray = [new Control(), new Control()];
    sourceRef = ref(source);
    targetRef = ref(markRaw(target));
    targetArrRef = ref(targetArray.map(markRaw));
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
    (source.addControl as unknown as Mock).mockImplementation(
      target => (target._map = {})
    );
    const { shown } = useLeafletDisplayControl(sourceRef, targetRef, {
      controls: true
    });
    expectAddControlCalled();
    expect(shown()).toBeTruthy();
    expect(source.removeControl).not.toBeCalled();
  });

  it('should work with target as array', async () => {
    (source.addControl as unknown as Mock).mockImplementation(
      target => (target._map = {})
    );

    const toggle = useLeafletDisplayControl(sourceRef, targetArrRef);

    expect(source.addControl).toBeCalledTimes(2);
    expect((source.addControl as Mock).mock.calls[0][0]).toBe(targetArray[0]);
    expect((source.addControl as Mock).mock.calls[1][0]).toBe(targetArray[1]);

    toggle();
    await nextTick();

    expect(source.addControl).toBeCalledTimes(2);
    expect(source.removeControl).toBeCalledTimes(2);
    expect((source.removeControl as Mock).mock.calls[0][0]).toBe(
      targetArray[0]
    );
    expect((source.removeControl as Mock).mock.calls[1][0]).toBe(
      targetArray[1]
    );
  });
});
