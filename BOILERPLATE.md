# Boilerplate

## WARNING: This document is probably outdated as this information is being migrated to the project's wiki. Please consult that instead.

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



```js
export default withRouter(connect(mapStateToProps, mapActionsToProps)(TopButtonBar));
```

> From `/src/components/HomePage/TopButtonBar.js`

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
