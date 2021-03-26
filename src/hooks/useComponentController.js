import React from "react";

const DefaultContext = React.createContext();

export default (controller = () => ({}), controllerParams, Context) => {

    const { controllerOptions, ...controllerOutput } = controller(controllerParams);

    const ContextProvider = Context ? Context.Provider : DefaultContext.Provider;
    const contextProviderProps = Context ? { value: controllerOptions?.initialValue || {} } : {};
    return {
        ...controllerOutput,
        ContextProvider,
        contextProviderProps,
    };
};
