var glob = require('glob');


process.env.NODE_ENV = 'test';


glob.sync('**/*-test.js', {realpath: true, cwd: __dirname}).forEach(require);
