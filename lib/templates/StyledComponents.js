module.exports = (name, flags, {styledComponents}) =>
`import styled from 'styled-components';
${styledComponents ? 
    styledComponents.map((component) => 
`
export let ${component} = styled.div\`
    
\`;
`
    ).join('')
    
    :
`##`}
export let Container = styled.div\`
    
\`;

`;