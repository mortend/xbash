# xbash

[![NPM package](https://img.shields.io/npm/v/xbash.svg?style=flat-square)](https://www.npmjs.com/package/xbash)
[![NPM downloads](https://img.shields.io/npm/dt/xbash?color=blue&style=flat-square)](https://www.npmjs.com/package/xbash)
[![License: MIT](https://img.shields.io/github/license/mortend/xbash.svg?style=flat-square)](LICENSE)

> Friendly, portable wrapper around `bash`.

The wrapper is used to run shell-scripts in various [node-powered applications](https://github.com/fuse-open/uno). The wrapper makes sure that also `curl` and `unzip` are available inside `bash`, as needed by some [cross-platform installers](https://github.com/fuse-open/android-build-tools).

* On Windows, the wrapper finds your [Git for Windows] installation and will prefer to run commands from there.

* If a [Git for Windows] installation isn't found, and the commands aren't otherwise found, the wrapper will provide instructions on how to install [Git for Windows].

[Git for Windows]: https://git-scm.com/downloads

## Install

```
npm install xbash
```

This will install `bash` (alias `xbash`), a cross-platform wrapper around the real `bash` executable.

## Usage

This package gives you a reasonably portable way to use `bash` and other tools – in JavaScript or from command-line.

### JavaScript

```js
const bash = require('xbash');

bash(['-c', 'echo Hello World!'], process.exit);
```

### Command-Line

```
$ bash --version

ERROR: 'bash' was not found. This can be solved by installing Git.

Please get Git from https://git-scm.com/downloads and try again.
```

This happens when `bash` was not found. Running again after installing [Git for Windows].

```
$ bash --version

GNU bash, version 4.4.23(1)-release (x86_64-pc-msys)
Copyright (C) 2016 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>

This is free software; you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

We can run scripts or invoke other commands (that aren't otherwise available in PATH).

```
$ bash script.bash

Hello World!
```

```
$ bash -c 'curl --version'

curl 7.65.1 (x86_64-w64-mingw32) libcurl/7.65.1 OpenSSL/1.1.1c (Schannel) zlib/1.2.11 libidn2/2.2.0 nghttp2/1.38.0
Release-Date: 2019-06-05
Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtsp smtp smtps telnet tftp
Features: AsynchDNS HTTP2 HTTPS-proxy IDN IPv6 Kerberos Largefile libz Metalink MultiSSL NTLM SPNEGO SSL SSPI TLS-SRP
```

```
$ bash -c 'unzip'

UnZip 6.00 of 20 April 2009, by Info-ZIP.  Maintained by C. Spieler.  Send
bug reports using http://www.info-zip.org/zip-bug.html; see README for details.

[...]
```

## Contributing

Please [report an issue](https://github.com/mortend/xbash/issues) if you encounter a problem, or [open a pull request](https://github.com/mortend/xbash/pulls) if you make a patch.
