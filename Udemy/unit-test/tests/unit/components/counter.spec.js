import {shallowMount, mount} from "@vue/test-utils";

import Counter from "@/components/Counter";
import app from "@/App";

describe('counter', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  xtest('Debe de hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  });

  test('Titulo por defecto "Counter"', () => {
    expect(wrapper.find('h2').exists()).toBeTruthy();
    const h2 = wrapper.find('h2');
    expect(h2.text()).toBe('Counter');
  });
  test('Subitulo por defecto "Pruebas de Counter"', () => {
    expect(wrapper.find('[data-testid="subtitle"]').exists()).toBeTruthy();
    const p = wrapper.find('[data-testid="subtitle"]');
    expect(p.text()).toBe('Pruebas de Counter!!');
  });
  test('Boton +1', async () => {
    await wrapper.find('[data-testid="+1"]').trigger('click');
    expect(wrapper.find('[data-testid="count"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-testid="count"]').text()).toBe('8');
  });
  test('Boton -1', async () => {
    await wrapper.find('[data-testid="-1"]').trigger('click');
    expect(wrapper.find('[data-testid="count"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-testid="count"]').text()).toBe('6');
  });
  test('Establecer valor por defecto', async () => {
    const {start} = wrapper.props();
    const value = wrapper.find('[data-testid="count"]').text();
    expect(Number(value)).toBe(start);
  });

  test('Establecer mostrar la prop title', async () => {
    const title = 'Hola mundo';
    const wrapper = shallowMount(Counter, {
      props: {
        title
      }
    });
    const value = wrapper.find('h2').text();
    expect(value).toBe(title);
  });
});

