/* eslint-disable no-console */
const assert = require('assert');
const { rollup } = require('rollup');
const bakedEnv = require('../');

let logOutput;
function interceptedConsole(msg) {
    logOutput = msg;
}
const originalConsoleLog = console.log;
const originalEnvs = JSON.parse(JSON.stringify(process.env));
function setEnvs(envs) {
  process.env = envs;
}

beforeEach(() => {
    process.env = {};
    console.log = interceptedConsole;
});
  
afterEach(() => {
    process.env = originalEnvs;
    console.log = originalConsoleLog;
});

const UNRELATED_VARIABLE = 'SUPER_SECRET_1234';

/**
 * Runs a bundle and returns the last `console.log` statement.
 * @param {import('rollup').RollupBuild} bundle
 */
async function executeBundle(bundle) {
    const generated = await bundle.generate({ format: 'cjs' });
    const fn = new Function(
        'module',
        'exports',
        'assert',
        'require',
        generated.output[0].code
    );
    const module = { exports: {} };
    try {
        fn(module, module.exports, assert, require);
    } catch (err) {
        console.log(generated.output[0].code);
        throw err;
    }
    return logOutput;
}


test('basic usage', async () => {
    setEnvs({
        FOO: 'foo',
        UNRELATED_VARIABLE,
    });
    let bundle = await rollup({
        input: 'test/samples/basic.js',
        plugins: [
            bakedEnv(),
        ],
    });
    expect(bundle).not.toContain(UNRELATED_VARIABLE);
    expect(await executeBundle(bundle)).toEqual('Yep');
});


test('basic usage (should throw)', async () => {
    setEnvs({
        UNRELATED_VARIABLE,
    });
    
    try {
        const bundle = await rollup({
            input: 'test/samples/basic.js',
            plugins: [
                bakedEnv(),
            ],
        });
        await executeBundle(bundle);
    } catch (err) {
        expect(err.message).toMatch("'FOO' is not exported by process.env");
    }
});


test('alias usage', async () => {
    setEnvs({
        FOO: 'foo',
        UNRELATED_VARIABLE,
    });
    let bundle = await rollup({
        input: 'test/samples/alias.js',
        plugins: [
            bakedEnv(),
        ],
    });
    expect(bundle).not.toContain(UNRELATED_VARIABLE);
    expect(await executeBundle(bundle)).toEqual('Yep');
});


test('multiple variables usage', async () => {
    setEnvs({
        FOO: 'foo',
        BAR: 'bar',
        UNRELATED_VARIABLE,
    });
    let bundle = await rollup({
        input: 'test/samples/multiple.js',
        plugins: [
            bakedEnv(),
        ],
    });
    expect(bundle).not.toContain(UNRELATED_VARIABLE);
    expect(await executeBundle(bundle)).toEqual(['foo', 'bar']);
});


test('import star usage', async () => {
    setEnvs({
        FOO: 'foo',
        BAR: 'bar',
        UNRELATED_VARIABLE,
    });
    let bundle = await rollup({
        input: 'test/samples/star.js',
        plugins: [
            bakedEnv(),
        ],
    });
    expect(bundle).not.toContain(UNRELATED_VARIABLE);
    expect(await executeBundle(bundle)).toEqual('Yep');
});


test('default import usage', async () => {
    setEnvs({
        FOO: 'foo',
        BAR: 'bar',
        UNRELATED_VARIABLE,
    });
    let bundle = await rollup({
        input: 'test/samples/default.js',
        plugins: [
            bakedEnv(),
        ],
    });
    expect(bundle).not.toContain(UNRELATED_VARIABLE);
    expect(await executeBundle(bundle)).toEqual(['foo', 'bar']);
});


test('multiple imports usage', async () => {
    setEnvs({
        FOO: 'foo',
        BAR: 'bar',
        BAZ: 'baz',
        UNRELATED_VARIABLE,
    });
    let bundle = await rollup({
        input: 'test/samples/multiple-imports.js',
        plugins: [
            bakedEnv(),
        ],
    });
    expect(bundle).not.toContain(UNRELATED_VARIABLE);
    expect(await executeBundle(bundle)).toEqual(['foo', 'bar', 'baz']);
});

