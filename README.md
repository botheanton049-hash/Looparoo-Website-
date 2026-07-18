# LOOPAROO — Website

Statische Startup-Website für **LOOPAROO GmbH** (Mehrweg-Versandtaschen, rPET, EU-PPWR-konform).

Reines HTML/CSS/JS ohne Build-Schritt — direkt per **GitHub Pages** deploybar.

## Struktur

```
looparoo-site/
├── index.html        Alle Inhalte/Sektionen der One-Page-Website
├── css/styles.css     Design-System (Farben, Typografie, Layout, Responsive)
├── js/main.js          Mobile-Nav, Scroll-Reveal, Zähler-Animation, Kontaktformular
└── README.md
```

## Inhalte

- Hero mit Kernbotschaft & Live-Statistiken
- Problem (Marktzahlen zu Verpackungsmüll & E-Commerce)
- Produkt (Tasche S/L, Material, technische Daten)
- „So funktioniert der Loop" (5-Schritte-Kreislauf)
- Sektion für **Endkund:innen**
- Sektion für **Partner-Unternehmen** (B2B, Preisübersicht, Pilotkunde, PPWR)
- Markt & Roadmap
- Team
- Kontakt-/Partneranfrage-Formular (Frontend-Demo, ohne Backend)

## Lokal starten

Einfach `index.html` im Browser öffnen, oder mit einem lokalen Server:

```bash
npx serve .
```

## Auf GitHub Pages veröffentlichen

1. Repo erstellen und Inhalt dieses Ordners pushen
2. Unter **Settings → Pages** die Branch (z. B. `main`) und den Ordner `/root` auswählen
3. Fertig — die Seite ist unter `https://<username>.github.io/<repo>/` erreichbar

## Anpassungen

- **Farben & Schriften:** zentral über CSS-Variablen in `css/styles.css` (`:root`)
- **Texte/Inhalte:** direkt in `index.html` je Sektion
- **Formular an echtes Backend anbinden:** in `js/main.js` den `submit`-Handler durch einen `fetch()`-Aufruf an den gewünschten Endpoint (z. B. Formspree, eigene API) ersetzen

## Quelle

Inhalte basieren auf dem LOOPAROO-Pitchdeck (Businessmodell, Marktdaten, Finanzplanung, Team) sowie öffentlich zugänglichen Marktquellen (siehe Quellenverzeichnis im Deck).
