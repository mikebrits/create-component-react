const fs = require('fs');

const writeFiles = function (name, flags) {

    if (!fs.existsSync(name)) {
        fs.mkdirSync(name);
    }

    const props = flags.props ? transformProps(flags.props) : undefined;

    //console.log('props', props);

    //index.js
    writeStream(`./${name}/index.js`, require('./templates/IndexTemplate')(name, flags, props));

    //Component
    if (flags.stateless) {
        //This has a return statement
        writeStream(`./${name}/${name}.js`, require('./templates/StatelessComponent')(name, flags, props));
    }
    else if (flags.simpleStateless) {
        //This is a really simple export
        writeStream(`./${name}/${name}.js`, require('./templates/SimpleStatelessComponent')(name, flags, props));
    }
    else {
        //Export a full react component
        writeStream(`./${name}/${name}.js`, require('./templates/Component')(name, flags, props));
    }

    //Test
    writeStream(`./${name}/${name}.test.js`, require('./templates/SnapshotTest')(name, flags, props));

    //Styled Component
    if (flags.styled) {
        writeStream(`./${name}/${name}.sc.js`, require('./templates/StyledComponents')(name, flags, props));
    }

    //Stylus File
    if (flags.stylus) {
        writeStream(`./${name}/${name}.styl`, require('./templates/Stylus')(name, flags, props));
    }

};

function writeStream(path, content) {
    fs.writeFileSync(path, clearLines(content));
}

function clearLines(content = '') {
    return content.split('\n').filter((line) => line.trim() !== '##').join('\n');
}

function transformProps(propsString) {
    const props = propsString.split(',');
    let propsObject = {
        all : props.map((prop) => prop[prop.length - 1] === '^' ? prop.slice(0,-1) : prop),
        required: props.filter((prop) => prop[prop.length - 1] === '^'),
        optional: props.filter((prop) => prop[prop.length - 1] !== '^'),
    };
    propsObject.required = propsObject.required.length
        ? propsObject.required.map((prop) => prop.slice(0, -1))
        : undefined;
    propsObject.optional = propsObject.optional.length
        ? propsObject.optional
        : undefined;
    return propsObject;
}


module.exports = writeFiles;