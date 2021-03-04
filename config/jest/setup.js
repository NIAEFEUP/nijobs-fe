import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import "@testing-library/jest-dom";
import { enableFetchMocks } from "jest-fetch-mock";
import { createMatchMedia } from "../../src/utils/media-queries";

enableFetchMocks();
fetchMock.doMock();

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

const DEFAULT_WINDOW_WIDTH_PX = 1920;

beforeEach(() => {
    window.matchMedia = createMatchMedia(DEFAULT_WINDOW_WIDTH_PX);
});

// beforeEach(async () => {
//     await new Promise(requestAnimationFrame);
// });
