export function getDefaultModules() {
  return new Promise((resolve) => {
    require.ensure([], (require) => {
      const ApplicationModule = require('./ApplicationModule').default;
      const BOEApplicationModule = require('./Integrations/BOE/ApplicationModule').default;
      const ContourApplicationModule = require('./Integrations/Contour/ApplicationModule').default;
      resolve([
        new ApplicationModule(),
        new BOEApplicationModule(),
        new ContourApplicationModule(),
      ]);
    });
  });
}
