# Boilerplate

This is an explanation of the various parts of the application as demonstrated in the boilerplate

# Table of Contents

* [General Structure](#general-structure)
* [Pages / Routing](#pages--routing)
* [Redux Store](#redux-store)
* [CSS Modules](#css-modules)
* [Material UI](#material-ui)
* [Snackbars](#snackbars)

## General Structure

The Application is divided into _components_, which can be stateful or not, and there are some patterns you should look up.

More: https://reactfaq.site/components/component-types/

Component Patterns Video: https://www.youtube.com/watch?v=YaZg8wg39QQ

The components should all be placed under the `/src/components` directory, with some exceptions like the root component (`App.js`), the Router (`AppRouter.js`) or the pages components which will be in `src/pages`.

## Pages / Routing

To match a URL to a specific page (i.e. you want to add a contacts page), you must go to the `AppRouter.js` and add a `<Route>` in the `<Switch>` component. Some example Routes are already there to show most of the use cases. For more help, check out the docs for React Router package.

React Router Docs : https://reacttraining.com/react-router/web/guides/quick-start

## Redux Store

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

In this special example, we want to execute an action, and **after** that action is done, we want to execute a second one (`addSnackbar` in this example), so we can treat the first dispatch as a Promise, which will resolve when the action is finished, and then we dispatch another action. This is all possible due to the redux-promise-middleware package, together with redux-thunk (https://github.com/reduxjs/redux-thunk).

Due to the actions being actual Promises, the framework converts the action to 3 different actions (`ACTION_PENDING` - Promise not resolved yet, `ACTION_FULFILLED` - Promise resolved, `ACTION_REJECTED` - Promise rejected).

To allow for a cleaner definition of the reducers, we use `type-to-reducer` (https://github.com/tomatau/type-to-reducer).

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

One important thing to retain, is that the state changing functions must be pure, meaning that they don't actually mutate the state, but rather create a new object, hence the use of the spread operator `...state`, to clone the previous version of the state.

This is one of the three main principles of Redux (https://redux.js.org/introduction/three-principles).

As you can see, each action type has an associated arrow function that receives the current state, and an action, working like a switch case of action types. Each action will have a single effect on the state, defined in its reducer.

It's also important to remember that, while the example has PENDING, REJECTED AND FULFILLED variations, it is due to the fact that this comes from an async action. For simpler actions, one can simply define the reducer like it is done with the `RESET_RANDOM_DOG` which simply resets the state, not doing any `fetch`: 

There's a known "bug" where links would break if the component was connected to the redux store (i.e. the page would not change when clicking the link, because the `shouldComponentUpdate()`  method is overrided when using `connect()` to get redux state updates that trigger re-renders. To overcome this, one must encapsulate the `connect()` with `withRouter()` like done in `/src/components/HomePage/TopButtonBar.js`).


```js
export default withRouter(connect(mapStateToProps, mapActionsToProps)(TopButtonBar));
```

> From `/src/components/HomePage/TopButtonBar.js`

## CSS Modules

### Why?

In order to better encapsulate and organize the application CSS, CSS Modules are being used ([this link goes into some detail as to why they are useful](https://css-tricks.com/css-modules-part-1-need/)).

This allows us to define style modules, that can be imported into each component, and that are tightly coupled to the respective import statement.

A common problem in CSS is one of its main features: the "global" scope. If a `.big` class is used, the selector that changes its properties will change it for every ocurrence of that class. When developing big applications, this can result in legacy CSS code not being removed due to "it might break something", for example.

CSS Modules solves this by ensuring that a CSS Module file (.module.css) is treated in its own local scope, by prepending a randomly generated string to the used classes. As such, if two "fonts.module.css" and "spacings.module.css" files define selectors for the `.big` class, they can still be treated separately, despite selecting the same class. To use either one a user could just import the files in their code and use the exported object to retrieve the processed class names, that have the randomly generated string prepended to them.

### How? (Usage examples)

To define CSS in a CSS Module file, vanilla CSS code can be written as usual. However, these files must be saved with a `.module.css` extension instead of a `.css` extension.

In order to use the created CSS Modules, one must first import the CSS Module and then use the object that the file exports to access the processed `className`s:

```js
import styles from "./HomePage.module.css";
```

> From `/src/components/HomePage/TopButtonBar.js`

The `styles` object now holds the class names of the selectors specified in HomePage.module.css. Note that this variable can be aliased to any other name (by changing the name after the `import` keyword), such as to clarify the purpose of a style import/usage or to have several imports of different CSS Modules.

In order to use the imported styles, the `className` property of React Components should be used:

```jsx
render() {
        return (
            <Grid container item xs={12} spacing={24}>
                <Grid item xs={4} className={styles.button}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.sleepyClick}
                    >
                        Sleepy Action
                    </Button>
                </Grid>
                {/* ... */}
            </Grid>
        );
    }
```

> From `/src/components/HomePage/TopButtonBar.js`

In this example, the innermost `Grid` component is having the `HomePage.module.css`'s `.button` selector applied to it, thus changing its `text-align` property:

```css
.button {
    text-align: center;
}
```

> From `/src/components/HomePage/HomePage.module.css`

### Where? (Organization and structuring)

CSS Modules that are used directly in components and will only have that utilization (very specific ones) should be placed in the same directory as the respective component and have the name of the component that uses the module or of the folder in which the components that use it are placed.

CSS Modules that will be of general use to the application should be placed inside the `css` folder, inside `src` (thus `/src/css/`). None exist yet at the time of writing this.

## Material UI

The Visual components used in this project come from `material-ui` framework, which provides many web elements and utilities to allow an easier and more responsive development of an UI/UX with Material Design styles.

The list of available components can be found in the docs:
https://material-ui.com/getting-started/usage/

An example of material UI usage in the boilerplate code can be found in `/src/components/HomePage/BottomButtonBar.js` where `<Grid>` and `<Button>` are used.

To import a material UI component, simply do:

```js

import { <AComponentYouWant>, <AnotherComponentYouWant> } from '@material-ui/core';

```

Then you can use those components in `render()`.

## Snackbars

Snackbars was the last feature added to the boilerplate. Snackbars are essentially a message that is shown to the user in a notification-like way. As the material design guide states that only one snackbar should be shown to the user at any given moment, the material ui implementation doesn't control the position of snackbars when two or more are added at the same time, resulting in hidden snackbars.

To work around this, `notistack` is used, which allows having `n` snackbars, by regulating its poisition (i.e. when a snackbar is added to the corner and there's already a snackbar there, the newly added will stack on top/bottom (depending on the corner) of the existing ones).

To add a snackbar, a function `addSnackbar()` is already provided at `/src/actions/notificationActions.js`.

The added snackbars will show on any rendered page, as the `<Notifier>` - component responsible for the snackbar rendering - is rendered at the root of the App, along with the `<AppRouter>`.

One example of snackbars addition is after `SLEEPY_ACTION` is done, where a notification is shown to alert that the action has finished.

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

The `addSnackbar()` function can be called as the argument of a `dispatch()` function, or given to the `addSnackbar()` as the second level of arguments like so:

```js

addSnackbar({
    message: "Hello!",
    options: {
        variant: 'info',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
    }
})(dispatch)

```
