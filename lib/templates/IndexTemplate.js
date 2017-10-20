module.exports = (name, flags, {props}) =>
`import ${name} from './${name}';
export default ${name};
`;