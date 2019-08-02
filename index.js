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
    let bash = null;
    let git = which.sync('git', {nothrow: true});

    if (git) {
        bash = path.join(path.dirname(path.dirname(git)), 'usr', 'bin', 'bash.exe');
        if (fs.existsSync(bash))
            return bash;
    }
    
    bash = path.join(process.env.PROGRAMFILES, 'Git', 'usr', 'bin', 'bash.exe');
    if (fs.existsSync(bash))
        return bash;

    bash = which.sync('bash', {nothrow: true});
    if (bash)
        return bash;

    error('bash');
}

function findCurlForWindows() {
    let curl = null;
    let git = which.sync('git', {nothrow: true});

    if (git) {
        curl = path.join(path.dirname(path.dirname(git)), 'mingw', 'bin', 'curl.exe');
        if (fs.existsSync(curl))
            return curl;
    }

    curl = path.join(process.env.PROGRAMFILES, 'Git', 'mingw', 'bin', 'curl.exe');
    if (fs.existsSync(curl))
        return curl;

    curl = which.sync('curl', {nothrow: true});
    if (curl)
        return curl;

    error('curl');
}

function findUnzipForWindows() {
    let unzip = null;
    let git = which.sync('git', {nothrow: true});

    if (git) {
        unzip = path.join(path.dirname(path.dirname(git)), 'usr', 'bin', 'unzip.exe');
        if (fs.existsSync(bash))
            return bash;
    }
    
    unzip = path.join(process.env.PROGRAMFILES, 'Git', 'usr', 'bin', 'unzip.exe');
    if (fs.existsSync(bash))
        return bash;

    unzip = which.sync('unzip', {nothrow: true});
    if (unzip)
        return unzip;

    error('unzip');
}

let bash = 'bash';
let curl = 'curl';
let unzip = 'unzip';

if (path.sep == '\\') {
    bash = findBashForWindows();
    process.env.PATH = path.dirname(bash)
        .concat(path.delimiter, process.env.PATH);

    // Make sure we have curl in PATH inside bash.
    curl = findCurlForWindows();
    process.env.PATH = path.dirname(curl)
        .concat(path.delimiter, process.env.PATH);

    // Make sure we have unzip in PATH inside bash.
    unzip = findUnzipForWindows();
    process.env.PATH = path.dirname(unzip)
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

module.exports.unzip = (args, callback) => 
    spawn(unzip, args, {
        stdio: 'inherit'
    }).on('exit', callback);
