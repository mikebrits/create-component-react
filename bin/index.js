#!/usr/bin/env node
const args = process.argv.slice(2);
const argv = require('yargs').argv;


var WriteFiles = require('../lib/WriteFiles.js');

if(args[0]){
    WriteFiles(args[0], {...argv});
    console.log("Done!");
}
else {
    console.log("You did not provide a component name.");
}
