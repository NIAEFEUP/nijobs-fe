import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import "@testing-library/jest-dom";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();
fetchMock.dontMock();

// Mock localStorage
Object.defineProperty(window, "localStorage", {
    value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
    },
    writable: true,
});

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.mount = mount;
// global.rtlRender = rtlRender;

// Popper.js workaround
global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document,
    },
});

// Prevents SWR cache from leaking from test to test
beforeEach(async () => {
    // cache.clear();
    await new Promise(requestAnimationFrame);
});
