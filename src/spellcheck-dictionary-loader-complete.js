/*!
 * spellcheck-dictionary-loader-complete.js
 *
 * Like spellcheck-dictionary-loader.js, but complete: it tracks <link>
 * elements dynamically, the same way a browser tracks a live
 * <link rel="stylesheet">. Three things are watched, all scoped to <head>
 * (where <link> elements belong by convention, and where watching avoids
 * re-scanning on every unrelated DOM change happening elsewhere on the
 * page, e.g. in <body>):
 *
 *   1. A <link data-spellcheck-dictionary href="..."> (or a subtree
 *      containing one) being added to <head> -- its words are fetched and
 *      added.
 *   2. One being removed from <head> -- its words are removed.
 *   3. An existing, still-present <link> having its `href` changed, or
 *      having the `data-spellcheck-dictionary` attribute added/removed --
 *      handled as a live swap: old words out, new words in.
 *
 * (3) is the part a browser gets "for free" for real stylesheet links --
 * mutating .href on a connected <link rel="stylesheet"> triggers a native
 * re-fetch-and-swap, because the UA has dedicated processing for that rel
 * value. Our links use no such rel (deliberately, to avoid colliding with
 * whatever a future standardized rel value for this might be -- see the
 * plain loader's header comment), so nothing happens automatically; this
 * script has to reimplement that swap itself.
 *
 * Usage is identical to the plain (non-complete) version:
 *
 *   <script src="src/spellcheck-dictionary-loader-complete.js"></script>
 *   <link href="terms/domain-terms.json" data-spellcheck-dictionary>
 *
 * Design note: rather than trying to interpret each MutationRecord as an
 * add/remove delta, every relevant mutation just triggers a *resync* of
 * that <link> -- read its current href and whether the data attribute is
 * still present, compare that to what's currently tracked for it, and
 * reconcile. This is simpler to reason about than delta-parsing and is
 * naturally idempotent: redundant or out-of-order mutation records for the
 * same element can't leave things in a bad state, because each one just
 * re-derives truth from the live DOM rather than trusting what the record
 * itself claims changed.
 *
 * Because resyncing can kick off a fetch, and hrefs can change again before
 * an earlier fetch resolves, each tracked link carries a generation
 * counter. A fetch that resolves after being superseded by a newer one (or
 * after the link was removed entirely) is discarded rather than applied --
 * otherwise a slow response to an old href could clobber a faster response
 * to a newer one.
 *
 * If the browser doesn't implement document.spellCheckCustomDictionary,
 * this script does nothing at all -- no observer is created and no network
 * requests are made.
 */
(function () {
  "use strict";

  var ATTR = "data-spellcheck-dictionary";
  var LINK_SELECTOR = `link[${ATTR}]`;

  function isApiAvailable() {
    return (
      typeof document.spellCheckCustomDictionary !== "undefined" &&
      typeof document.spellCheckCustomDictionary.addWords === "function" &&
      typeof document.spellCheckCustomDictionary.removeWords === "function"
    );
  }

  // link -> { href, words, generation }
  //   href:       the href this record's fetch was (or is being) started for
  //   words:      the word list currently applied via addWords() for this
  //               link, or null if none has successfully applied yet
  //   generation: bumped every time a resync starts a new fetch for this
  //               link, so a stale response can be recognized and dropped
  var registry = new Map();

  function collectLinkCandidates(node) {
    var candidates = [];
    if (node.nodeType !== 1) {
      return candidates;
    }
    if (node.tagName === "LINK") {
      candidates.push(node);
    }
    if (node.querySelectorAll) {
      var nested = node.querySelectorAll("link");
      for (var i = 0; i < nested.length; i++) {
        candidates.push(nested[i]);
      }
    }
    return candidates;
  }

  function teardown(link) {
    var record = registry.get(link);
    if (!record) {
      return;
    }
    registry.delete(link);
    if (record.words && record.words.length > 0) {
      document.spellCheckCustomDictionary.removeWords(record.words);
    }
  }

  // Reconcile a single <link> element's currently-declared state (does it
  // have the attribute? what's its href?) against what's currently tracked
  // for it, fetching/applying/removing as needed.
  function sync(link) {
    var hasAttr = link.hasAttribute(ATTR);
    var href = link.getAttribute("href");
    var record = registry.get(link);

    if (!hasAttr || !href) {
      teardown(link);
      return;
    }

    if (record && record.href === href) {
      // Already tracking this exact href -- nothing to do.
      return;
    }

    var priorWords = record ? record.words : null;
    var generation = record ? record.generation + 1 : 1;
    registry.set(link, { href: href, words: null, generation: generation });

    fetch(href)
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

        var current = registry.get(link);
        // Discard if superseded: the link was removed, the attribute was
        // removed, or href changed again since this fetch started.
        if (!current || current.generation !== generation) {
          return;
        }

        // Swap: remove whatever this link had applied before, then add
        // the new list. Doing the removal first keeps "this link's words"
        // from ever meaning the union of an old and new list.
        if (priorWords && priorWords.length > 0) {
          document.spellCheckCustomDictionary.removeWords(priorWords);
        }
        if (words.length > 0) {
          document.spellCheckCustomDictionary.addWords(words);
        }
        current.words = words;
      })
      .catch(function (err) {
        var current = registry.get(link);
        if (current && current.generation === generation) {
          // Leave whatever was previously applied (if anything) in place
          // rather than clearing it over a failed refresh -- much like an
          // <img> that fails to load a new src doesn't erase the old
          // picture. A later attribute/href change is still needed to
          // retry; this doesn't automatically retry on its own.
          current.words = priorWords;
        }
        console.warn(
          `[spellcheck-dictionary-loader-complete] failed to load "${href}": ${err.message}`
        );
      });
  }

  function handleMutations(mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") {
        if (mutation.target.tagName === "LINK") {
          sync(mutation.target);
        }
        return;
      }
      mutation.addedNodes.forEach(function (node) {
        collectLinkCandidates(node).forEach(sync);
      });
      mutation.removedNodes.forEach(function (node) {
        collectLinkCandidates(node).forEach(teardown);
      });
    });
  }

  function run() {
    if (!isApiAvailable()) {
      return;
    }

    // Pick up anything already present at startup.
    document.head.querySelectorAll(LINK_SELECTOR).forEach(sync);

    // Then keep watching <head> for the rest of the page's lifetime:
    // element insertion/removal, plus href and data-attribute changes on
    // <link> elements that stay put.
    var observer = new MutationObserver(handleMutations);
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href", ATTR],
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
