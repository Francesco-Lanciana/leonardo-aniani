/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These have to be require's and have to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 */

const { TextDecoder, TextEncoder } = require('node:util');
const { ReadableStream } = require('node:stream/web');
const { clearImmediate } = require('node:timers');
const { performance } = require('node:perf_hooks');

Object.defineProperties(globalThis, {
    TextDecoder: { value: TextDecoder },
    TextEncoder: { value: TextEncoder },
    ReadableStream: { value: ReadableStream },
    performance: { value: performance },
    clearImmediate: { value: clearImmediate },
});

const { Blob, File } = require('node:buffer');
const { fetch, Headers, FormData, Request, Response } = require('undici');

Object.defineProperties(globalThis, {
    fetch: { value: fetch, writable: true },
    Response: { value: Response },
    Blob: { value: Blob },
    File: { value: File },
    Headers: { value: Headers },
    FormData: { value: FormData },
    Request: { value: Request },
});

// Note: if your environment supports it, you can use the `using` keyword
// but must polyfill Symbol.dispose here with Jest versions <= 29
// where Symbol.dispose is not defined
//
// Jest bug: https://github.com/jestjs/jest/issues/14874
// Fix is available in https://github.com/jestjs/jest/releases/tag/v30.0.0-alpha.3
if (!Symbol.dispose) {
    Object.defineProperty(Symbol, 'dispose', {
        value: Symbol('dispose'),
    });
}
if (!Symbol.asyncDispose) {
    Object.defineProperty(Symbol, 'asyncDispose', {
        value: Symbol('asyncDispose'),
    });
}
