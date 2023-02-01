import React from "react";

export const DefaultContext = React.createContext();

/**
 * This is based on the pattern described here: https://angeloteixeira.eu/blog/reactive-controller-pattern
 * With it, components can abstract logic common to different view layouts (such as desktop/mobile) and both can read from the given Context
 *
 * @param controller - A function (can be a React Hook) that handles some logic.
 * The values it returns are returned by this hook drectly.
 * The controller can return a `controllerOptions` object to customize the hook behavior.
 * - `initialValue`: value that will be injected in the Context
 * @param controllerParams - This value is directly passed to the controller function as argument
 * (if you need multiple args, use an object or array)
 * @param Context - The React Context type to use, so that components can reference it if required to read values.
 *
 * @returns {object} { ContextProvider, contextProviderProps, ...controllerOutput}
 * * `ContextProvider` - The Provider of the given Context. You should wrap your subtree with this Provider
 * in order for child components to be able to access its value
 * * `contextProviderProps` - You need to use this and pass it to the Provider (i.e., <ContextProvider {...contextProviderProps} />)
 * * `...controllerOutput`, everything the controller returns (except for the `controllerOptions` field)
 */
export default (controller = () => ({}), controllerParams, Context) => {

    const { controllerOptions, ...controllerOutput } = controller(controllerParams);

    const ContextProvider = Context ? Context.Provider : DefaultContext.Provider;
    const contextProviderProps = Context ? { value: controllerOptions?.initialValue || {} } : { value: {} };
    return {
        ...controllerOutput,
        ContextProvider,
        contextProviderProps,
    };
};
