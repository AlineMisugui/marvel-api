
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { /* ts-jest config goes here in Jest */ }],
    },
    clearMocks: true,
    coverageProvider: 'v8',
    coverageThreshold: {
        global: {
            function: 80,
            lines: 80,
            statements: 80
        }
    },
    collectCoverage: true,
    testPathIgnorePatterns: ['./dist/*']
}