const fs = require('fs');

const writeFiles = function (name, flags) {

    if (!fs.existsSync(name)) {
        fs.mkdirSync(name);
    }

    console.log(flags);

    if(flags.stateless && flags.store){
        console.log( 'Stateless components should not have stores. You may use one flag or the other, but not both.');
        return;
    }

    const options = {
        props : flags.props ? transformProps(flags.props === true ? '' : flags.props) : undefined,
        styledComponents: flags.styled ? transformStyledComponents(flags.styled === true ? '' : flags.styled) : undefined,
        storeProps : flags.store ? transformStoreProps(flags.store === true ? '' : flags.store) : undefined,
    };

    console.log(options);

    //index.js
    writeStream(`./${name}/index.js`, require('./templates/IndexTemplate')(name, flags, options));

    //Component
    if (flags.stateless) {
        //This has a return statement
        writeStream(`./${name}/${name}.js`, require('./templates/StatelessComponent')(name, flags, options));
    }
    else if (flags.simpleStateless) {
        //This is a really simple export
        writeStream(`./${name}/${name}.js`, require('./templates/SimpleStatelessComponent')(name, flags, options));
    }
    else {
        //Export a full react component
        writeStream(`./${name}/${name}.js`, require('./templates/Component')(name, flags, options));
    }

    //Test
    writeStream(`./${name}/${name}.test.js`, require('./templates/SnapshotTest')(name, flags, options));

    //Styled Component
    if (flags.styled) {
        writeStream(`./${name}/${name}.sc.js`, require('./templates/StyledComponents')(name, flags, options));
    }

    //Stylus File
    if (flags.stylus) {
        writeStream(`./${name}/${name}.styl`, require('./templates/Stylus')(name, flags, options));
    }

    //Store
    if(flags.store) {
        writeStream(`./${name}/${name}.store.js`, require('./templates/Store')(name, flags, options));
    }

};

function writeStream(path, content) {
    fs.writeFileSync(path, clearLines(content));
}

function clearLines(content = '') {
    return content.split('\n').filter((line) => line.trim() !== '##').join('\n');
}

function transformProps(propsString = '') {
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

function transformStyledComponents(componentsString = ''){
    if(componentsString)
        return componentsString.split(',');
}

function transformStoreProps(storeString = '') {
    const props = storeString.split(',');
    let propsObject = {
        all : props.map((prop) => prop[0] === '@' ? prop.substr(1) : prop),
        actions: props.filter((prop) => prop[0] === '@'),
        observables: props.filter((prop) => prop[0] !== '@'),
    };
    propsObject.actions = propsObject.actions.length
        ? propsObject.actions.map((prop) => prop.substr(1))
        : undefined;
    propsObject.observables = propsObject.observables.length
        ? propsObject.observables
        : undefined;
    return propsObject;
}


module.exports = writeFiles;