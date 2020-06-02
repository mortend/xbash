const fs = require('fs');
const path = require('path');
const which = require('which');
const {spawn} = require('child_process');

function error(name) {
    console.error('ERROR: \'' + name + '\' was not found. This can be solved by installing Git.')
    console.error("\nPlease get Git from https://git-scm.com/downloads and try again.\n");
    process.exit(1);
}

function findGitForWindowsExe(name) {
    // Places to look for exe-files inside a Git installation.
    const gitBinDirs = [
        path.join('mingw', 'bin'),
        path.join('mingw64', 'bin'),
        path.join('usr', 'bin')
    ];

    const gitExes = which.sync('git', {
        all: true,
        nothrow: true
    }) || [];

    // Default installation locations.
    gitExes.push(path.join(process.env.PROGRAMFILES, 'Git', 'cmd', 'git.exe'));
    gitExes.push(path.join(process.env.PROGRAMW6432, 'Git', 'cmd', 'git.exe'));

    for (git of gitExes) {
        for (dir of gitBinDirs) {
            const exe = path.join(path.dirname(path.dirname(git)), dir, name);
            if (fs.existsSync(exe))
                return exe;
        }
    }

    // Look for exe-file in PATH or report error.
    // (We avoid script-recursion becuase we are specifically looking for exe-files.)
    return which.sync(name, {
        nothrow: true
    }) || error(name);
}

function addExeToPATH(exe) {
    const name = path.basename(exe, '.exe');

    // Early-out if exe already is in PATH.
    const exeInPATH = which.sync(name, {nothrow: true});
    if (exeInPATH && exe.toLowerCase() == exeInPATH.toLowerCase())
        return;

    // Prepend directory to PATH.
    process.env.PATH = path.dirname(exe)
        .concat(path.delimiter, process.env.PATH);
}

function getBash() {
    if (path.sep != '\\')
        return '/bin/bash';

    const bash = findGitForWindowsExe('bash.exe');

    // Make sure we also have 'curl' and 'unzip' available inside 'bash'.
    // The reason for this is that this package was extracted from another
    // package who depends on all these commands.
    // @seealso https://github.com/mortend/android-build-tools
    addExeToPATH(findGitForWindowsExe('curl.exe'));
    addExeToPATH(findGitForWindowsExe('unzip.exe'));
    addExeToPATH(bash);
    return bash;
}

module.exports = (args, callback) => 
    spawn(getBash(), args, {
        stdio: 'inherit'
    }).on('exit', callback);
