#!/usr/bin/env node
const unzip = require('./').unzip;

unzip(process.argv.splice(2), process.exit);
