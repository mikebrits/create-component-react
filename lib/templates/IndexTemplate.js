module.exports = (name, flags) =>
`import ${name} from './${name}';
export default ${name};
`;