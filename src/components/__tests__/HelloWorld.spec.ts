import {shallowMount} from "@vue/test-utils";
import TileNumbers from "@/components/2048/TileNumbers.vue";

describe('HelloWorld.vue', () => {
    test('отрисовывает props.msg, если они переданы', () => {
        const msg = 'new message'
        const wrapper = shallowMount(TileNumbers, {
            propsData: { msg }
        })
        expect(wrapper.text()).toMatch(msg)
    })
})