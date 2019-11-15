# xbash

[![NPM package](https://img.shields.io/npm/v/xbash.svg?style=flat-square)](https://www.npmjs.com/package/xbash)
[![License: MIT](https://img.shields.io/github/license/mortend/xbash.svg?style=flat-square)](LICENSE)

> Friendly, portable wrapper around `bash`.

## Install

```
npm install xbash
```

This will install `xbash`, a cross-platform wrapper around `bash`.

The wrapper will make sure that also `curl` and `unzip` are available inside `bash`, making this package useful for developing [cross-platform installers](https://github.com/mortend/android-build-tools) among other things.

* On Windows, the wrapper finds your [Git for Windows] installation and will prefer to run commands from there.

* If a [Git for Windows] installation isn't found, and all mentioned commands aren't otherwise found, the wrapper will provide instructions on how to install [Git for Windows].

* Since [Git for Windows] is popular, this package gives you a reasonably portable way to use these commands, in JavaScript or from command-line.

[Git for Windows]: https://git-scm.com/downloads

## Usage

```js
const bash = require('xbash');

bash(['-c', 'echo Hello World!'], process.exit);
```

or, from command-line:

```
$ xbash --version

ERROR: 'bash' was not found. This can be solved by installing Git.

Please get Git from https://git-scm.com/downloads and try again.
```

This happens when `bash` was not found. Running again after installing [Git for Windows].

```
$ xbash --version

GNU bash, version 4.4.23(1)-release (x86_64-pc-msys)
Copyright (C) 2016 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>

This is free software; you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

We can use `xbash` to run scripts, or to invoke other commands.

```
$ xbash script.bash

Hello World!
```

```
$ xbash -c 'curl --version'

curl 7.65.1 (x86_64-w64-mingw32) libcurl/7.65.1 OpenSSL/1.1.1c (Schannel) zlib/1.2.11 libidn2/2.2.0 nghttp2/1.38.0
Release-Date: 2019-06-05
Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtsp smtp smtps telnet tftp
Features: AsynchDNS HTTP2 HTTPS-proxy IDN IPv6 Kerberos Largefile libz Metalink MultiSSL NTLM SPNEGO SSL SSPI TLS-SRP
```

```
$ xbash -c 'unzip'

UnZip 6.00 of 20 April 2009, by Info-ZIP.  Maintained by C. Spieler.  Send
bug reports using http://www.info-zip.org/zip-bug.html; see README for details.

[...]
```

## Contributing

Please [report an issue](https://github.com/mortend/xbash/issues) if you encounter a problem, or [open a pull request](https://github.com/mortend/xbash/pulls) if you make a patch.
