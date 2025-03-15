import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'stockroom',
  exposes: {
    './Routes': 'apps/stockroom/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
