import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'base-data',
  exposes: {
    './Routes': 'apps/base-data/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
