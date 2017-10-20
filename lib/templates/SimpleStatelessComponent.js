module.exports = (name, flags, {props}) =>
`##
import React from 'react';
${flags.stylus ? `import './${name}.styl';` : `##` }
${flags.styled ? `import {Container} from './${name}.sc.js';` : `##` }

export default ({${props ? props.all.join(', ') : ''}}) => (
    ${flags.styled
    ? `<Container> </Container>`
    : `<div className="${name}"></div>`
    }
);
`;