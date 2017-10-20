module.exports = (name,flags, {props, styledComponents, storeProps}) =>
`import React, {Component} from 'react';
import PropTypes from 'prop-types';
${flags.stylus ? `import './${name}.styl';` : `##` }
${flags.styled ? `import {Container${styledComponents ? ', ' + styledComponents.join(', ') : ''}} from './${name}.sc.js';` : `##` }
${flags.mobx ? `import {observer} from 'mobx-react';` : '##'}
${flags.store ? `import Store from './${name}.store'` : `##`}
${flags.lodash ? `import _ from 'lodash';` : '##'}
${flags.moment ? `import moment from 'moment';` : '##'}

${flags.store ? `@Store` : `##`}
${flags.mobx ? `@observer` : '##'}
class ${name} extends Component {
   
    render(){
        ${props ? `const {${props.all.join(', ')}} = this.props;` : `##`}
        ${storeProps ? `const {${storeProps.all.join(', ')}} = this.props.store;` : `##`}
        return(
            ${flags.styled
    ? `<Container> </Container>`
    : `<div className="${name}"></div>`
    }
        );
    }
}

${name}.propTypes = {
    ${props && props.required
    ? (props.required.join(': PropTypes.string.isRequired,\n\t') + ': PropTypes.string.isRequired,')
    : `##`
    }
    ${props && props.optional
    ? (props.optional.join(': PropTypes.string, \n\t') + ': PropTypes.string')
    : `##`
    }
};

${name}.defaultProps = {
    ${props && props.optional
    ? props.optional.join(`: '',\n\t`) + `: ''`
    : `##`
    }
};

export default ${name};
`