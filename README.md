# Create Component React
A simple cli tool for creating React components. There are several similar tools out there, but none did what I wanted. So I made my own one.

## Installation
```sh
$ npm install create-component-react -g
```

## Default Usage
Comes with some flags out of the box. More to be added as and when. Navigate to the path where you want to create your component and run:

```sh
$ npm create-component-react MyComponent
```
This creates an folder called `MyComponent` which contains: `index.js`, `MyComponent.js` and `MyComponent_test.js` by default. Its render method will return a `div` with  `className="MyComponent"`.

## Options
These act only as flags and do not receive any following arguments.
| Option | Outcome |
| ------ | ------ |
| -\-mobx | Imports relevant mobx and mobx-react packages and makes the component an `@observer` **Note: This is currently only implemented with Decorators**|
| -\-stylus | Adds a `MyComponent.styl` file and imports it into the component|
| -\-styled | Adds a `StyledComponents.js` file that exports a `Container` `styled.div`. This will replace your standard `div` that is returnd and replace it with `<Container></Container>` |
| -\-lodash | Imports lodash into the component |
| -\-moment | Imports moment into the component |
| -\-stateless | Returns a stateless function component instead of a full react class |
| -\-statelessSimple | Returns a simplified stateless function component instead of a full react  class. This immediately returns the component and has no extended export statements |

## Warnings
* This assumes that you have installed all dependencies for mobx, lodash etc.
* Testing is based on Jest Snapshots.
* This was created for personal use. Use at your own risk.
