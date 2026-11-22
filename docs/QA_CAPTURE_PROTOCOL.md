# Screenshot QA protocol · notGoogle

Status: **reference-aware observations**, not an official Google source implementation or a complete pixel-diff. This belongs to the educational notGoogle demo; preserve the `notGoogle · demo` disclosure and synthetic-only local sign-in.

## Repeat this on every visual pass
1. Take **the same viewport CSS width and height**, browser zoom, `devicePixelRatio`, theme, UI language, font availability, and login state on both sides.
2. Capture **the whole viewport**, ensuring no browser chrome appears on just one of the two images.
3. Record `getBoundingClientRect()` of target components and the computed CSS colors.
4. Save both originals before annotating. Mark each observed issue with a unique ID, severity, selector, before/after size or offset, and whether it was actually tested.
5. Compare in this order: geometry → colors → typography → icons → interaction → accessibility.
6. Check 320×700, 390×844, 768×1024, 940×978 (if matching reference), 1194×834, 1440×900. If the Google reference at a viewport is missing, label the result **not compared**, never **pixel-perfect**.
7. Maintain a before/after regression screenshot and a reviewable PR. No merge without approval.

## 2026-11-22 supplied desktop screenshot review (source: user-provided)
| ID | Region | Google supplied screenshot | Earlier local V5.3 preview | Interpretation |
| --- | --- | --- | --- | --- |
| 01 | Background sample | `RGB(34,36,42)` / `#22242A` | `RGB(34,36,42)` / `#22242A` | **Identical sampled pixel**. Don't change by intuition. |
| 02 | Search fill sample | `RGB(54,56,64)` / `#363840` | `RGB(54,56,64)` / `#363840` | **Identical sampled pixel**. |
| 03 | Search bounding box | x≈120, y≈371, w≈688, h≈52 | x≈125, y≈375, w≈690, h≈56 | Slight difference, **approximate raster coordinates** only. Different screenshots dimensions (932×924 vs 940×978). |
| 04 | Wordmark | Google-specific glyph geometry | Arial-style glyphs differ | Not resolved. Do not claim a Google brand mark is recreated. |
| 05 | Search far right | Plus icon in reference | Magnifier in preview | Different affordance; decide independently what the demo should do. |
| 06 | AI control | User screenshot includes gradient glow | Preview has flat chip | Demo gradient effect is isolated under `experiments/ai-hover.html` — not integrated. |
| 07 | Button row | Reference visually shorter | Preview row taller and slightly lower | Needs same-viewport rectangle measurement. |
| 08 | Footer | Divider at y≈829 of 924 image | Divider at y≈882 of 978 image | **Do not mistake 53 px absolute difference for a CSS bug**. Both are ≈95–96 px from screenshot bottom. |
| 09 | Account avatar | Signed-in user's photo | Demo avatar | Intentionally different due to fictional account and safety. |

## Availability by viewport
| Target | Google reference available | notGoogle preview available | Can calculate honest pixel diff? |
| --- | --- | --- | --- |
| Desktop near 940 wide | Yes: supplied 932×924 | Yes: older offline 940×978 | **No** (different heights). Review geometry qualitatively. |
| iPad landscape | Yes: supplied iPad screenshot including Safari UI | Yes: older offline 1194×834 | **No** (different chrome/scale). |
| Phone 390×844 | No same-size Google capture supplied | Yes: older offline 390×844 | **No**, source missing. |
| Desktop 1440×900 | No same-size Google capture supplied | Offline baseline has been exercised | **No**, source missing. |

## Branch integrity
- Draft PR #3: `experiment/v5.3-pixel-pass`, not merged to `main`.
- The experiment branch includes a single 601–1099px search geometry adjustment, a read-only metrics helper, a separate gradient experiment and surgical checklist.
- The PNG review artifact is generated in the conversation; source image screenshots are not committed to GitHub.
- Functional equivalence of real Google services and real account authentication is **not** tested or claimed.

## Pass definition
A visual issue can be marked fixed only after a new capture taken at the **same viewport and browser settings** as its reference, a documented before/after coordinate delta, and no regression in the local fictional-login safety flow, search navigation, keyboard focus, or responsive behavior.
