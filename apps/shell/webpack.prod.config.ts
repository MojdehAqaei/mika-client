import { withModuleFederation } from '@nx/angular/module-federation';
import config from './module-federation.config';

export default withModuleFederation({
  ...config,
  /** http-server default port is 8080 **/
  remotes: [
    ['user-management', 'http://127.0.0.1:9080/user-management'],
    ['base-data', 'http://127.0.0.1:9080/base-data'],
    ['stockroom', 'http://127.0.0.1:9080/stockroom'],
    ['purchase-and-orders', 'http://127.0.0.1:9080/purchase-and-orders'],
    ['report', 'http://127.0.0.1:9080/report'],
  ]
  /*
   * Remote overrides for production.
   * Each entry is a pair of a unique name and the URL where it is deployed.
   *
   * e.g.
   * remotes: [
   *   ['app1', 'https://app1.example.com'],
   *   ['app2', 'https://app2.example.com'],
   * ]
   */
});
