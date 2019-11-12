define('crm/Bootstrap.localization', ['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.makeRequest = makeRequest;
  exports.l20nLoadFunc = l20nLoadFunc;
  exports.l20nNoFetchFunc = l20nNoFetchFunc;
  exports.l20nLinkFunc = l20nLinkFunc;
  exports.l20nAddResourceFunc = l20nAddResourceFunc;
  exports.bootstrapLocalization = bootstrapLocalization;
  /* Copyright 2017 Infor
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @module crm.Bootstrap.localization
   */

  function makeRequest(url) {
    return new Promise(function (resolve, reject) {
      var http = new XMLHttpRequest();

      http.open('GET', url);
      http.addEventListener('load', function (response) {
        resolve(response.target.response);
      });
      http.addEventListener('error', function (err) {
        return reject(err);
      });
      http.addEventListener('abort', function (err) {
        return reject(err);
      });
      http.send();
    });
  }

  function l20nLoadFunc(localeFiles) {
    return new Promise(function (resolve) {
      var https = localeFiles.map(function (file) {
        return makeRequest(file);
      });
      Promise.all(https).then(function (files) {
        resolve(files);
      });
    });
  }

  function l20nNoFetchFunc(localeFiles) {
    return new Promise(function (resolve) {
      resolve(localeFiles);
    });
  }

  function l20nLinkFunc(files, context, defaultContext) {
    files.forEach(function (file) {
      [context, defaultContext].forEach(function (ctx) {
        ctx.linkResource(function (locale) {
          return [file.base, locale, file.file].join('/');
        });
      });
    });
  }

  function l20nAddResourceFunc(files, context, defaultContext) {
    files.forEach(function (file) {
      [context, defaultContext].forEach(function (ctx) {
        ctx.addResource(file);
      });
    });
  }

  /**
   * Bootstrap localization
   * This function handles the bootstrapping of localization for
   * the application.
   * fetchFunc - Takes an array of processed locale files, returns a promise
   * processFunc - Takes the results from fetchFunc along with the current context and defaultContext
   */
  function bootstrapLocalization(_ref) {
    var supportedLocales = _ref.supportedLocales,
        defaultLocale = _ref.defaultLocale,
        currentLocale = _ref.currentLocale,
        localeFiles = _ref.localeFiles,
        _ref$fetchFunc = _ref.fetchFunc,
        fetchFunc = _ref$fetchFunc === undefined ? l20nNoFetchFunc : _ref$fetchFunc,
        _ref$processFunc = _ref.processFunc,
        processFunc = _ref$processFunc === undefined ? l20nLinkFunc : _ref$processFunc,
        _ref$asGlobal = _ref.asGlobal,
        asGlobal = _ref$asGlobal === undefined ? false : _ref$asGlobal;

    var promise = new Promise(function (resolve) {
      // The L20n context (ctx) should only call linkResource once per file.
      // We need to:
      //    * Strip out the locale from the path string (map)
      //    * Remove duplicates (reduce)
      //    * link each resource against a locale (forEach)
      var processedLocaleFiles = localeFiles.map(function (path) {
        var trimmed = path;
        supportedLocales.forEach(function (locale) {
          trimmed = trimmed.replace(new RegExp('/' + locale + '/'), '/');
        });

        var index = trimmed.lastIndexOf('/');
        var basePath = trimmed.substring(0, index);
        var file = trimmed.substring(index + 1, trimmed.length);
        return {
          base: basePath,
          file: file
        };
      }).reduce(function (p, c) {
        if (p.some(function (pathInfo) {
          return pathInfo.base === c.base && pathInfo.file === c.file;
        })) {
          return p;
        }

        return p.concat(c);
      }, []);

      fetchFunc(processedLocaleFiles).then(function (files) {
        var ctx = window.L20n.getContext();
        var defaultCtx = window.L20n.getContext();

        processFunc(files, ctx, defaultCtx);

        ctx.registerLocales(defaultLocale, supportedLocales);
        ctx.requestLocales(currentLocale);
        defaultCtx.registerLocales(defaultLocale);
        defaultCtx.requestLocales(defaultLocale);

        window.localeContext = ctx;
        window.defaultLocaleContext = defaultCtx;

        Promise.all([new Promise(function (res) {
          ctx.ready(function () {
            return res(true);
          });
        }), new Promise(function (res) {
          defaultCtx.ready(function () {
            return res(true);
          });
        })]).then(function () {
          resolve();
        });
      });
    });
    if (asGlobal) {
      window[asGlobal] = promise;
    }
    return promise;
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb290c3RyYXAubG9jYWxpemF0aW9uLmpzIl0sIm5hbWVzIjpbIm1ha2VSZXF1ZXN0IiwibDIwbkxvYWRGdW5jIiwibDIwbk5vRmV0Y2hGdW5jIiwibDIwbkxpbmtGdW5jIiwibDIwbkFkZFJlc291cmNlRnVuYyIsImJvb3RzdHJhcExvY2FsaXphdGlvbiIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaHR0cCIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNwb25zZSIsInRhcmdldCIsImVyciIsInNlbmQiLCJsb2NhbGVGaWxlcyIsImh0dHBzIiwibWFwIiwiZmlsZSIsImFsbCIsInRoZW4iLCJmaWxlcyIsImNvbnRleHQiLCJkZWZhdWx0Q29udGV4dCIsImZvckVhY2giLCJjdHgiLCJsaW5rUmVzb3VyY2UiLCJsb2NhbGUiLCJiYXNlIiwiam9pbiIsImFkZFJlc291cmNlIiwic3VwcG9ydGVkTG9jYWxlcyIsImRlZmF1bHRMb2NhbGUiLCJjdXJyZW50TG9jYWxlIiwiZmV0Y2hGdW5jIiwicHJvY2Vzc0Z1bmMiLCJhc0dsb2JhbCIsInByb21pc2UiLCJwcm9jZXNzZWRMb2NhbGVGaWxlcyIsInBhdGgiLCJ0cmltbWVkIiwicmVwbGFjZSIsIlJlZ0V4cCIsImluZGV4IiwibGFzdEluZGV4T2YiLCJiYXNlUGF0aCIsInN1YnN0cmluZyIsImxlbmd0aCIsInJlZHVjZSIsInAiLCJjIiwic29tZSIsInBhdGhJbmZvIiwiY29uY2F0Iiwid2luZG93IiwiTDIwbiIsImdldENvbnRleHQiLCJkZWZhdWx0Q3R4IiwicmVnaXN0ZXJMb2NhbGVzIiwicmVxdWVzdExvY2FsZXMiLCJsb2NhbGVDb250ZXh0IiwiZGVmYXVsdExvY2FsZUNvbnRleHQiLCJyZXMiLCJyZWFkeSJdLCJtYXBwaW5ncyI6Ijs7OztVQW1CZ0JBLFcsR0FBQUEsVztVQWNBQyxZLEdBQUFBLFk7VUFTQUMsZSxHQUFBQSxlO1VB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QW5COztBQUVBckIsb0JBQVlkLEtBQVosRUFBbUJJLEdBQW5CLEVBQXdCZ0MsVUFBeEI7O0FBRUFoQyxZQUFJaUMsZUFBSixDQUFvQjFCLGFBQXBCLEVBQW1DRCxnQkFBbkM7QUFDQU4sWUFBSWtDLGNBQUosQ0FBbUIxQixhQUFuQjtBQUNBd0IsbUJBQVdDLGVBQVgsQ0FBMkIxQixhQUEzQjtBQUNBeUIsbUJBQVdFLGNBQVgsQ0FBMEIzQixhQUExQjs7QUFFQXNCLGVBQU9NLGFBQVAsR0FBdUJuQyxHQUF2QjtBQUNBNkIsZUFBT08sb0JBQVAsR0FBOEJKLFVBQTlCOztBQUVBckQsZ0JBQVFlLEdBQVIsQ0FBWSxDQUFDLElBQUlmLE9BQUosQ0FBWSxVQUFDMEQsR0FBRCxFQUFTO0FBQ2hDckMsY0FBSXNDLEtBQUosQ0FBVTtBQUFBLG1CQUFNRCxJQUFJLElBQUosQ0FBTjtBQUFBLFdBQVY7QUFDRCxTQUZZLENBQUQsRUFFUixJQUFJMUQsT0FBSixDQUFZLFVBQUMwRCxHQUFELEVBQVM7QUFDdkJMLHFCQUFXTSxLQUFYLENBQWlCO0FBQUEsbUJBQU1ELElBQUksSUFBSixDQUFOO0FBQUEsV0FBakI7QUFDRCxTQUZHLENBRlEsQ0FBWixFQUlLMUMsSUFKTCxDQUlVLFlBQU07QUFDZGY7QUFDRCxTQU5EO0FBT0QsT0FyQkQ7QUFzQkQsS0FsRGUsQ0FBaEI7QUFtREEsUUFBSStCLFFBQUosRUFBYztBQUNaa0IsYUFBT2xCLFFBQVAsSUFBbUJDLE9BQW5CO0FBQ0Q7QUFDRCxXQUFPQSxPQUFQO0FBQ0QiLCJmaWxlIjoiQm9vdHN0cmFwLmxvY2FsaXphdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAbW9kdWxlIGNybS5Cb290c3RyYXAubG9jYWxpemF0aW9uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KHVybCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgaHR0cC5vcGVuKCdHRVQnLCB1cmwpO1xyXG4gICAgaHR0cC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzcG9uc2UudGFyZ2V0LnJlc3BvbnNlKTtcclxuICAgIH0pO1xyXG4gICAgaHR0cC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVyciA9PiByZWplY3QoZXJyKSk7XHJcbiAgICBodHRwLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyID0+IHJlamVjdChlcnIpKTtcclxuICAgIGh0dHAuc2VuZCgpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbDIwbkxvYWRGdW5jKGxvY2FsZUZpbGVzKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICBjb25zdCBodHRwcyA9IGxvY2FsZUZpbGVzLm1hcChmaWxlID0+IG1ha2VSZXF1ZXN0KGZpbGUpKTtcclxuICAgIFByb21pc2UuYWxsKGh0dHBzKS50aGVuKChmaWxlcykgPT4ge1xyXG4gICAgICByZXNvbHZlKGZpbGVzKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbDIwbk5vRmV0Y2hGdW5jKGxvY2FsZUZpbGVzKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICByZXNvbHZlKGxvY2FsZUZpbGVzKTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGwyMG5MaW5rRnVuYyhmaWxlcywgY29udGV4dCwgZGVmYXVsdENvbnRleHQpIHtcclxuICBmaWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICBbY29udGV4dCwgZGVmYXVsdENvbnRleHRdLmZvckVhY2goKGN0eCkgPT4ge1xyXG4gICAgICBjdHgubGlua1Jlc291cmNlKChsb2NhbGUpID0+IHtcclxuICAgICAgICByZXR1cm4gW2ZpbGUuYmFzZSwgbG9jYWxlLCBmaWxlLmZpbGVdLmpvaW4oJy8nKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGwyMG5BZGRSZXNvdXJjZUZ1bmMoZmlsZXMsIGNvbnRleHQsIGRlZmF1bHRDb250ZXh0KSB7XHJcbiAgZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgW2NvbnRleHQsIGRlZmF1bHRDb250ZXh0XS5mb3JFYWNoKChjdHgpID0+IHtcclxuICAgICAgY3R4LmFkZFJlc291cmNlKGZpbGUpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCb290c3RyYXAgbG9jYWxpemF0aW9uXHJcbiAqIFRoaXMgZnVuY3Rpb24gaGFuZGxlcyB0aGUgYm9vdHN0cmFwcGluZyBvZiBsb2NhbGl6YXRpb24gZm9yXHJcbiAqIHRoZSBhcHBsaWNhdGlvbi5cclxuICogZmV0Y2hGdW5jIC0gVGFrZXMgYW4gYXJyYXkgb2YgcHJvY2Vzc2VkIGxvY2FsZSBmaWxlcywgcmV0dXJucyBhIHByb21pc2VcclxuICogcHJvY2Vzc0Z1bmMgLSBUYWtlcyB0aGUgcmVzdWx0cyBmcm9tIGZldGNoRnVuYyBhbG9uZyB3aXRoIHRoZSBjdXJyZW50IGNvbnRleHQgYW5kIGRlZmF1bHRDb250ZXh0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYm9vdHN0cmFwTG9jYWxpemF0aW9uKHtcclxuICBzdXBwb3J0ZWRMb2NhbGVzLFxyXG4gIGRlZmF1bHRMb2NhbGUsXHJcbiAgY3VycmVudExvY2FsZSxcclxuICBsb2NhbGVGaWxlcyxcclxuICBmZXRjaEZ1bmMgPSBsMjBuTm9GZXRjaEZ1bmMsXHJcbiAgcHJvY2Vzc0Z1bmMgPSBsMjBuTGlua0Z1bmMsXHJcbiAgYXNHbG9iYWwgPSBmYWxzZSxcclxufSkge1xyXG4gIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgLy8gVGhlIEwyMG4gY29udGV4dCAoY3R4KSBzaG91bGQgb25seSBjYWxsIGxpbmtSZXNvdXJjZSBvbmNlIHBlciBmaWxlLlxyXG4gICAgLy8gV2UgbmVlZCB0bzpcclxuICAgIC8vICAgICogU3RyaXAgb3V0IHRoZSBsb2NhbGUgZnJvbSB0aGUgcGF0aCBzdHJpbmcgKG1hcClcclxuICAgIC8vICAgICogUmVtb3ZlIGR1cGxpY2F0ZXMgKHJlZHVjZSlcclxuICAgIC8vICAgICogbGluayBlYWNoIHJlc291cmNlIGFnYWluc3QgYSBsb2NhbGUgKGZvckVhY2gpXHJcbiAgICBjb25zdCBwcm9jZXNzZWRMb2NhbGVGaWxlcyA9IGxvY2FsZUZpbGVzLm1hcCgocGF0aCkgPT4ge1xyXG4gICAgICBsZXQgdHJpbW1lZCA9IHBhdGg7XHJcbiAgICAgIHN1cHBvcnRlZExvY2FsZXMuZm9yRWFjaCgobG9jYWxlKSA9PiB7XHJcbiAgICAgICAgdHJpbW1lZCA9IHRyaW1tZWQucmVwbGFjZShuZXcgUmVnRXhwKGAvJHtsb2NhbGV9L2ApLCAnLycpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdHJpbW1lZC5sYXN0SW5kZXhPZignLycpO1xyXG4gICAgICBjb25zdCBiYXNlUGF0aCA9IHRyaW1tZWQuc3Vic3RyaW5nKDAsIGluZGV4KTtcclxuICAgICAgY29uc3QgZmlsZSA9IHRyaW1tZWQuc3Vic3RyaW5nKGluZGV4ICsgMSwgdHJpbW1lZC5sZW5ndGgpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGJhc2U6IGJhc2VQYXRoLFxyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgIH07XHJcbiAgICB9KVxyXG4gICAgICAucmVkdWNlKChwLCBjKSA9PiB7XHJcbiAgICAgICAgaWYgKHAuc29tZShwYXRoSW5mbyA9PiBwYXRoSW5mby5iYXNlID09PSBjLmJhc2UgJiYgcGF0aEluZm8uZmlsZSA9PT0gYy5maWxlKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcC5jb25jYXQoYyk7XHJcbiAgICAgIH0sIFtdKTtcclxuXHJcbiAgICBmZXRjaEZ1bmMocHJvY2Vzc2VkTG9jYWxlRmlsZXMpLnRoZW4oKGZpbGVzKSA9PiB7XHJcbiAgICAgIGNvbnN0IGN0eCA9IHdpbmRvdy5MMjBuLmdldENvbnRleHQoKTtcclxuICAgICAgY29uc3QgZGVmYXVsdEN0eCA9IHdpbmRvdy5MMjBuLmdldENvbnRleHQoKTtcclxuXHJcbiAgICAgIHByb2Nlc3NGdW5jKGZpbGVzLCBjdHgsIGRlZmF1bHRDdHgpO1xyXG5cclxuICAgICAgY3R4LnJlZ2lzdGVyTG9jYWxlcyhkZWZhdWx0TG9jYWxlLCBzdXBwb3J0ZWRMb2NhbGVzKTtcclxuICAgICAgY3R4LnJlcXVlc3RMb2NhbGVzKGN1cnJlbnRMb2NhbGUpO1xyXG4gICAgICBkZWZhdWx0Q3R4LnJlZ2lzdGVyTG9jYWxlcyhkZWZhdWx0TG9jYWxlKTtcclxuICAgICAgZGVmYXVsdEN0eC5yZXF1ZXN0TG9jYWxlcyhkZWZhdWx0TG9jYWxlKTtcclxuXHJcbiAgICAgIHdpbmRvdy5sb2NhbGVDb250ZXh0ID0gY3R4O1xyXG4gICAgICB3aW5kb3cuZGVmYXVsdExvY2FsZUNvbnRleHQgPSBkZWZhdWx0Q3R4O1xyXG5cclxuICAgICAgUHJvbWlzZS5hbGwoW25ldyBQcm9taXNlKChyZXMpID0+IHtcclxuICAgICAgICBjdHgucmVhZHkoKCkgPT4gcmVzKHRydWUpKTtcclxuICAgICAgfSksIG5ldyBQcm9taXNlKChyZXMpID0+IHtcclxuICAgICAgICBkZWZhdWx0Q3R4LnJlYWR5KCgpID0+IHJlcyh0cnVlKSk7XHJcbiAgICAgIH0pXSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGlmIChhc0dsb2JhbCkge1xyXG4gICAgd2luZG93W2FzR2xvYmFsXSA9IHByb21pc2U7XHJcbiAgfVxyXG4gIHJldHVybiBwcm9taXNlO1xyXG59XHJcbiJdfQ==