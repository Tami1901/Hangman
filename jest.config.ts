// jest.config.js
import nextJest from 'next/jest';

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: __dirname });

// Any custom config you want to pass to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
// createJestConfig is exported in this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
