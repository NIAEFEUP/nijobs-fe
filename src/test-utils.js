import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

export const mountWithStore = (component, initialState, theme) => {

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(initialState);

    return mount(
        <Provider store={store}>
            {theme ?
                <ThemeProvider theme={theme}>
                    {component}
                </ThemeProvider>
                :
                { component }
            }
        </Provider>
    );
};

export const mountWithTheme = (component, theme) => mount(
    <ThemeProvider theme={theme}>
        {component}
    </ThemeProvider>
);

export const TestComponent = ({ callback }) => {
    callback();
    return null;
};

export const testHook = (callback) => {
    mount(<TestComponent callback={callback} />);
};
