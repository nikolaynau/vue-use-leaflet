import {
  type Mock,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi
} from 'vitest';
import { nextTick, Ref, ref, markRaw } from 'vue-demi';
import { Layer } from 'leaflet';
import { type LeafletDisplayLayer, useLeafletDisplayLayer } from '.';

describe('useLeafletDisplayLayer', () => {
  let source: LeafletDisplayLayer;
  let target: Layer;
  let sourceRef: Ref<LeafletDisplayLayer | null | undefined>;
  let targetRef: Ref<Layer | null | undefined>;

  beforeEach(() => {
    source = {
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
      hasLayer: vi.fn()
    };
    target = new Layer();
    sourceRef = ref(source);
    targetRef = ref(markRaw(target));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function expectAddLayerCalled(count = 1) {
    expect(source.addLayer).toBeCalledTimes(count);
    expect(source.addLayer).toBeCalledWith(target);
  }

  function expectRemoveLayerCalled(count = 1) {
    expect(source.removeLayer).toBeCalledTimes(count);
    expect(source.removeLayer).toBeCalledWith(target);
  }

  function expectHasLayerCalled(count = 1) {
    expect(source.hasLayer).toBeCalledTimes(count);
    expect(source.hasLayer).toBeCalledWith(target);
  }

  it('should work with raw', () => {
    useLeafletDisplayLayer(source, target);
    expectAddLayerCalled();
    expectHasLayerCalled();
  });

  it('should work with ref', () => {
    useLeafletDisplayLayer(sourceRef, targetRef);
    expectAddLayerCalled();
    expectHasLayerCalled();
  });

  it('should work toggle', async () => {
    const toggle = useLeafletDisplayLayer(sourceRef, targetRef);
    expectAddLayerCalled(1);
    expectHasLayerCalled(1);

    (source.hasLayer as unknown as Mock).mockImplementation(() => true);
    toggle();
    await nextTick();

    expectRemoveLayerCalled(1);
    expectAddLayerCalled(1);
    expectHasLayerCalled(2);
  });

  it('should work has with controls', async () => {
    const { has } = useLeafletDisplayLayer(sourceRef, targetRef, {
      controls: true
    });
    expectAddLayerCalled(1);
    expectHasLayerCalled(1);

    has();

    expectAddLayerCalled(1);
    expectHasLayerCalled(2);
    expect(source.removeLayer).not.toBeCalled();
  });
});
