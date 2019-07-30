#!/usr/bin/env node
const curl = require('./').curl;

curl(process.argv.splice(2), process.exit);
