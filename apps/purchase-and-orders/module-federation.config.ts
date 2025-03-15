import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'purchase-and-orders',
  exposes: {
    './Routes': 'apps/purchase-and-orders/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
