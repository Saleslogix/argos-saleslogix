export function getDefaultModules() {
  return new Promise((resolve) => {
    import('./ApplicationModule').then((appModule) => {
      const ApplicationModule = appModule.default;
      Promise.all([
        import('./Integrations/BOE/ApplicationModule'),
        import('./Integrations/Contour/ApplicationModule'),
      ]).then((rest) => {
        const [boeAppModule, contourAppModule] = rest;
        const BOEApplicationModule = boeAppModule.default;
        const ContourApplicationModule = contourAppModule.default;
        resolve([
          new ApplicationModule(),
          new BOEApplicationModule(),
          new ContourApplicationModule(),
        ]);
      });
    });
  });
}
