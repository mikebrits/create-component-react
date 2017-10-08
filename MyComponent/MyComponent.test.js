import React from 'react';
import MyComponent from './MyComponent';
import renderer from 'react-test-renderer';
    
it('MyComponent renders correctly', () => {
    const tree = renderer.create(
        <MyComponent b="" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('MyComponent renders correctly with all props added', () => {
    const tree = renderer.create(
        <MyComponent a="" b="" c="" d="" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

