/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
    testEnvironment: 'jsdom',
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    // collectCoverageFrom: undefined,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // An array of regexp pattern strings used to skip coverage collection
    // coveragePathIgnorePatterns: [
    //   "/node_modules/"
    // ],
    // If you're using MSW, opt out of the browser export condition for MSW tests
    // For more information, see: https://github.com/mswjs/msw/issues/1786#issuecomment-1782559851
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    setupFiles: ['./jest.polyfills.js'],

    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    // If you plan on importing .gql/.graphql files in your tests, transform them with @graphql-tools/jest-transform
    transform: {
        '\\.(gql|graphql)$': '@graphql-tools/jest-transform',
    },
    globals: {
        'globalThis.__DEV__': JSON.stringify(true),
    },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
