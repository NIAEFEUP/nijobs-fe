import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";

const ThemeWrapper = ({ children, theme }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);


export const renderWithStore = (
    ui,
    {
        store,
        ...renderOptions
    } = {}
) => {
    const wrapper = ({ children }) =>
        <Provider store={store}>
            {children}
        </Provider>;
    return rtlRender(ui, { wrapper, ...renderOptions });
};

export const renderWithStoreAndTheme = (
    ui,
    {
        store,
        theme,
        ...renderOptions
    }
) => {
    const wrapper = ({ children }) =>
        <ThemeWrapper theme={theme}>
            <Provider store={store}>
                {children}
            </Provider>
        </ThemeWrapper>;
    return rtlRender(ui, { wrapper, ...renderOptions });
};

export const renderWithTheme = (ui, options) =>
    render(ui, { wrapper: ThemeWrapper, ...options });


// re-export everything
export * from "@testing-library/react";
