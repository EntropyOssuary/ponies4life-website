# Adding Entries to ponies4.life

## Gravestone (Memorial Garden) — data/gravestones.json
Paste into Claude Code: "Add gravestone: name, dates, epitaph"
Claude updates the JSON. Push to GitHub. Netlify redeploys.

Format:
```json
{ "name": "Horse Name", "dates": "1990 – 2010", "epitaph": "100 char max." }
```

## Map Pin (Ponies Around the World) — data/map-pins.json
Format:
```json
{ "name": "Pony", "location": "City, Country", "lat": 0.0, "lng": 0.0, "continent": "Europe", "description": "Brief note." }
```
Continents: Europe, North America, South America, Asia, Africa, Oceania, Antarctica, Iceland

## Hall of Fame — data/hall-of-fame.json
Format:
```json
{ "name": "Pony Name", "location": "Place", "year": "2026", "note": "Brief note.", "photo": "photos/filename.jpg" }
```

## YouTube IDs to verify
- Pony of the Month: Hall of Fame (The Script) — `Xsp3_a-PMTw`
- Around the World: Bring on the Dancing Horses (Echo & the Bunnymen) — verify `v2NLLa4oFr0`
- Cemetery Gate: Cemetery Gates (The Smiths) — verify `FqHJt1I5Wks`
- Memorial Garden: Love Will Tear Us Apart (Joy Division) — verify `zuuObGsB0No`

To update a YouTube ID, edit the `initAutoplay('ID')` call at the bottom of the relevant HTML file.
