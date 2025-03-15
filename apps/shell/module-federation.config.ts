import { ModuleFederationConfig, SharedLibraryConfig } from '@nx/webpack';

const coreLibraries = new Set([
  '@view/lib',
  '@api/lib',
  '@domain/lib',
  '@state/lib',
  '@sadad/component-lib',
  '@angular/core',
  '@angular/forms',
  '@angular/common',
  '@angular/common/http',
  '@angular/common/testing',
  '@angular/router',
]);

const config: ModuleFederationConfig = {
  name: 'shell',
  /**
   * To use a remote that does not exist in your current Nx Workspace
   * You can use the tuple-syntax to define your remote
   *
   * remotes: [['my-external-remote', 'https://nx-angular-remote.netlify.app']]
   *
   * You _may_ need to add a `remotes.d.ts` file to your `src/` folder declaring the external remote for tsc, with the
   * following content:
   *
   * declare module 'my-external-remote';
   *
   */
  shared: (libraryName: string, defaultConfig: SharedLibraryConfig) => {
    if (coreLibraries.has(libraryName)) {
      return defaultConfig;
    }

    // Returning false means the library is not shared.
    return false;
  },
  remotes: [
    'user-management',
    'base-data',
    'stockroom',
    'purchase-and-orders',
    'report',
  ],
};

export default config;
