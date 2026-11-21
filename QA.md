# Visual & Functional QA — notGoogle V5.1

Reference: iPad screenshots supplied on 2026-11-21 (Google vs notGoogle). This is a manual comparison based on the screenshots, **not** a verified pixel-diff or a cross-browser test.

## Changes in V5.1

| Area | Before | Updated | Verification |
| --- | --- | --- | --- |
| App icons | Emoji and generic symbols | 14 self-hosted color SVG icons for 15 entries; Google used for both Search and Account | Asset files committed; rendering on iPad pending |
| Keyboard icon | Unicode `⌨` | Google Material SVG | Asset committed; Safari rendering pending |
| Background color | `#202124` | `#22242a` (matches sampled screenshot) | CSS updated |
| Search surface | `#303134` | `#363840` | CSS updated |
| iPad landscape vertical spacing | Main content noticeably too low | Reduced top spacing; search bar narrowed in tablet-like viewports | Visual check pending |
| Footer background | Too dark (`#17181b`) | `#22242a` | CSS updated |
| Climate message | Absent | Centered link to Google's original climate blog with leaf | CSS and HTML updated; responsive check pending |

## Known gaps, highest priority first

| Priority | Area | Finding | Next experiment |
| --- | --- | --- | --- |
| P0 | Search layout | Search bar, logo, buttons, and languages still need screenshot overlay alignment | Capture on same iPad, compare bounding boxes and spacing |
| P0 | App launcher | Icon sizes improved; Google uses grouped favorites, different padding, rows and scroll behavior | Open launcher side by side and compare |
| P0 | Mobile | 320px/390px and iPad portrait have not yet been tested interactively | Check text wrap, tap sizes, safe areas, and overlays |
| P1 | Logo wordmark | Current CSS text is Arial rather than the actual Google wordmark geometry | Measure width and letterforms; avoid using a deceptive login identity |
| P1 | Search bar right control | Reference screenshot shows a plus button; replica uses a magnifier | Define real behavior for the control before replacing |
| P1 | AI / Lens / mic | Illustrations and availability vary by browser | Test access and error states, especially Safari |
| P1 | Profile | Generic demo avatar differs from real personal avatar, intentionally | Improve generic demo styling without presenting an authenticated Google session |
| P2 | Footer | Climate callout must not overlap legal links at tablet breakpoints | Test >=1024px and 600–1050px |
| P2 | Browser chrome | Google screenshot includes Safari/browser-specific “Open” banner | Do not reproduce: it is not webpage content |
| P2 | Icon version | Some assets are 2020–2025 style, not Google Workspace's new 2026 icons | Compare against actual app-launcher screenshot |
| P2 | Functional | Voice input support, Lens link, AI Mode, external navigation, and event export need device tests | Manual functional QA |

## Test matrix

| Viewport | Layout | App launcher | Profile | Search redirect | Reveal | Footer |
| --- | --- | --- | --- | --- | --- | --- |
| 320x700 phone | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 390x844 phone | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 768x1024 tablet portrait | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1194x834 tablet landscape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1440x900 desktop | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

## Safety & scope

The site retains the visible `notGoogle · demo` marker. Search navigation uses the official Google search URL. The credential form contains read-only demo values; no real password collection. The security reveal explains which events were stored locally.
