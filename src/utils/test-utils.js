import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/core/styles";

const ThemeWrapper = ({ children }) => (
    <ThemeProvider theme="light">
        {children}
    </ThemeProvider>
);

export const renderWithTheme = (ui, options) =>
    render(ui, { wrapper: ThemeWrapper, ...options });

// re-export everything
export * from "@testing-library/react";
