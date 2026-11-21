# notGoogle — Responsive Security Awareness Demo

Educational search-interface replica, not affiliated with Google.

## Run
Open `index.html` in a browser, or serve locally with `python -m http.server 8000`.

## Features
- Responsive desktop, tablet, mobile dark RTL interface
- Native GET search form and direct links to official Google services
- Apps menu and demo account menu
- Demo-only credentials; no real password collection
- Local-only event logging; JSON export and delete
- Security reveal: Konami code, five Esc presses, or five taps on the bottom center

## QA
Test 320px, 390px, 768px, 1024px and 1440px widths. Verify search, apps/profile menus, links, reveal and JSON export. Browser preview environments may block external navigation; test on a normal browser or GitHub Pages.

## Presentation integration
Use a standalone page for reliable navigation; an iframe may be restricted by its embedding environment. No Google pages are embedded.