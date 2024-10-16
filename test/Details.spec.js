import { shallowMount } from '@vue/test-utils'
import Details from '../src/components/Details.vue'

describe('Details.vue', () => {
    it('renders the props.details object', () => {
        const details = {
            created_at: "2020-01-05 13:42:22.089095",
            updated_at: "2020-01-05 13:42:22.089095",
            value: "Celebrities die in threes because for Chuck Norris, killing one celebrity is never enough."
        }

        const wrapper = shallowMount(Details, {
            props: { details },
        })

        expect(wrapper.text()).toContain(details.created_at)
        expect(wrapper.text()).toContain(details.updated_at)
        expect(wrapper.text()).toContain(details.value)
    })
})