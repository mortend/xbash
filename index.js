const fs = require('fs');
const path = require('path');
const which = require('which');
const {spawn} = require('child_process');

function findGitForWindowsExe(name) {
    // Places to look for .exe files inside a Git installation.
    const gitBinDirs = [
        path.join('mingw', 'bin'),
        path.join('mingw64', 'bin'),
        path.join('usr', 'bin')
    ];

    const git = which.sync('git', {nothrow: true});
    let exe = null;

    if (git) {
        for (let i = 0; i < gitBinDirs.length; i++) {
            const dir = gitBinDirs[i];
            exe = path.join(path.dirname(path.dirname(git)), dir, name);
            if (fs.existsSync(exe))
                return exe;
        }
    }

    for (let i = 0; i < gitBinDirs.length; i++) {
        const dir = gitBinDirs[i];
        exe = path.join(process.env.PROGRAMFILES, 'Git', dir, name);
        if (fs.existsSync(exe))
            return exe;
    }

    exe = which.sync(name, {nothrow: true});
    if (exe)
        return exe;

    console.error('ERROR: \'' + name + '\' was not found. This can be solved by installing Git.')
    console.error("\nPlease get Git from https://git-scm.com/downloads and try again.");
    process.exit(1);
}

function addExeToPATH(exe) {
    const name = path.basename(exe, '.exe');

    // Early-out if exe already is in PATH.
    const exeInPATH = which.sync(name, {nothrow: true});
    if (exe.toLowerCase() == exeInPATH.toLowerCase())
        return;

    // Prepend directory to PATH.
    process.env.PATH = path.dirname(exe)
        .concat(path.delimiter, process.env.PATH);
}

let bash = 'bash';

if (path.sep == '\\') {
    bash = findGitForWindowsExe('bash.exe');

    // Make sure we also have 'curl' and 'unzip' available inside 'bash'.
    // The reason for this is that this package was extracted from another
    // package who depends on all these commands.
    // @seealso https://github.com/mortend/android-build-tools
    addExeToPATH(findGitForWindowsExe('curl.exe'));
    addExeToPATH(findGitForWindowsExe('unzip.exe'));
    addExeToPATH(bash);
}

module.exports = (args, callback) => 
    spawn(bash, args, {
        stdio: 'inherit'
    }).on('exit', callback);
