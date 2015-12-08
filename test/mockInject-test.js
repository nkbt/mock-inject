import {test} from 'tape';
import {inject} from '../src/mockInject';
import {spy, stub, sandbox} from 'sinon';


const injector = inject('./src/testable');


const mock = () => {
  const sb = sandbox.create();
  const log = sb.spy(console, 'log');
  const {func, __reset} = injector({
    './injectable': {hello: name => name}
  });


  return {
    func,
    log,
    restore: () => {
      sb.restore();
      __reset();
    }
  };
};


test('Hello, Testable!', t => {
  const {func, log, restore} = mock();

  t.equals(
    func(),
    'Testable',
    'should use default value');

  t.equals(
    func('Name'),
    'Name',
    'should use provided name');

  t.notEquals(
    log.firstCall.args[0],
    'OMG, I should not be visible if mocked',
    'should not call console.log from injectable.js');

  restore();
  t.end();
});


test('Hello, Testable2!', t => {
  const sb = sandbox.create();
  const log = sb.stub(console, 'log');
  const {func} = require('./src/testable');
  const args = log.args;
  sb.restore();

//  const {func, log} = mock();

  console.log('mockInject-test.js:57    args', args);

  t.equals(
    func(),
    'Testable',
    'should use default value');

  t.equals(
    func('Name'),
    'Name',
    'should use provided name');

  t.notEquals(
    args,
    'OMG, I should not be visible if mocked',
    'should not call console.log from injectable.js');

  t.end();
});

