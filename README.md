# Create Component React
A simple cli tool for creating React components. There are several similar tools out there, but none did what I wanted. So I made my own one.

## Installation
```sh
$ npm install create-component-react -g
```

## Default Usage
Comes with some flags out of the box. More to be added as and when. Navigate to the path where you want to create your component and run:

```sh
$ create-component MyComponent
```
This creates a MyComponent folder:
```
| MyComponent
| - index.js
| - MyComponent.js
| - MyComponent.test.js
```
`index.js`:
```js
import MyComponent from './MyComponent';
export default MyComponent;
```
`MyComponent.js`:
```js
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {

    render(){
        return(
            <div className="MyComponent"></div>
        );
    }
}

MyComponent.propTypes = {
};

MyComponent.defaultProps = {
};

export default MyComponent;
```
`MyComponent.test.js` :
```js
import React from 'react';
import MyComponent from './MyComponent';
import renderer from 'react-test-renderer';

it('MyComponent renders correctly', () => {
    const tree = renderer.create(
        <MyComponent />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
```

## Options
| Option | Outcome |
| ------ | ------ |
| -\-mobx | Imports relevant mobx and mobx-react packages and makes the component an `@observer` **Note: This is currently only implemented with Decorators**|
| -\-stylus | Adds a `MyComponent.styl` file and imports it into the component|
| -\-styled | Adds a `MyComponent.sc.js` file that exports a `Container` `styled.div`. This will replace your standard `div` in `MyComponent` and replace it with `<Container></Container>` |
| -\-lodash | Imports lodash into the component |
| -\-moment | Imports moment into the component |
| -\-stateless | Returns a stateless function component instead of a full react class |
| -\-statelessSimple | Returns a simplified stateless function component instead of a full react  class. This immediately returns the component and has no extended export statements |
|-\-props| Accepts a comma separated list of props. Required props are denoted with a caret ^. Full example below.|

## Injecting Props
If you know which props are going to be needed in your component beforehand, then this is an easy way to inject them throught your component. Use the caret (^) to denote required props. This is useful for populating `propTypes` and giving easy access to `this.props` in the render method of a default component etc.
### Usage
```ssh
$ create-component-react MyComponent --props=a,b^,c,d
```
### Output
`MyComponent.js`:
```js
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {

    render(){
        const {a, b, c, d} = this.props;
        return(
            <div className="MyComponent"></div>
        );
    }
}

MyComponent.propTypes = {
    b: PropTypes.string.isRequired,
    a: PropTypes.string,
	c: PropTypes.string,
	d: PropTypes.string
};

MyComponent.defaultProps = {
    a: '',
	c: '',
	d: ''
};

export default MyComponent;
```
For simplicity sakes, all `propTypes` are strings by default. If you are using a `stateless` or `simpleStateless` component, props are destructured:

```js
const MyComponent = ({a, b, c, d}) => {...}
```
`MyComponent.test.js`:
```js
import React from 'react';
import MyComponent from './MyComponent';
import renderer from 'react-test-renderer';

it('MyComponent renders correctly', () => {
    const tree = renderer.create(
        <MyComponent b="" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('MyComponent renders correctly with all props added', () => {
    const tree = renderer.create(
        <MyComponent a="" b="" c="" d="" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
```
All required props are put into the primary test, and all props are added to a second test.
## Warnings
* This assumes that you have installed all dependencies for mobx, lodash etc.
* Testing is based on Jest Snapshots.
* This was created for personal use. Use at your own risk.
