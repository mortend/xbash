const fs = require('fs');
const path = require('path');
const which = require('which');
const {spawn} = require('child_process');

function findGitForWindowsExe(name, dir) {
    let exe = null;
    let git = which.sync('git', {nothrow: true});

    if (git) {
        exe = path.join(path.dirname(path.dirname(git)), dir, 'bin', name);
        if (fs.existsSync(exe))
            return exe;
    }

    exe = path.join(process.env.PROGRAMFILES, 'Git', dir, 'bin', name);
    if (fs.existsSync(exe))
        return exe;

    exe = which.sync(name, {nothrow: true});
    if (exe)
        return exe;

    console.error('ERROR: \'' + name + '\' was not found. This can be solved by installing Git.')
    console.error("\nPlease get Git from https://git-scm.com/downloads and try again.");
    process.exit(1);
}

let bash = 'bash';
let curl = 'curl';
let unzip = 'unzip';

if (path.sep == '\\') {
    bash = findGitForWindowsExe('bash.exe', 'usr');
    process.env.PATH = path.dirname(bash)
        .concat(path.delimiter, process.env.PATH);

    // Make sure we have curl in PATH inside bash.
    curl = findGitForWindowsExe('curl.exe', 'mingw');
    process.env.PATH = path.dirname(curl)
        .concat(path.delimiter, process.env.PATH);

    // Make sure we have unzip in PATH inside bash.
    unzip = findGitForWindowsExe('unzip.exe', 'usr');
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
