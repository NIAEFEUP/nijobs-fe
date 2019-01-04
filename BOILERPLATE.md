# Boilerplate

This is an explanation of the various parts of the application as demonstrated in the boilerplate

# Table of Contents

* [General Structure](#general-structure)
* [Pages / Routing](#pages--routing)
* [Redux Store](#redux-store)

# General Structure

The Application is divided into _components_, which can be stateful or not, and there are some patterns you should look up.

More: https://reactfaq.site/components/component-types/

Component Patterns Video: https://www.youtube.com/watch?v=YaZg8wg39QQ

The components should all be placed under the `/src/components` directory, with some exceptions like the root component (`App.js`), the Router (`AppRouter.js`) or the pages components which will be in `src/pages`

# Pages / Routing

To match a URL to a specific page (i.e. you want to add a contacts page), you must go to the `AppRouter.js` and add a `<Route>` in the `<Switch>` component. Some example Routes are already there to show most of the use cases. For more help, check out the docs for React Router package.

React Router Docs : https://reacttraining.com/react-router/web/guides/quick-start

# Redux Store

The Redux store is the way app information is stored and served to all components that need it (and subscribe to it)

The hardest part is already done, so if you need to access any part of the state, you must connect that component to the store by using the `connect()` function like done in `RandomDogOutuput.js`:

```js

const mapStateToProps = state => ({
    dog: state.dog
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(RandomDogOutput);

```

There are two parts needed when connecting a component to the redux store, `mapStateToProps` and `mapActionsToProps`.

Reading of the Redux and React-Redux Docs is **highly encouraged** as the concepts are not quite clear at first sight.

However, simply put, `mapStateToProps` adds the field from redux state to the component's props, so it can be accessed through `this.props.<field_name>`

To change the redux state, one needs to define *actions*, which are special functions that do something and then `dispatch` an action type with an optional payload (optional extra data). The actions are defined in `/src/actions`. There's also a special file `types.js`, which specifies the action types in an enum-like format:

```js
{
    ACTION_TYPE: 'ACTION_TYPE'
}

```

The Reducers will change the state based on the action type. The reducers are defined in `/src/reducers`.
Multiple states can be part of redux state, each with its own reducer. This mapping must be done in `/src/reducers/index.js`

Both actions and reducers have already some examples in the boilerplate.

The `SLEEPY` action example simulates some fetch or other async action (which in the example takes 2 seconds), and then calling the reducer which affects the redux state.

The `GET_RANDOM_DOG` example represents a more realistic action which actually fetches an API which returns a random picture of a dog.

The standard structure of a redux action is:

```js

export const exampleAction = () => dispatch => {
    const first = dispatch({
        type: exampleTypes.SLEEPY,
        payload: exampleActionFetch(),
    });

    first.then(() => {
        dispatch(addSnackbar({
            message: "Hello!",
            options: {
                variant: 'info',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            }
        }))
    })
}

```

> From `/src/actions/sleepyActions.js`

When `dispatch()` is called, the action is taken to the reducers to affect the state, however, as this is an 'async' action, the payload is not ready at the first moment, so a framework is used to handle Promise payloads. (See: https://github.com/pburtchaell/redux-promise-middleware).

In this special example, we want to execute an action, and **after** that action is done, we want to execute a second one (`addSnackbar` in this example), so we can treat the first dispatch as a Promise, which will resolve when the action is finished, and then we dispatch another action. This is all possible due to the redux-promise-middleware package, together with redux-thunk (https://github.com/reduxjs/redux-thunk)

Due to the actions being actual Promises, the framework converts the action to 3 different actions (`ACTION_PENDING` - Promise not resolved yet, `ACTION_FULFILLED` - Promise resolved, `ACTION_REJECTED` - Promise rejected)

To allow for a cleaner definition of the reducers, we use `type-to-reducer` (https://github.com/tomatau/type-to-reducer)

A standard definition of a reducer is:

```js

export default typeToReducer({
    [dogTypes.GET_RANDOM_DOG]: {
        PENDING: (state) => ({
            ...state,
            loading: true
        }),
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload,
        }),
        FULFILLED: (state, action) => ({
            ...state,
            loading: false,
            image_url: action.payload,
        })
    },

    
    [dogTypes.RESET_RANDOM_DOG]: (state, action) => ({
        ...initialState,
    }),

}, initialState);

```
> From `/src/reducers/dogReducer.js`

There's a known "bug" where links would break if the component was connected to the redux store (i.e. the page would not change when clicking the link, because the `shouldComponentUpdate()`  method is overrided when using `connect()` to get redux state updates that trigger re-renders. To overcome this, one must encapsulate the `connect()` with `withRouter()` like done in `/src/components/HomePage/TopButtonBar.js`)


```js
export default withRouter(connect(mapStateToProps, mapActionsToProps)(TopButtonBar));
```

> From `/src/components/HomePage/TopButtonBar.js`