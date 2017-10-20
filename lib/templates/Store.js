module.exports = (name, flags, {storeProps}) =>

`import React, {Component} from 'react';
import {observable, action} from 'mobx';

class Store {

    inject = (props) => {
        this.props = props;
    };
    
    ${storeProps.observables 
    ? storeProps.observables.map((observable) => 
    `@observable ${observable};
    `
     ).join('')
     : `##`
    }
    ${storeProps.actions
    ? storeProps.actions.map((action) =>
    `@action ${action} = () => {
        
    };
      
    `
    ).join('')
    : `##`}
}

export let ${name}Store = new Store();

export default (Wrapped) => (

    class extends Component {
        
        render() {
            ${name}Store.inject(this.props);
            return <Wrapped {...this.props} store={${name}Store}/>;
        }
        
    }
);`;