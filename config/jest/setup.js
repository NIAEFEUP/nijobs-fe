import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import "@testing-library/jest-dom";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();
fetchMock.dontMock();

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.mount = mount;
// global.rtlRender = rtlRender;
