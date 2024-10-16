import { shallowMount } from '@vue/test-utils'
import DetailsContainer from '../src/components/DetailsContainer.vue'
import http from '../middleware/HttpController.js'
import Details from '../src/components/Details.vue'

jest.mock('../middleware/HttpController.js')

describe('DetailsContainer.vue', () => {
    it('renders an empty list initially', () => {
        const wrapper = shallowMount(DetailsContainer)
        expect(wrapper.findAllComponents(Details.vue).length).toBe(0)
    })

    it('fetches details and renders them when categoryName prop changes', async () => {
        const categoryName = 'test-category'
        const mockData = [{ id: 1, name: 'Detail 1' }]

        http.get.mockResolvedValueOnce({ status: 200, data: mockData })

        const wrapper = shallowMount(DetailsContainer, {
            props: { categoryName },
        })

        await wrapper.vm.$nextTick()

        expect(wrapper.findAllComponents(Details.vue).length).toBe(1)
        expect(wrapper.findAllComponents(Details.vue).at(0).props('details')).toEqual(mockData[0])
    })

    it('handles errors during data fetch and logs them', async () => {
        const categoryName = 'error-category'
        const errorMessage = 'Network error'

        http.get.mockRejectedValueOnce(new Error(errorMessage))

        const wrapper = shallowMount(DetailsContainer, {
            props: { categoryName },
        })

        await wrapper.vm.$nextTick()
        expect(console.error).toHaveBeenCalledWith(`Failed to fetch details: ${errorMessage}`)
        expect(wrapper.findAllComponents(Details.vue).length).toBe(0)
    })
})