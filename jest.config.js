module.exports = {
    name: 'mock-axios',
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/tsconfig.json',
        },
    },
};
