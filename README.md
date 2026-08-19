# Domain Dictionaries

A collection of domain-specific word lists / glossaries, gathered in one place because — surprisingly — no single project seems to do this well.

These lists were put together initially for use with the proposed [Spell Check Custom Dictionary API](https://github.com/Igalia/explainers/blob/main/spell-check-dictionary/README.md) — but there's nothing dictionary-API-specific about them, so treat them as general-purpose domain word lists usable for any purpose (autocomplete, tokenizers, NER seed lists, whatever).  

*The repository does include instructions for use with the Spell Check Custom Dictionary API, as well as a handy library for making it declarative.  If you're looking for how to use `<link>` for this, skip right to [Using via the declarative library](#using-via-the-declarative-library)

All lists below are JSON arrays of strings.

## Contents

- [Term lists in this repo](#term-lists-in-this-repo)
  - [Fiction & Fandom](#fiction--fandom)
  - [Science & Mathematics](#science--mathematics)
  - [Technology & Cloud](#technology--cloud)
  - [Professional & Industry](#professional--industry)
  - [Finance & Business](#finance--business)
  - [Food & Culinary](#food--culinary)
  - [To do / wanted](#to-do--wanted)
- [Use with the Spell Check Custom Dictionary API](#use)
  - [Using via the declarative library](#using-via-the-declarative-library)
  - [Using it directly in your own script](#using-it-directly-in-your-own-script)

## Term lists in this repo

### Fiction & Fandom

| File | Domain | Description |
|---|---|---|
| `terms/pokemon.json` | Pokemon | 392 terms — Pokemon species, trainers, gyms, towns, regions, and moves, for custom spell-checker dictionaries. |
| `terms/marvel.json` | Marvel | 78 terms — Marvel characters, places, and named objects/tech. |
| `terms/dc.json` | DC | 72 terms — DC characters and places. |
| `terms/starwars.json` | Star Wars | 191 terms — Star Wars characters, species, places, ships, and in-universe terms. |
| `terms/lotr.json` | Lord of the Rings | 173 terms — Tolkien characters, races, places, objects, and Elvish/invented-language terms (Aragorn, Rivendell, palantir, Sindarin, etc.). |
| `terms/startrek.json` | Star Trek | 135 terms — characters, species, ships, places, and franchise-specific tech/culture terms (Vulcan, Klingon, dilithium, tricorder, Kobayashi Maru, etc.) — excludes phrases made of common English words alone (Prime Directive, Deep Space Nine, Neutral Zone). |
| `terms/harrypotter.json` | Harry Potter | 159 terms — characters, places, creatures, spells, and objects (Dumbledore, Hogwarts, Quidditch, Expelliarmus, Horcrux, etc.) — multi-word names split down to just the invented/uncommon component where the rest is ordinary English (e.g. "Privet" not "Privet Drive"). |
| `terms/got.json` | Game of Thrones | 139 terms — house names, characters, places, and in-universe terms (Targaryen, Winterfell, Dothraki, Valyrian, Dracarys, etc.) — excludes names built entirely from common English words (King's Landing, Iron Throne, Night's Watch, White Walker). |

### Science & Mathematics

| File | Domain | Description |
|---|---|---|
| `terms/math.json` | Mathematics | 96 terms — eigen- terms, mathematician-derived adjectives (Riemannian, Hausdorff, Noetherian, Lagrangian, etc.), and abstract algebra/topology/analysis vocabulary (homomorphism, bijective, homeomorphism, cohomology, etc.). Excludes school-level terms (algebra, derivative, matrix, polynomial, hypotenuse) already in standard dictionaries. |
| `terms/astronomy.json` | Astronomy | 88 terms — positional/measurement terms (perihelion, syzygy, parallax, precession, etc.), object types (magnetar, exoplanet, protostar), named telescopes/missions/scientists (Hubble, Kepler, Chandrasekhar, Schwarzschild), stars and constellations (Betelgeuse, Cassiopeia, Fomalhaut), and particle/cosmology terms (baryon, gluon, fermion). Excludes common words already in standard dictionaries (star, planet, galaxy, comet, black hole, supernova, pulsar). |
| `terms/chemistry.json` | Chemistry | 128 terms — less-common elements (lutetium, praseodymium, seaborgium, oganesson, etc. — excludes everyday ones like gold, iron, oxygen), named reactions/constants (Grignard, Diels-Alder, Haber, Avogadro, Le Chatelier), stereochemistry and mechanism vocabulary (electrophile, enantiomer, chirality, tautomerism, hybridization), functional groups (carboxylic, carbonyl, sulfonic, heterocyclic), and lab equipment (burette, Erlenmeyer, Buchner, desiccator). |

### Technology & Cloud

| File | Domain | Description |
|---|---|---|
| `terms/webdev.json` | Web development | 192 terms — framework/tool/protocol/API terms a web developer would type that a standard OS dictionary won't recognize (React, npm, webpack, JWT, kubectl, localStorage, etc.). |
| `terms/devops.json` | DevOps / cloud infrastructure | 122 terms — AWS/Azure/GCP service names beyond the basics in webdev.json (DynamoDB, Fargate, Route53, Aurora, AKS, GKE, BigQuery, etc.), networking jargon (BGP, VLAN, CIDR, iptables), observability and service-mesh tools (Prometheus, Grafana, Istio, Jaeger), CI/CD platforms (Jenkins, ArgoCD, Spinnaker), IaC/config-management tools (Pulumi, Chef, Puppet), and orchestration internals (containerd, StatefulSet, cgroups). Skips two-word phrases built from ordinary English (rate limiting, circuit breaker, blast radius) since each word there is already recognized on its own; kept single fused compounds (autoscaling, backpressure) since the joined form itself isn't a standard dictionary entry. |

### Professional & Industry

| File | Domain | Description |
|---|---|---|
| `terms/medical.json` | Medical / patient intake | 112 terms — generic drug names and specialized clinical terms a patient might type into a doctor's intake form — deliberately excludes everyday symptoms, anatomy, and specialist titles already in standard dictionaries. |
| `terms/legal.json` | Legal | 91 terms — Latin-derived legal doctrine terms and specific procedural/drafting jargon (estoppel, certiorari, res judicata, laches, etc.) — deliberately excludes common legal words (contract, subpoena, deposition, litigation) already in standard dictionaries. |
| `terms/auto.json` | Automobile mechanics | 60 terms — genuinely obscure suspension/drivetrain/tuning jargon (monocoque, wastegate, oversteer, Ackermann, coilover, etc.) plus diagnostic and drivetrain acronyms (OBD-II, ECU, TPMS, VVT, DOHC, etc.). Shorter than the fandom lists because most everyday car-part vocabulary (piston, clutch, alternator, camshaft) is already in standard dictionaries. |

### Finance & Business

| File | Domain | Description |
|---|---|---|
| `terms/stocks.json` | Stock market | 537 terms — ticker symbols, essentially the full S&P 500 constituent list (a close proxy for the *public* companies in the Fortune 500) plus notable additions (foreign automakers, recent IPOs, crypto-adjacent names) and major index/sector ETFs. Note: the Fortune 500 itself is ranked by revenue and includes many privately held companies (Cargill, Koch Industries, Mars, Publix, State Farm, etc.) that have no ticker at all, so a literal "Fortune 500 tickers" list tops out around 400-450 regardless of source. |

### Food & Culinary

| File | Domain | Description |
|---|---|---|
| `terms/culinary.json` | Culinary / cooking | 126 terms — French technique and mother-sauce vocabulary (mirepoix, roux, beurre/blanc, chiffonade, confit), baking/pastry terms (autolyse, levain, dacquoise), charcuterie and cuts (osso/buco, guanciale, bresaola), flavor/ingredient terms (umami, koji, gochujang, za'atar), and dish/preparation names across cuisines (paella, ceviche, gyoza, tteokbokki, bouillabaisse, puttanesca). Multi-word foreign phrases (sous vide, coq au vin) are split into individual tokens since spellcheckers match word by word. Excludes common cooking vocabulary already in standard dictionaries (bake, sauté, stock, marinade). |
| `terms/alcohol.json` | Wine, beer & spirits | 60 terms — wine vocabulary (terroir, sommelier, malolactic, botrytis, phylloxera, oenology), spirits/distilling terms (congeners, fusel, rectification, peated), and beer/brewing terms (wort, lauter, flocculation, Brettanomyces, lambic, gueuze, hefeweizen). Excludes everyday drink words already in standard dictionaries (beer, wine, whiskey, vintage, brewery) and phrases built entirely from ordinary English words (mash bill, pot still, sour mash). |
| `terms/coffee.json` | Coffee | 35 terms — varietals (geisha, typica, pacamara, catuai), brewing/tasting vocabulary (cupping, crema, ristretto, mouthfeel, agtron), and equipment/technique terms (Chemex, Aeropress, portafilter, WDT, TDS). Excludes everyday coffee-shop words already in standard dictionaries (espresso, latte, cappuccino, barista, decaf). |
| `terms/tea.json` | Tea | 30 terms — tea types (sencha, gyokuro, pu-erh, darjeeling, keemun, lapsang souchong), Japanese/Chinese ceremony and processing vocabulary (chanoyu, gongfu, yixing, gaiwan, chasen), and tea chemistry terms (theanine, catechins, polyphenols). Excludes common tea words already in standard dictionaries (green tea, black tea, chamomile, oolong). |

### To do / wanted

- [ ] Real estate / mortgage terms
- [ ] Personal finance / investing terms
- [ ] Video game franchises (Zelda, Final Fantasy, Mario)
- [ ] Music production / DAW terms
- [ ] Common surnames / given names by locale (useful for HR/CRM-style forms)

## Use

`spellcheck-demo.html` is a working demo in this folder: a `contenteditable` area with `spellcheck="true"`, split into sample sections for several of the lists above, plus a `<select>` that changes which dictionary is active. It doesn't call the API directly — instead it sets the `href` of a declared `<link data-spellcheck-dictionary>` tag, and `spellcheck-dictionary-loader-complete.js` (loaded on the same page) - it needs to be served (not opened via `file://`).

### Using via the declative library

Two small loader scripts in `src/` handle the common cases declaratively, so most pages don't need to call the API at all.

#### The easy way: `spellcheck-dictionary-loader.js`

For most pages — anything that just wants to declare "these are my domain words, please stop underlining them" once and move on — `src/spellcheck-dictionary-loader.js` does the whole job with zero JavaScript on the page's part. Drop the script in and declare one or more word lists with a `<link>` carrying a `data-spellcheck-dictionary` attribute:

```html
<script src="src/spellcheck-dictionary-loader.js"></script>
<link href="terms/domain-terms.json" data-spellcheck-dictionary>
<link href="terms/stocks.json" data-spellcheck-dictionary>
```

The attribute is what the loader looks for — `rel` is deliberately not used, so this convention can't collide with whatever `rel` value a future standard version of this feature might mint. If a page declares no such `<link>` elements at all, the loader does nothing — there's no implicit default filename it goes looking for; declaring a dictionary is always an explicit, opt-in act. And if the browser doesn't implement `document.spellCheckCustomDictionary` at all, the loader makes no network requests whatsoever — it feature-detects first.

This is a userland convention, not part of the explainer or any spec — it's just a convenient way to avoid writing the same six lines of fetch-and-addWords boilerplate on every page that only needs the simple case.

#### The complete way: `src/spellcheck-dictionary-loader-complete.js`

Same `<link data-spellcheck-dictionary>` convention, but complete — it tracks `<link>` elements the way a browser tracks a real `<link rel="stylesheet">`. It uses a `MutationObserver` scoped to `<head>` (where `<link>` elements belong by convention, and watching only there avoids re-scanning on every unrelated DOM change elsewhere on the page, e.g. in `<body>`) that reacts to three things: a matching `<link>` (or a subtree containing one) being added, one being removed, and — the part browsers give real stylesheets for free but don't give these — an existing `<link>` having its `href` changed, or having the `data-spellcheck-dictionary` attribute added or removed, while staying in the document the whole time. That last case is handled as a live swap: the old word list comes out via `removeWords()` before the new one goes in via `addWords()`.

Rather than parsing each mutation as a delta, every relevant change just triggers a resync of that `<link>` — read its current `href` and whether the attribute is still present, compare to what's currently tracked, reconcile. Each tracked link also carries a generation counter, so if `href` changes twice in quick succession, a slow response to the first fetch can't clobber a faster response to the second — the stale one is just dropped. The one-shot loader above only ever looks once, at page load, and doesn't need any of this.

Use whichever one matches the page — most pages want the plain loader; only reach for `-live` if dictionaries genuinely come and go after load.

### Using it directly in your own script

If a page needs more control than a declarative `<link>` gives you, skip the library and call the API yourself.

#### The manual way: calling the API directly

For anything more dynamic than "load some lists once and forget it" — like `spellcheck-demo.html`'s dictionary switcher, which needs to add and remove words as the user changes their selection — call the [proposed](https://github.com/Igalia/explainers/blob/main/spell-check-dictionary/README.md) `document.spellCheckCustomDictionary` interface yourself. It's write-only (`addWords()` / `removeWords()`, no way to read back what's in it, by design, for privacy), and each JSON file here is already just an array of strings, so wiring one up is a single fetch:

```javascript
const words = await fetch("terms/stocks.json").then(r => r.json());
document.spellCheckCustomDictionary.addWords(words);
```

Combine multiple lists for a page that spans domains (e.g. a fintech blog might want both `stocks.json` and `legal.json`):

```javascript
const lists = await Promise.all(
  ["terms/stocks.json", "terms/legal.json"].map(f => fetch(f).then(r => r.json()))
);
document.spellCheckCustomDictionary.addWords(lists.flat());
```

Remember the dictionary is per-document and transient — it needs to be re-populated on every page load, and there's no way to enumerate what's already in it (by design, for privacy).

#### For anything else

There's nothing dictionary-API-specific about the format — it's just a flat JSON array of strings — so these lists work equally well as seed data for autocomplete, custom tokenizers/NER, highlighting domain terms in an editor, or any other place a curated vocabulary is useful. Load the file, parse the JSON, use the array however your tool expects it.
