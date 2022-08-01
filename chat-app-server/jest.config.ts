import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
  '^.+\\.tsx?$': 'ts-jest',
  },
  roots: [
    "<rootDir>/src"
  ],
};

export default config;