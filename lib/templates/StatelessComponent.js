module.exports = (name, flags, {props}) =>
`##
import React from 'react';
${flags.stylus ? `import './${name}.styl';` : `##` }
${flags.styled ? `import {Container} from './${name}.sc.js';` : `##` }

const ${name} = ({${props ? props.all.join(', ') : ''}}) => {
    return(
            ${flags.styled
        ? `<Container> </Container>`
        : `<div className="${name}">  </div>`
    }
        );
};

export default ${name};
`;