# xbash

[![NPM package](https://img.shields.io/npm/v/xbash.svg?style=flat-square)](https://www.npmjs.com/package/xbash)
[![License: MIT](https://img.shields.io/github/license/mortend/xbash.svg?style=flat-square)](LICENSE)

> User-friendly and cross-platform bash command wrapper.

## Install

```
npm install xbash -g
```

## Usage

```js
const xbash = require('./');

xbash(['-c', 'echo Hello World!'], process.exit);
```

or, in Terminal:

```
$ xbash --version

ERROR: Bash was not found. This can be solved by installing Git.

Please get Git from https://git-scm.com/downloads and try again.
```

After installing [Git for Windows](https://git-scm.com/downloads):

```
$ xbash --version

GNU bash, version 4.4.23(1)-release (x86_64-pc-msys)
Copyright (C) 2016 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>

This is free software; you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

## Contributing

Please [report an issue](https://github.com/mortend/xbash/issues) if you encounter a problem, or [open a pull request](https://github.com/mortend/xbash/pulls) if you make a patch.
