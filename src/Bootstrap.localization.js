
/**
 * Bootstrap localization
 * This function handles the bootstrapping of localization for
 * the application.
 */
export default function bootstrapLocalization(
  fetchFunc = new Promise(resolve => resolve([])),
  supportedLocales = [
    'en',
    'en-GB',
    'de',
    'fr',
    'it',
    'ru',
    'zh-CN',
    'zh-TW',
    'es',
    'pt',
  ],
  defaultLocale = 'en',
  currentLocale = 'en',
  localeFiles = [
    './localization/locales/crm/en/strings.l20n',
    './localization/locales/crm/en/regional.l20n',
    './localization/locales/crm/en/hashtags.l20n',
    './localization/locales/icboe/en/strings.l20n',
    './localization/locales/icboe/en/regional.l20n',
    './localization/locales/contour/en/strings.l20n',
    '../../argos-sdk/localization/locales/argos/en/strings.l20n',
    '../../argos-sdk/localization/locales/argos/en/regional.l20n',
  ],
  asGlobal = false
) {
  const promise = new Promise((resolve) => {
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
      if (p.some(pathInfo => pathInfo.base === c.base && pathInfo.file === c.file)) {
        return p;
      }

      return p.concat(c);
    }, []);

    fetchFunc(localeFiles).then((files) => {
      const ctx = window.L20n.getContext();
      const defaultCtx = window.L20n.getContext();

      files.forEach((file) => {
        [ctx, defaultCtx].forEach((context) => {
          context.addResource(file);
        });
      });

      ctx.registerLocales(defaultLocale, supportedLocales);
      ctx.requestLocales(currentLocale);
      defaultCtx.registerLocales(defaultLocale);
      defaultCtx.requestLocales(defaultLocale);

      window.localeContext = ctx;
      window.defaultLocaleContext = defaultCtx;

      Promise.all([new Promise((res) => {
        ctx.ready(() => res(true));
      }), new Promise((res) => {
        defaultCtx.ready(() => res(true));
      })]).then(() => {
        resolve();
      });
    });
  });
  if (asGlobal) {
    window[asGlobal] = promise;
  }
  return promise;
}
