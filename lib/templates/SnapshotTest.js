module.exports = (name, flags, {props}) =>
`import React from 'react';
import ${name} from './${name}';
import renderer from 'react-test-renderer';
${flags.styled ? `import 'jest-styled-components';` : `##`}

describe('${name}', () => {
    it('Renders correctly', () => {
        const tree = renderer.create(
            <${name} ${props && props.required ? props.required.join(`="" `) + `="" ` : ''}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    ${props && props.optional ?
        `
    it('Renders correctly with all props added', () => {
        const tree = renderer.create(
            <${name} ${props.all.join(`="" `) + `="" `}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });`:`##`}
});`;