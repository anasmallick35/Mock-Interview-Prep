export default {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Required for React components
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ["node_modules/(?!(lucide-react)/)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Custom setup
};
