import mockery from 'mockery';
import path from 'path';


const getCallerPath = () => {
  const prepareStackTrace = Error.prepareStackTrace;

  Error.prepareStackTrace = (_, stack) => stack
    .map(item => item.receiver && item.receiver.filename)
    .filter(file => file);
  const [callerPath] = (new Error()).stack;

  Error.prepareStackTrace = prepareStackTrace;

  return callerPath;
};


export const inject = dependency => {
  const relative = path.relative(__dirname, path.dirname(getCallerPath()));
  const dependencyPath = `${relative}/${dependency}`;


  mockery.enable({warnOnUnregistered: false, warnOnReplace: false, useCleanCache: true});


  return mocks => {
    mockery.resetCache();
    Object.keys(mocks).forEach(key => mockery.registerMock(key, mocks[key]));

    const dep = require(dependencyPath);

    dep.__reset = () => Object.keys(mocks).forEach(key => mockery.deregisterMock(key));

    return dep;
  };
};
