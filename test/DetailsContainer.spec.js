// Component.spec.js
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import http from "../middleware/HttpController.js";
import Details from "../src/components/Details.vue";
import * as jest from "node/test.js";
import DetailsContainer from "../src/components/DetailsContainer.vue";


jest.mock('./Details.vue', () => ({
    name: 'Details',
    template: '<div></div>',
}));


jest.mock("../../middleware/HttpController.js", () => ({
    get: jest.fn(),
}));

describe('MyComponent', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(DetailsContainer, {
            props: {
                categoryName: 'Test Category',
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should initialize with empty details', () => {
        expect(wrapper.vm.details).toEqual({ result: [] });
    });

    it('should watch for categoryName prop and fetch details', async () => {
        const mockResponse = { data: { result: [{ id: 1, name: 'Detail 1' }] }, status: 200 };
        http.get.mockResolvedValueOnce(mockResponse);

        // Wait for the initial fetch
        await nextTick();

        expect(http.get).toHaveBeenCalledWith('/search?query=Test Category');
        expect(wrapper.vm.details).toEqual(mockResponse.data);
    });

    it('should render Details component for each detail fetched', async () => {
        const mockResponse = { data: { result: [{ id: 1, name: 'Detail 1' }, { id: 2, name: 'Detail 2' }] }, status: 200 };
        http.get.mockResolvedValueOnce(mockResponse);

        await wrapper.setProps({ categoryName: 'Test Category' });
        await nextTick();

        const detailComponents = wrapper.findAllComponents(Details);
        expect(detailComponents).toHaveLength(2); // There should be two Details components rendered
    });
});
