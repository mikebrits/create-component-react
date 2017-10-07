module.exports = (name,flags) =>
`import React, {Component} from 'react';
import PropTypes from 'prop-types';
${flags.stylus ? `import './${name}.styl';` : `##` }
${flags.styled ? `import {Container} from './StyledComponents';` : `##` }
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
        return(
            ${flags.styled
    ? `<Container> </Container>`
    : `<div className="${name}"></div>`
    }
        );
    }
}

${name}.propTypes = {};

${name}.defaultProps = {};

export default ${name};
`