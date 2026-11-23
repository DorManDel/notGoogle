# notGoogle — next review passes
Last updated: 2026-11-23

## Frozen checkpoint: Logo Candidate V1
- Approved exploratory settings saved in [experiments/logo-candidate-v1.json](../experiments/logo-candidate-v1.json).
- Interactive [typography lab](../experiments/logo-candidate-v1.html), also published separately under /preview/logo-lab.html.
- Values: Product Sans Regular +1px stroke, final e −24°, 7px tip trim at 64% height, letter size 100%, zero x/y offsets, total wordmark width 100%. Overlay split 65%.
- Keep the lab and reference intact. Not certified pixel-perfect, not merged into the homepage.
- Source font files are not redistributed.

## Next small, independently reviewable passes
1. **Launcher layout — V5.8 implemented, pending reviewer visual approval**: expanded catalog to 41 links, fixed internal scroll with stable footer, 3-column responsive grid, edit/done/cancel favorites persisted only locally, full labels via tooltips. Original 15 local SVGs reused; newly added services use host-specific site favicons (which can vary) with non-emoji letter fallbacks. Confirm branding and order against reference screenshots before marking pixel-matched.
2. **Input Tools — implemented, Chromium browser QA passed**: light fictional-only keyboard with numbers, Hebrew rows, Shift→temporary English, Caps→persistent English, Ctrl+Alt→symbols, Space and Backspace. Search-field-only insertion, no sign-in-field access.
3. **Lens / hover labels — implemented, Chromium browser QA passed**: Lens SVG traced from the owner's supplied black-and-white screenshot; tooltips use one CSS-generated label below the icon, with duplicate native title attributes removed.
4. **Security Reveal**: clearer overview → event log → visual comparison → defense; compact independently scrollable event list; demonstrate synthetic-only data flow.
5. **Visual QA / sign-off**: compare at identical CSS viewport, DPR, zoom; record differences and screenshots; get explicit approval before merging.

## Release rules
- Make each change on an experiment branch, not by silently replacing the approved version.
- Keep educational identity visible and the demonstration authentication fictional-only.
- Do not use shortening or address-bar tricks to imply the website belongs to Google.
- Never publish Product Sans TTFs without appropriate distribution rights.

### V5.8 launcher's QA checklist
- [x] 41 data-driven app shortcuts and local-storage favorite preferences
- [x] Inner panel scrollbar, footer visible independent of app list
- [x] Distinct favorites section and rest of apps, 3-column layout
- [x] Edit favorites controls (edit, save, cancel)
- [ ] Visual reviewer confirmation of icon similarity for additional services
- [ ] Safari iPad scroll testing and keyboard focus testing
- [x] Screenshot evidence for split/desktop/tablet/mobile in [Chromium browser QA](https://github.com/DorManDel/notGoogle/actions/runs/45205823737)

### Final UI pass (2026-11-23)
- Lens screenshot traced into `assets/icons/lens.svg`; attribution updated to user-supplied reference.
- Input Tools replaced with a white, locally functional, fictional keyboard with Shift, Caps Lock, Ctrl+Alt, Backspace, and Space.
- Eliminated duplicate hover tooltip by removing native `title` from tool buttons and positioning the custom label below them.
- Linked `Logo Candidate V1` comparison lab directly from the Reveal's visual tab. The product-font-based experimental wordmark is not installed as public login branding.
- Frozen AI Prism and app launcher unchanged in this pass.
- Remaining sign-off: Chromium desktop/split/tablet/mobile run, manual Safari/iPad review, final reviewer approval before PR merge.

### V5.9 verification
- Chromium 1440×900, 940×978, 1194×834 and 390×844 browser QA passed: [run #45205823737](https://github.com/DorManDel/notGoogle/actions/runs/45205823737).
- The CI exercises AI Prism hover, app launcher scrolling and edit controls, keyboard modifier insertion, search tooltips, Reveal tabs and comparison assets.
- Pages preview published successfully in [run #45205657932](https://github.com/DorManDel/notGoogle/actions/runs/45205657932).
- Manual Safari/iPad visual sign-off and final icon review remain outside automated Chromium coverage.
