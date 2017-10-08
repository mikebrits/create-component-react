module.exports = (name, flags) =>
`##
import React from 'react';
${flags.stylus ? `import './${name}.styl';` : `##` }
${flags.styled ? `import {Container} from './${name}.sc.js';` : `##` }

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