#!/usr/bin/env node
const bash = require('.');

bash(process.argv.splice(2), process.exit);
