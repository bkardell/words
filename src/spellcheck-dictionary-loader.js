/*!
 * spellcheck-dictionary-loader.js
 *
 * A zero-config loader for the proposed Spell Check Custom Dictionary API:
 * https://github.com/Igalia/explainers/blob/main/spell-check-dictionary/README.md
 *
 * Usage: drop this script anywhere on the page (order relative to the
 * <link> elements below doesn't matter):
 *
 *   <script src="src/spellcheck-dictionary-loader.js"></script>
 *
 * Declare one or more word lists with a <link> element carrying a
 * `data-spellcheck-dictionary` attribute (the presence of the attribute is
 * what matters -- `rel` is deliberately not used, so this can never collide
 * with a future standardized `rel` value):
 *
 *   <link href="terms/domain-terms.json" data-spellcheck-dictionary>
 *   <link href="terms/another-list.json" data-spellcheck-dictionary>
 *
 * If no such <link> elements are present anywhere on the page, this script
 * does nothing -- there's no implicit default filename it goes looking for.
 * Declaring a dictionary is always an explicit, opt-in act.
 *
 * Each referenced file must be a JSON array of strings, e.g.:
 *
 *   ["Igalia", "Pikachu", "spidermonkey"]
 *
 * If the browser doesn't implement document.spellCheckCustomDictionary,
 * this script does nothing at all -- no network requests are made.
 */
(function () {
  "use strict";

  var LINK_SELECTOR = "link[data-spellcheck-dictionary]";

  function isApiAvailable() {
    return (
      typeof document.spellCheckCustomDictionary !== "undefined" &&
      typeof document.spellCheckCustomDictionary.addWords === "function"
    );
  }

  function resolveDeclaredUrls() {
    var links = document.querySelectorAll(LINK_SELECTOR);
    var urls = [];
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href");
      if (href) {
        urls.push(href);
      }
    }
    return urls;
  }

  function loadAndApply(url) {
    fetch(url)
      .then(function (res) {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(function (data) {
        if (!Array.isArray(data)) {
          throw new Error("expected a JSON array of strings");
        }
        var words = data.filter(function (w) {
          return typeof w === "string";
        });
        document.spellCheckCustomDictionary.addWords(words || []);
      })
      .catch(function (err) {
        console.warn(
          `[spellcheck-dictionary-loader] failed to load "${url}": ${err.message}`
        );
      });
  }

  function run() {
    if (!isApiAvailable()) {
      return;
    }

    resolveDeclaredUrls().forEach(loadAndApply);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
