import { describe, it, expect, vi } from 'vitest';
import { nextTick, ref, defineComponent } from 'vue-demi';
import { mount } from '../../.test';
import { useLeafletRemoveObject } from '.';

describe('useLeafletRemoveObject', () => {
  it('should work when source is set to empty', async () => {
    const source = ref<string | null>('foo');
    const remove = vi.fn();
    useLeafletRemoveObject(source, { remove });

    source.value = 'bar';
    await nextTick();

    source.value = null;
    await nextTick();

    expect(remove).toBeCalledTimes(1);
    expect(remove).toBeCalledWith('bar');
  });

  it('should work with flush sync', () => {
    const source = ref<string | null>('foo');
    const remove = vi.fn();
    useLeafletRemoveObject(source, { remove, flushSync: true });

    source.value = null;

    expect(remove).toBeCalledTimes(1);
    expect(remove).toBeCalledWith('foo');
  });

  it('should work when manual remove', async () => {
    const source = ref<string | null>('foo');
    const removeSpy = vi.fn();
    const remove = useLeafletRemoveObject(source, {
      remove: removeSpy,
      cleanRef: true
    });

    remove();
    remove();
    await nextTick();

    expect(removeSpy).toBeCalledTimes(1);
    expect(removeSpy).toBeCalledWith('foo');
  });

  it('should multi call remove fn', async () => {
    const source = ref<string | null>('foo');
    const removeSpy = vi.fn();
    const remove = useLeafletRemoveObject(source, {
      remove: removeSpy
    });

    remove();
    remove();
    await nextTick();

    expect(removeSpy).toBeCalledTimes(2);
    expect(removeSpy).toBeCalledWith('foo');
  });

  it('should work with is removed', async () => {
    const source = ref<string | null>('foo');
    let removeState = false;
    const remove = vi.fn(() => {
      removeState = true;
    });
    const isRemoved = vi.fn(() => removeState);

    const _remove = useLeafletRemoveObject(source, {
      remove,
      isRemoved
    });

    _remove();
    _remove();
    await nextTick();

    expect(remove).toBeCalledTimes(1);
    expect(remove).toBeCalledWith('foo');
    expect(isRemoved).toBeCalledTimes(2);
  });

  it('should work with watch source', async () => {
    const watchSource = ref(false);
    const source = ref<string | null>('foo');
    const remove = vi.fn();
    useLeafletRemoveObject(source, {
      remove,
      cleanRef: true,
      watch: watchSource
    });

    watchSource.value = true;
    await nextTick();

    expect(remove).toBeCalledTimes(1);
    expect(remove).toBeCalledWith('foo');
    expect(source.value).toBeNull();
  });

  it('should work dispose', () => {
    const source = 'foo';
    const remove = vi.fn();

    const vm = mount(
      defineComponent({
        setup() {
          useLeafletRemoveObject(source, {
            remove,
            dispose: true
          });
        },
        render() {
          return null;
        }
      })
    );

    vm.unmount();
    expect(remove).toBeCalledTimes(1);
    expect(remove).toBeCalledWith('foo');
  });

  it('should work with clear ref', () => {
    const source = ref<string | null>('foo');
    const remove = vi.fn();

    const vm = mount(
      defineComponent({
        setup() {
          useLeafletRemoveObject(source, {
            remove,
            cleanRef: true,
            dispose: true
          });
        },
        render() {
          return null;
        }
      })
    );

    vm.unmount();
    expect(remove).toBeCalledTimes(1);
    expect(remove).toBeCalledWith('foo');
    expect(source.value).toBeNull();
  });

  it('should work with clean val', () => {
    const source = ref<string>('foo');
    const remove = vi.fn();

    const vm = mount(
      defineComponent({
        setup() {
          useLeafletRemoveObject(source, {
            remove,
            cleanRef: true,
            cleanVal: '',
            dispose: true
          });
        },
        render() {
          return null;
        }
      })
    );

    vm.unmount();
    expect(remove).toBeCalledTimes(1);
    expect(remove).toBeCalledWith('foo');
    expect(source.value).toBe('');
  });
});
