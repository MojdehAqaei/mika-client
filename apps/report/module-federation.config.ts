import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'report',
  exposes: {
    './Routes': 'apps/report/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
