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
| -\-mobx | Imports relevant mobx and mobx-react packages and makes the component an `@observer` **Note: This is only implemented with Decorators and will not work in react-create-app out of the box**|
| -\-stylus | Adds a `MyComponent.styl` file and imports it into the component|
| -\-stateless | Returns a stateless function component instead of a full react class. **Note: Cannot be used with --store** |
| -\-styled | Accepts a comma separated list of components. Will generate a `MyComponent.sc.js` file. Full example below  |
|-\-store| Accepts a comma separated list of store properties. Will generate a `MyComponent.store.js` file. Full example below |
|-\-props| Accepts a comma separated list of props. Required props are denoted with a caret ^. Full example below|

## Injecting a Store
### Usage
Stores are used to supply functionality to you components, separating logic and presentation, and making tests easier on both logic and components. Adding the `--store` flag will add a `MyComponent.store.js` file (that contains a Higher Order Component). Arguments that are passed with an `@` will be `@actions`, without will be `@observables`.
```ssh
$ create-component-react MyComponent --store=name,number,@updateName,@updateNumber
```
Will generate `MyComponent.store.js`:
```js
import React, {Component} from 'react';
import {observable, action} from 'mobx';

export default (Wrapped) => (
    class MyComponentStore extends Component {

        @observable name;
        @observable number;

        @action updateName = () => {

        };

        @action updateNumber = () => {

        };

        render() {
            return <Wrapped {...this.props} store={this}/>;
        }

    }
);
```
`MyComponent.js`:
```js
...
import Store from './MyComponent.store'

@Store
class MyComponent extends Component {

    render(){
        const {name, number, updateName, updateNumber} = this.props.store;
        return(
            <div className="MyComponent"></div>
        );
    }
}
...
```
This component injects a `store` prop into your component. This may seem like overkill, but we often use HOCs that will inject some kind of store information to Components. Doing it this way allows us to still use those and keep logic separate. For example:
```ssh
$ create-component-react MyComponent --store=name,@updateName
```
Will yield `MyComponent.store.js` which, for the sake of this example, has been worked on a bit:
```js
import React, {Component} from 'react';
import {observable, action} from 'mobx';
import RealTime from '../my/own/functionality/RealTime';

export default (Wrapped) => (
    RealTime ({...someOptions})(
        class MyComponentStore extends Component {
            @observable name = '';

            @action updateName = (newName) => {
                name = newName;
            }

            onRealTimeChange = () => {
                //RealTime injects props into this component
                this.props.RealTime.changeParams({...someParams});
            }
            render() {
                return <Wrapped {...this.props} store={this}/>;
            }
        }
    )
)
```

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
* This relies heavily on MobX. See notes.
* This assumes that you have installed all dependencies for mobx, lodash etc.
* Testing is based on Jest Snapshots.
* This was created for personal use. Use at your own risk.

## Note
MobX is really flexible and thus is not for everyone. The way we have implemented stores here should only be used on your container elements, but you could use them once at your core element and pass things down through a `Provider`. Seemed like overkill to us, so instead we have placed the a store on each main view, and treated each one as its 'own app'. The other end of the scale would be to give each component a store. This would work, and presentation and logic are still kept apart, but you might find yourself in a far more complicated environment, wondering why your component isn't refreshing when it should be. Debugging would be hard and testing all the more tedious. But it would work.
