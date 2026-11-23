# notGoogle — next review passes
Last updated: 2026-11-23

## Frozen checkpoint: Logo Candidate V1
- Approved exploratory settings saved in [experiments/logo-candidate-v1.json](../experiments/logo-candidate-v1.json).
- Interactive [typography lab](../experiments/logo-candidate-v1.html), also published separately under /preview/logo-lab.html.
- Values: Product Sans Regular +1px stroke, final e −24°, 7px tip trim at 64% height, letter size 100%, zero x/y offsets, total wordmark width 100%. Overlay split 65%.
- Keep the lab and reference intact. Not certified pixel-perfect, not merged into the homepage.
- Source font files are not redistributed.

## Next small, independently reviewable passes
1. **Launcher layout**: internal scroll within capped-height panel; grouping; inventory of missing services; accurate but separately licensed icon assets; keyboard and mobile focus behavior. Capture same-viewport before/after.
2. **Input Tools**: standalone light keyboard demo with number, modifier and symbol rows; Shift/Caps/Alt simulation, Backspace, Space, input focus; mobile layout and accessibility. No real credentials.
3. **Lens / hover labels**: inspect the supplied lens silhouette, check hover labels appear once beneath the control, test against desktop and mobile.
4. **Security Reveal**: clearer overview → event log → visual comparison → defense; compact independently scrollable event list; demonstrate synthetic-only data flow.
5. **Visual QA / sign-off**: compare at identical CSS viewport, DPR, zoom; record differences and screenshots; get explicit approval before merging.

## Release rules
- Make each change on an experiment branch, not by silently replacing the approved version.
- Keep educational identity visible and the demonstration authentication fictional-only.
- Do not use shortening or address-bar tricks to imply the website belongs to Google.
- Never publish Product Sans TTFs without appropriate distribution rights.
