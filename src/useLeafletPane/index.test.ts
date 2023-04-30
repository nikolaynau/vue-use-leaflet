import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { nextTick, ref, defineComponent } from 'vue-demi';
import { Map } from 'leaflet';
import { mount } from '../../.test';
import { LeafletPaneProvider, useLeafletPane } from '.';

describe('useLeafletPane', () => {
  let source: LeafletPaneProvider;
  let element: {
    style: Record<string, unknown>;
    remove(): void;
  };
  let rawPanes: Record<string, HTMLElement>;

  beforeEach(() => {
    rawPanes = {};
    element = {
      style: {},
      remove: vi.fn()
    };
    source = {
      createPane: vi
        .fn()
        .mockImplementation(
          name => (rawPanes[name] = element as unknown as HTMLElement)
        ),
      getPane: vi.fn().mockImplementation(name => rawPanes[name]),
      getPanes: vi.fn().mockImplementation(() => rawPanes)
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return empty panes when init with empty values', () => {
    expect(useLeafletPane(undefined, undefined).paneElements.value).toEqual({});
    expect(useLeafletPane(undefined, null).paneElements.value).toEqual({});
    expect(useLeafletPane(undefined, []).paneElements.value).toEqual({});
  });

  it('should init', async () => {
    const { paneElements } = useLeafletPane(source, 'a');
    expect(paneElements.value).toEqual({ a: element });
  });

  it('should lazy init while source and pane not set', async () => {
    const sourceRef = ref<LeafletPaneProvider | null>(null);
    const paneRef = ref<string | null>(null);
    const { paneElements } = useLeafletPane(sourceRef, paneRef);
    expect(paneElements.value).toEqual({});

    paneRef.value = 'a';
    await nextTick();

    expect(paneElements.value).toEqual({});

    sourceRef.value = source;
    await nextTick();

    expect(paneElements.value).toEqual({ a: element });

    expect(source.createPane).toBeCalledTimes(1);
    expect(source.createPane).toBeCalledWith('a');

    expect(source.getPane).toBeCalledTimes(1);
    expect(source.getPane).toBeCalledWith('a');

    expect(source.getPanes).toBeCalledTimes(1);
  });

  it('should work with pane as array', () => {
    const { paneElements } = useLeafletPane(source, ['a', 'b']);
    expect(paneElements.value).toEqual({ a: element, b: element });
  });

  it('should work with pane as array ref', () => {
    const { paneElements } = useLeafletPane(source, ref(['a', 'b']));
    expect(paneElements.value).toEqual({ a: element, b: element });
  });

  it('should returns current panes', async () => {
    const panes = ref<string[]>([]);
    const { currentPanes } = useLeafletPane(source, panes, { zIndex: 1 });
    expect(currentPanes.value).toEqual([]);

    panes.value.push('a');
    await nextTick();

    expect(currentPanes.value).toHaveLength(1);
    expect(currentPanes.value[0]).toEqual(element);

    panes.value.push('b');
    await nextTick();

    expect(currentPanes.value).toHaveLength(2);
    expect(currentPanes.value[0]).toEqual(element);
    expect(currentPanes.value[1]).toEqual(element);
  });

  it('should work when pane changed', async () => {
    const pane = ref<string | string[] | null | undefined>(undefined);

    const { paneElements } = useLeafletPane(source, pane);
    expect(paneElements.value).toEqual({});

    pane.value = null;
    await nextTick();

    expect(paneElements.value).toEqual({});

    pane.value = 'a';
    await nextTick();

    expect(source.createPane).toBeCalledTimes(1);
    expect(source.createPane).toBeCalledWith('a');

    expect(source.getPane).toBeCalledTimes(2);
    expect(source.getPane).toBeCalledWith('a');

    expect(source.getPanes).toBeCalledTimes(2);
    expect(paneElements.value).toEqual({ a: element });

    pane.value = 'b';
    await nextTick();

    expect(source.createPane).toBeCalledTimes(2);
    expect(source.createPane).toBeCalledWith('b');

    expect(element.remove).toBeCalledTimes(1);
    expect(paneElements.value).toEqual({ b: element });

    pane.value = ['c'];
    await nextTick();

    expect(source.createPane).toBeCalledTimes(3);
    expect(source.createPane).toBeCalledWith('c');

    expect(element.remove).toBeCalledTimes(2);
    expect(paneElements.value).toEqual({ c: element });

    pane.value.push('d');
    pane.value.push('d');
    await nextTick();

    expect(source.createPane).toBeCalledTimes(4);
    expect(source.createPane).toBeCalledWith('d');

    expect(element.remove).toBeCalledTimes(2);
    expect(paneElements.value).toEqual({ c: element, d: element });

    pane.value.splice(0, 1);
    await nextTick();

    expect(source.createPane).toBeCalledTimes(4);
    expect(element.remove).toBeCalledTimes(3);
    expect(paneElements.value).toEqual({ d: element });

    pane.value.splice(0, 2);
    await nextTick();

    expect(source.createPane).toBeCalledTimes(4);
    expect(element.remove).toBeCalledTimes(4);
    expect(paneElements.value).toEqual({});
  });

  it('should work with map', async () => {
    const map = new Map(document.createElement('div'));
    const pane = ref<string>('a');
    const { paneElements } = useLeafletPane(map, pane);

    expect(paneElements.value.a).toBeInstanceOf(HTMLElement);
    expect(paneElements.value.a.className).toBe('leaflet-pane leaflet-a-pane');
    expect(map.getPane('a')).toBeInstanceOf(HTMLElement);
    expect(map.getPane('a')?.className).toBe('leaflet-pane leaflet-a-pane');
    expect(map.getPane('a')).toBe(paneElements.value.a);
  });

  it('should work with zIndex', () => {
    const { paneElements } = useLeafletPane(source, 'a', { zIndex: 1 });
    expect(paneElements.value).toEqual({ a: element });
    expect(element.style.zIndex).toBe('1');
  });

  it('should work when change zIndex', async () => {
    const zIndex = ref<number | null>(null);
    const { paneElements } = useLeafletPane(source, 'a', { zIndex });
    expect(paneElements.value).toEqual({ a: element });
    expect(element.style.zIndex).toBeUndefined();

    zIndex.value = 1;
    await nextTick();

    expect(element.style.zIndex).toBe('1');

    zIndex.value = 2;
    await nextTick();

    expect(element.style.zIndex).toBe('2');

    zIndex.value = null;
    await nextTick();

    expect(element.style.zIndex).toBe('');
  });

  it('should work with flush sync', () => {
    const paneRef = ref<string | null>(null);
    const { paneElements } = useLeafletPane(source, paneRef, {
      flushSync: true
    });
    expect(paneElements.value).toEqual({});

    paneRef.value = 'a';

    expect(paneElements.value).toEqual({ a: element });
  });

  it('should work dispose', () => {
    expect.assertions(3);
    const map = new Map(document.createElement('div'));

    const vm = mount(
      defineComponent({
        setup() {
          useLeafletPane(map, 'a', {
            dispose: true
          });
          expect(map.getPane('a')).toBeInstanceOf(HTMLElement);
          expect(map.getPane('a')?.className).toBe(
            'leaflet-pane leaflet-a-pane'
          );
        },
        render() {
          return null;
        }
      })
    );

    vm.unmount();
    expect(map.getPane('a')).toBeUndefined();
  });
});
