import MingleUtility from './MingleUtility';

export default function bootstrap({
  supportedLocales,
  defaultLocale,
  currentLocale,
  parentLocale,
  application,
  configuration,
  legacyLocalization,
  legacyLocalizationFallback,
  localeFiles,
  isRegionMetric,
}) {
  const ctx = window.L20n.getContext();
  const defaultCtx = window.L20n.getContext();

  // The L20n context (ctx) should only call linkResource once per file.
  // We need to:
  //    * Strip out the locale from the path string (map)
  //    * Remove duplicates (reduce)
  //    * link each resource against a locale (forEach)
  localeFiles.map((path) => {
    let trimmed = path;
    supportedLocales.forEach((locale) => {
      trimmed = trimmed.replace(new RegExp(`/${locale}/`), '/');
    });

    const index = trimmed.lastIndexOf('/');
    const basePath = trimmed.substring(0, index);
    const file = trimmed.substring(index + 1, trimmed.length);
    return {
      base: basePath,
      file,
    };
  })
  .reduce((p, c) => {
    if (p.some((pathInfo) => {
      return pathInfo.base === c.base && pathInfo.file === c.file;
    })) {
      return p;
    }

    return p.concat(c);
  }, [])
  .forEach((pathInfo) => {
    [ctx, defaultCtx].forEach((context) => {
      context.linkResource((locale) => {
        return [pathInfo.base, locale, pathInfo.file].join('/');
      });
    });
  });

  ctx.registerLocales(defaultLocale, supportedLocales);
  ctx.requestLocales(currentLocale);
  defaultCtx.registerLocales(defaultLocale);
  defaultCtx.requestLocales(defaultLocale);

  window.localeContext = ctx;
  window.defaultLocaleContext = defaultCtx;

  Promise.all([new Promise((resolve) => {
    ctx.ready(() => resolve(true));
  }), new Promise((resolve) => {
    defaultCtx.ready(() => resolve(true));
  })]).then(() => {
    window.require([application].concat(configuration), (Application, appConfig) => {
      let completed = false;
      let mingleAuthResults;

      if (appConfig.mingleEnabled) {
        mingleAuthResults = MingleUtility.populateAccessToken(appConfig);
        if (!mingleAuthResults) {
          return;
        }
      }
      const req = (requires) => {
        require(requires.concat('dojo/domReady!'), () => {
          if (completed) {
            return;
          }

          let results = moment.locale(parentLocale);

          // moment will return the set culture if successful, otherwise it returns the currently set culture.
          // Check to see if the culture set failed, and attept to use the specific culture instead
          if (results !== parentLocale) {
            results = moment.locale(currentLocale);
            if (results !== currentLocale) {
              console.error(`Failed to set the culture for moment.js, culture set to ${results}`); // eslint-disable-line
            }
          }
          const instance = new Application(appConfig);
          instance.localeContext = ctx;
          instance.isRegionMetric = isRegionMetric;
          instance.mingleAuthResults = mingleAuthResults;
          instance.activate();
          instance.init();
          instance.run();
          completed = true;
        });
      };

      require.on('error', () => {
        console.log('Error loading localization, falling back to "en"'); // eslint-disable-line
        req(legacyLocalizationFallback);
      });

      req(legacyLocalization);
    });
  });
}
