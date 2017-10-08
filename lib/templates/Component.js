module.exports = (name,flags,props) =>
`import React, {Component} from 'react';
import PropTypes from 'prop-types';
${flags.stylus ? `import './${name}.styl';` : `##` }
${flags.styled ? `import {Container} from './${name}.sc.js';` : `##` }
${flags.mobx ?
`import {observable} from 'mobx';
import {observer} from 'mobx-react';`
    :
    '##'
}
${flags.lodash ? `import _ from 'lodash';` : '##'}
${flags.moment ? `import moment from 'moment';` : '##'}

${flags.mobx ? `@observer` : '##'}
class ${name} extends Component {
   
    render(){
        ${props 
        ? `const {${props.all.join(', ')}} = this.props;`
        : `##`
        }
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