import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'user-management',
  exposes: {
    './Routes': 'apps/user-management/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
