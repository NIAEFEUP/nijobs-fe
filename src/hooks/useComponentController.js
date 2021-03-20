export default (controller, controllerParams, Context) => {

    const { controllerOptions, ...controllerOutput } = controller(controllerParams);


    return {
        ...controllerOutput,
        ContextProvider: Context.Provider,
        contextProviderProps: { value: controllerOptions?.initialValue || {} },
    };
};
