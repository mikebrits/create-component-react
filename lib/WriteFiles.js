const fs = require('fs');

const writeFiles = function (name, flags) {

    if (!fs.existsSync(name)) {
        fs.mkdirSync(name);
    }

    //index.js
    writeStream(`./${name}/index.js`,require('./templates/IndexTemplate')(name,flags));

    //Component
    if(flags.stateless){
        //This has a return statement
        writeStream(`./${name}/${name}.js`,require('./templates/StatelessComponent')(name,flags));
    }
    else if(flags.simpleStateless){
        //This is a really simple export
        writeStream(`./${name}/${name}.js`,require('./templates/SimpleStatelessComponent')(name,flags));
    }
    else {
        //Export a full react component
        writeStream(`./${name}/${name}.js`,require('./templates/Component')(name,flags));
    }

    //Test
    writeStream(`./${name}/${name}.test.js`,require('./templates/SnapshotTest')(name,flags));

    //Styled Component
    if(flags.styled){
        writeStream(`./${name}/StyledComponents.js`,require('./templates/StyledComponents')(name,flags));
    }

    //Stylus File
    if(flags.stylus) {
        writeStream(`./${name}/${name}.styl`,require('./templates/Stylus')(name,flags));
    }

};

function writeStream(path, content){
    fs.writeFileSync(path, clearLines(content));
}

function clearLines(content = ''){
    return content.split('\n').filter((line) => line !== '##').join('\n');
}


module.exports = writeFiles;