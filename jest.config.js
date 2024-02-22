/** @type {import('jest').Config} */
const config = {
    verbose: true,
    preset: 'ts-jest',
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    }
};

module.exports = config;