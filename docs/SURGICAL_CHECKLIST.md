# notGoogle — Surgical visual-fidelity checklist (V5.3–V5.7)

**Scope:** independently authored, explicitly labeled security-awareness UI. The demo identity and fictional-only login are not removed. This plan is not permission to copy Google's private code, obscure the domain, or collect real account credentials.

## Change control

- **Working branch:** `experiment/v5.3-pixel-pass`; `main` is the control.
- **Existing issue:** [#1 — visual fidelity plan](https://github.com/DorManDel/notGoogle/issues/1).
- **One pass / one behavior class:** HTML, CSS, or JS changes documented separately. Prefer editing an exact selector, never adding another blanket override without evidence.
- **Before every change:** reference capture, our capture, viewport CSS width and height, devicePixelRatio, browser zoom, browser version, current commit.
- **Before merge:** manual sign-off on desktop + tablet + phone; rerun functional and safety regressions; publish screenshot comparison with measured deltas.

## Reference capture: Google (2026-11-22)

Screenshot size: **932×924 raster pixels**. Measurements below describe *the screenshot*, not CSS pixels. Use as a reference only when viewport/zoom/DPR are aligned.

| Item | Observed value | Method / confidence |
| --- | --- | --- |
| Main background | `#22242A` / RGB (34,36,42) | sample from multiple blank pixels, high |
| Search bar fill | `#363840` / RGB (54,56,64) | interior pixels, high |
| Logo bright pixel bounds | x ≈ 328–596, y ≈ 260–340 | thresholded white-pixel mask, medium |
| Search shell bounds | x ≈ 120–807, y ≈ 371–422 | reference screenshot, medium |
| Search shell image dimensions | ≈ 688×52 px | bounding-box approximation, medium |
| Search bar width relative to image | 73.8% | 688 / 932, medium |
| Footer first separator | y ≈ 829 | scanline, high |
| White wordmark | stylized lettering | **not** a regular CSS font; typography pass pending |
| AI Mode hover | subtle multicolor edge/glow | visual observation; source implementation unknown |

### Live-code baseline observations

- `:root` is finally overridden to `--bg:#22242a; --panel:#363840`; do not "fix" the old `#202124` declaration without checking cascade and fresh rendering.
- Existing CSS has several appended override blocks and competing breakpoints. Simplify only with before/after screenshots because order matters.
- Prior 2026-11-22 split-pane screenshots mix browser chrome and two different site instances: **do not** compare screenshot x/y coordinates across panes without normalizing pane-local origin and page zoom.
- Account is a **demo**, not Google OAuth; event log is **localStorage**, not zero data collection. Password samples are fixed fictional values and not logged.

## [x] V5.3a — First bounded code change on test branch

File: `index.html`, media query `min-width:601px` and `max-width:1099px`.

- [x] Tablet search width: from `min(100%,730px)` to `min(100%,74vw,690px)` (at viewport width 932px ⇒ ~689.7 CSS px before margins).
- [x] Tablet search height: from `58px` to `52px`.
- [x] JavaScript syntax and demo-guard smoke check.
- [ ] Screenshot in actual 932px CSS viewport; confirm true browser DPR and zoom.
- [ ] Compare against the reference; **revert** either change if actual screenshot or interactions regress.

## [ ] V5.3b — Pixel layout pass (no logo/AI changes yet)

| ID | Priority | Selector / area | Surgical edit | Acceptance check |
| --- | --- | --- | --- | --- |
| PX-01 | P0 | `.main` | Calibrate vertical spacing between header and logo using one rule per breakpoint | reference-relative `y` delta documented; no content jump |
| PX-02 | P0 | `.search-form`, `.search-shell` | Measure x/width/height and revise only after same-zoom capture | dimensions within ±4 CSS px of normalized target (provisional target) |
| PX-03 | P1 | `.actions`, `.action`, `.langs` | Match gap, margins, line-height and button padding | no overlap at 320/390/768/932/1194/1440 |
| PX-04 | P1 | `.footer`, `.country`, `.foot-links`, `.climate-callout` | Match row boundaries, baseline and responsive wrapping | climate text readable; no overlap, missing links or horizontal scroll |
| PX-05 | P1 | `.top`, `.top-left`, `.top-links` | Normalize top offsets in CSS pixels and touch targets | tap targets ≥40 CSS px, header stable |
| PX-06 | P1 | `:root` tokens | Consolidate only confirmed colors (`#22242A`, `#363840`) | sampled rendered colors agree with reference |

**Geometry metric:** record actual `x, y, width, height` before and after. After aligning screenshot dimensions and origin, use Δx/Δy/Δwidth/Δheight per element. The reference screenshot does not reveal true CSS boxes, so treat raw screenshot measurements as approximations, not absolute test oracles.

## [ ] V5.4 — Search bar / AI interaction

| ID | Priority | Area | Acceptance |
| --- | --- | --- | --- |
| SB-01 | P0 | `#ai`, `.ai-pill` | Original multicolor hover inspired effect, focused within pill; keyboard focus, reduced-motion fallback |
| SB-02 | P0 | `#keyboard`, `#mic`, `#lens` | Aligned SVG boxes, correct accessible names; no fake permission status |
| SB-03 | P1 | input + `#searchForm` | Enter and click navigate via native form; empty query does nothing; no double-submit |
| SB-04 | P1 | right-side plus | Independent, clearly non-Google action menu only if the control has real behavior |
| SB-05 | P1 | focus / hover / active | Transition timing sampled from screen recording when feasible; no layout shift |

## [ ] V5.5 — Apps launcher

| ID | Priority | Area | Acceptance |
| --- | --- | --- | --- |
| AP-01 | P1 | `.popover`, `.apps-inner` | radius, shadow, padding, scroll height measured on tablet + desktop |
| AP-02 | P1 | `.apps-grid`, `.app` | consistent tile boxes, label wrapping, icon visual optical sizing |
| AP-03 | P1 | `.product-icon` assets | non-distorted self-hosted SVG with documented source/licenses |
| AP-04 | P1 | interactions | open/close outside, Escape, keyboard focus, correct destination link |

## [ ] V5.6 — Reveal / profile / login demo

- [ ] Keep visual demo identification visible and the `demo@example.test` account fictional; never collect real passwords.
- [ ] Simplify close control to accessible X, escape-to-close, focus restoration.
- [ ] Add **Misalignment Report**: measured differences + image overlay + what remains approximate. Do not fabricate a 100% similarity score.
- [ ] Add distinct labels for *observed local event*, *redirect requested*, and *hypothetical attacker capability*.
- [ ] Limit event log height, add scroll and copy/export/delete with no sensitive data.

## [ ] V5.7 — Regression & presentation

- [ ] Viewports (CSS px): **320×700, 390×844, 768×1024, 932×924, 1194×834, 1440×900**.
- [ ] Browser matrix: Chrome desktop, Safari iPad landscape + portrait, Safari/Chrome phone.
- [ ] Confirm reduced motion, RTL/LTR text, aria labels, click + keyboard, form redirects, launcher navigation, safe-area, no horizontal overflow.
- [ ] Konami, 5× Escape, 5× touch reveal tested but cannot activate during password typing.
- [ ] Rehearse separate-page reveal and iframe limitations. Demo sign-in cannot be mistaken for real Google authentication.
- [ ] Merged only after explicit visual sign-off.

### Reviewer protocol

1. Paste the diagnostic script `tools/visual-metrics.js` into the **notGoogle** DevTools console (only on a page you control). It records rectangles/computed style and prints JSON; it does **not** send data.
2. Add screenshots at the same CSS viewport, DPR and zoom.
3. Complete `PX-01…PX-06`; only then proceed to the separate typography/wordmark and search-fidelity passes.
4. Each run: one commit group → one before/after → functional regression → review → merge/revert decision.

### Scope boundary

Do not use shortened or lookalike Google URLs. A URL shortener may hide the true host and undermine the very safety lesson. Prefer the actual notGoogle URL, a clearly branded QR code or a transparent presentation redirect. Google OAuth login must use Google's official hosted consent flow if ever added.