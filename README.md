# xbash

[![NPM package](https://img.shields.io/npm/v/xbash.svg?style=flat-square)](https://www.npmjs.com/package/xbash)
[![License: MIT](https://img.shields.io/github/license/mortend/xbash.svg?style=flat-square)](LICENSE)

> Friendly, portable wrappers of bash, curl and unzip.

## Install

```
npm install xbash
```

This will install `xbash`, `xcurl` and `xunzip`.

## Usage

```js
const bash = require('xbash');

bash(['-c', 'echo Hello World!'], process.exit);
```

```js
const curl = require('xbash').curl;

curl(['-L', 'https://npmjs.com'], process.exit);
```

```js
const unzip = require('xbash').unzip;

unzip(['file.zip'], process.exit);
```

or, in Terminal:

```
$ xbash --version

ERROR: 'bash' was not found. This can be solved by installing Git.

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

```
$ xcurl --version

curl 7.55.1 (Windows) libcurl/7.55.1 WinSSL
Release-Date: [unreleased]
Protocols: dict file ftp ftps http https imap imaps pop3 pop3s smtp smtps telnet tftp
Features: AsynchDNS IPv6 Largefile SSPI Kerberos SPNEGO NTLM SSL
```

```
$ xunzip

UnZip 6.00 of 20 April 2009, by Info-ZIP.  Maintained by C. Spieler.  Send
bug reports using http://www.info-zip.org/zip-bug.html; see README for details.

[...]
```

## Contributing

Please [report an issue](https://github.com/mortend/xbash/issues) if you encounter a problem, or [open a pull request](https://github.com/mortend/xbash/pulls) if you make a patch.
