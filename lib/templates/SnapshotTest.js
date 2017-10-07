module.exports = (name, flags) =>
`import React from 'react';
import ${name} from './${name}';
import renderer from 'react-test-renderer';
    
it('${name} renders correctly', () => {
    const tree = renderer.create(
        <${name} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
`;