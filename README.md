# Domain Dictionaries

A collection of domain-specific word lists / glossaries, gathered in one place because — surprisingly — no single project seems to do this well.

All lists below are JSON arrays of strings.

## Contents

- [Fiction & Fandom](#fiction--fandom)
- [Science & Mathematics](#science--mathematics)
- [Technology & Cloud](#technology--cloud)
- [Professional & Industry](#professional--industry)
- [Finance & Business](#finance--business)
- [Food & Culinary](#food--culinary)
- [To do / wanted](#to-do--wanted)

## Fiction & Fandom

| File | Domain | Description |
|---|---|---|
| `pokemon.json` | Pokemon | 392 terms — Pokemon species, trainers, gyms, towns, regions, and moves, for custom spell-checker dictionaries. |
| `marvel.json` | Marvel | 78 terms — Marvel characters, places, and named objects/tech. |
| `dc.json` | DC | 72 terms — DC characters and places. |
| `starwars.json` | Star Wars | 191 terms — Star Wars characters, species, places, ships, and in-universe terms. |
| `lotr.json` | Lord of the Rings | 173 terms — Tolkien characters, races, places, objects, and Elvish/invented-language terms (Aragorn, Rivendell, palantir, Sindarin, etc.). |
| `startrek.json` | Star Trek | 135 terms — characters, species, ships, places, and franchise-specific tech/culture terms (Vulcan, Klingon, dilithium, tricorder, Kobayashi Maru, etc.) — excludes phrases made of common English words alone (Prime Directive, Deep Space Nine, Neutral Zone). |
| `harrypotter.json` | Harry Potter | 159 terms — characters, places, creatures, spells, and objects (Dumbledore, Hogwarts, Quidditch, Expelliarmus, Horcrux, etc.) — multi-word names split down to just the invented/uncommon component where the rest is ordinary English (e.g. "Privet" not "Privet Drive"). |
| `got.json` | Game of Thrones | 139 terms — house names, characters, places, and in-universe terms (Targaryen, Winterfell, Dothraki, Valyrian, Dracarys, etc.) — excludes names built entirely from common English words (King's Landing, Iron Throne, Night's Watch, White Walker). |

## Science & Mathematics

| File | Domain | Description |
|---|---|---|
| `math.json` | Mathematics | 96 terms — eigen- terms, mathematician-derived adjectives (Riemannian, Hausdorff, Noetherian, Lagrangian, etc.), and abstract algebra/topology/analysis vocabulary (homomorphism, bijective, homeomorphism, cohomology, etc.). Excludes school-level terms (algebra, derivative, matrix, polynomial, hypotenuse) already in standard dictionaries. |
| `astronomy.json` | Astronomy | 88 terms — positional/measurement terms (perihelion, syzygy, parallax, precession, etc.), object types (magnetar, exoplanet, protostar), named telescopes/missions/scientists (Hubble, Kepler, Chandrasekhar, Schwarzschild), stars and constellations (Betelgeuse, Cassiopeia, Fomalhaut), and particle/cosmology terms (baryon, gluon, fermion). Excludes common words already in standard dictionaries (star, planet, galaxy, comet, black hole, supernova, pulsar). |
| `chemistry.json` | Chemistry | 128 terms — less-common elements (lutetium, praseodymium, seaborgium, oganesson, etc. — excludes everyday ones like gold, iron, oxygen), named reactions/constants (Grignard, Diels-Alder, Haber, Avogadro, Le Chatelier), stereochemistry and mechanism vocabulary (electrophile, enantiomer, chirality, tautomerism, hybridization), functional groups (carboxylic, carbonyl, sulfonic, heterocyclic), and lab equipment (burette, Erlenmeyer, Buchner, desiccator). |

## Technology & Cloud

| File | Domain | Description |
|---|---|---|
| `webdev.json` | Web development | 192 terms — framework/tool/protocol/API terms a web developer would type that a standard OS dictionary won't recognize (React, npm, webpack, JWT, kubectl, localStorage, etc.). |
| `devops.json` | DevOps / cloud infrastructure | 122 terms — AWS/Azure/GCP service names beyond the basics in webdev.json (DynamoDB, Fargate, Route53, Aurora, AKS, GKE, BigQuery, etc.), networking jargon (BGP, VLAN, CIDR, iptables), observability and service-mesh tools (Prometheus, Grafana, Istio, Jaeger), CI/CD platforms (Jenkins, ArgoCD, Spinnaker), IaC/config-management tools (Pulumi, Chef, Puppet), and orchestration internals (containerd, StatefulSet, cgroups). Skips two-word phrases built from ordinary English (rate limiting, circuit breaker, blast radius) since each word there is already recognized on its own; kept single fused compounds (autoscaling, backpressure) since the joined form itself isn't a standard dictionary entry. |

## Professional & Industry

| File | Domain | Description |
|---|---|---|
| `medical.json` | Medical / patient intake | 112 terms — generic drug names and specialized clinical terms a patient might type into a doctor's intake form — deliberately excludes everyday symptoms, anatomy, and specialist titles already in standard dictionaries. |
| `legal.json` | Legal | 91 terms — Latin-derived legal doctrine terms and specific procedural/drafting jargon (estoppel, certiorari, res judicata, laches, etc.) — deliberately excludes common legal words (contract, subpoena, deposition, litigation) already in standard dictionaries. |
| `auto.json` | Automobile mechanics | 60 terms — genuinely obscure suspension/drivetrain/tuning jargon (monocoque, wastegate, oversteer, Ackermann, coilover, etc.) plus diagnostic and drivetrain acronyms (OBD-II, ECU, TPMS, VVT, DOHC, etc.). Shorter than the fandom lists because most everyday car-part vocabulary (piston, clutch, alternator, camshaft) is already in standard dictionaries. |

## Finance & Business

| File | Domain | Description |
|---|---|---|
| `stocks.json` | Stock market | 537 terms — ticker symbols, essentially the full S&P 500 constituent list (a close proxy for the *public* companies in the Fortune 500) plus notable additions (foreign automakers, recent IPOs, crypto-adjacent names) and major index/sector ETFs. Note: the Fortune 500 itself is ranked by revenue and includes many privately held companies (Cargill, Koch Industries, Mars, Publix, State Farm, etc.) that have no ticker at all, so a literal "Fortune 500 tickers" list tops out around 400-450 regardless of source. |

## Food & Culinary

| File | Domain | Description |
|---|---|---|
| `culinary.json` | Culinary / cooking | 126 terms — French technique and mother-sauce vocabulary (mirepoix, roux, beurre/blanc, chiffonade, confit), baking/pastry terms (autolyse, levain, dacquoise), charcuterie and cuts (osso/buco, guanciale, bresaola), flavor/ingredient terms (umami, koji, gochujang, za'atar), and dish/preparation names across cuisines (paella, ceviche, gyoza, tteokbokki, bouillabaisse, puttanesca). Multi-word foreign phrases (sous vide, coq au vin) are split into individual tokens since spellcheckers match word by word. Excludes common cooking vocabulary already in standard dictionaries (bake, sauté, stock, marinade). |
| `alcohol.json` | Wine, beer & spirits | 60 terms — wine vocabulary (terroir, sommelier, malolactic, botrytis, phylloxera, oenology), spirits/distilling terms (congeners, fusel, rectification, peated), and beer/brewing terms (wort, lauter, flocculation, Brettanomyces, lambic, gueuze, hefeweizen). Excludes everyday drink words already in standard dictionaries (beer, wine, whiskey, vintage, brewery) and phrases built entirely from ordinary English words (mash bill, pot still, sour mash). |
| `coffee.json` | Coffee | 35 terms — varietals (geisha, typica, pacamara, catuai), brewing/tasting vocabulary (cupping, crema, ristretto, mouthfeel, agtron), and equipment/technique terms (Chemex, Aeropress, portafilter, WDT, TDS). Excludes everyday coffee-shop words already in standard dictionaries (espresso, latte, cappuccino, barista, decaf). |
| `tea.json` | Tea | 30 terms — tea types (sencha, gyokuro, pu-erh, darjeeling, keemun, lapsang souchong), Japanese/Chinese ceremony and processing vocabulary (chanoyu, gongfu, yixing, gaiwan, chasen), and tea chemistry terms (theanine, catechins, polyphenols). Excludes common tea words already in standard dictionaries (green tea, black tea, chamomile, oolong). |

## To do / wanted

- [ ] Real estate / mortgage terms
- [ ] Personal finance / investing terms
- [ ] Video game franchises (Zelda, Final Fantasy, Mario)
- [ ] Music production / DAW terms
- [ ] Common surnames / given names by locale (useful for HR/CRM-style forms)
