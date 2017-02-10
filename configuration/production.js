/* eslint-disable */
import { getDefaultConfig } from './production.default';

export function getConfig() {
  return Object.assign({}, getDefaultConfig(), {
    // Override default properties here, example:
    // enableOfflineSupport: true,
  });
}
