module.exports = (name, flags) =>
`##
import React from 'react';
${flags.stylus ? `import './${name}.styl';` : `##` }
${flags.styled ? `import {Container} from './StyledComponents';` : `##` }

const ${name} = () => {
    return(
            ${flags.styled
        ? `<Container> </Container>`
        : `<div className="${name}">  </div>`
    }
        );
};

export default ${name};
`