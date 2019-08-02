const fs = require('fs');
const path = require('path');
const which = require('which');
const {spawn} = require('child_process');

function error(name) {
    console.error('ERROR: \'' + name + '\' was not found. This can be solved by installing Git.')
    console.error("\nPlease get Git from https://git-scm.com/downloads and try again.");
    process.exit(1);
}

function findBashForWindows() {
    let bash = which.sync('bash', {nothrow: true});

    if (bash)
        return bash;

    let git = which.sync('git', {nothrow: true});

    if (git) {
        bash = path.join(path.dirname(path.dirname(git)), 'usr', 'bin', 'bash.exe');
        if (fs.existsSync(bash))
            return bash;
    } else {
        bash = path.join(process.env.PROGRAMFILES, 'Git', 'usr', 'bin', 'bash.exe');
        if (fs.existsSync(bash))
            return bash;
    }

    error('bash');
}

function findCurlForWindows() {
    let curl = which.sync('curl', {nothrow: true});

    if (curl)
        return curl;

    let git = which.sync('git', {nothrow: true});

    if (git) {
        curl = path.join(path.dirname(path.dirname(git)), 'mingw', 'bin', 'curl.exe');
        if (fs.existsSync(curl))
            return curl;
    } else {
        curl = path.join(process.env.PROGRAMFILES, 'Git', 'mingw', 'bin', 'curl.exe');
        if (fs.existsSync(curl))
            return curl;
    }

    error('curl');
}

let bash = 'bash';
let curl = 'curl';

if (path.sep == '\\') {
    bash = findBashForWindows();
    process.env.PATH = path.dirname(bash)
        .concat(path.delimiter, process.env.PATH);

    // Make sure we have curl in PATH inside bash.
    curl = findCurlForWindows();
    process.env.PATH = path.dirname(curl)
        .concat(path.delimiter, process.env.PATH);
}

module.exports = (args, callback) => 
    spawn(bash, args, {
        stdio: 'inherit'
    }).on('exit', callback);

module.exports.curl = (args, callback) => 
    spawn(curl, args, {
        stdio: 'inherit'
    }).on('exit', callback);
