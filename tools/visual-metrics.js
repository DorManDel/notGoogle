/*
 * notGoogle visual metrics — paste into DevTools on a page you own.
 * Read-only: no network, no storage, no DOM mutation.
 * Returns a JSON string you can compare across devices.
 */
(() => {
  const selectors = [
    '.top', '.top-left', '.top-links', '.logo', '.main',
    '.search-form', '.search-shell', '.search-icon',
    '#keyboard', '#mic', '#lens', '#ai',
    '.actions', '.action', '.langs',
    '.footer', '.country', '.foot-links', '.climate-callout',
    '#appsPanel', '.apps-grid', '#profilePanel'
  ];
  const precision = n => Math.round(n * 100) / 100;
  const elements = {};
  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (!el) { elements[selector] = null; continue; }
    const box = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    elements[selector] = {
      hidden: el.hidden || style.display === 'none',
      x: precision(box.x), y: precision(box.y),
      width: precision(box.width), height: precision(box.height),
      background: style.backgroundColor,
      color: style.color,
      font: style.fontFamily,
      fontSize: style.fontSize,
      borderRadius: style.borderRadius,
      padding: style.padding,
      margin: style.margin,
      gap: style.gap
    };
  }
  const report = {
    source: 'notGoogle visual-metrics — local DevTools snapshot',
    timestamp: new Date().toISOString(),
    browser: navigator.userAgent,
    viewport: {
      width: innerWidth, height: innerHeight,
      outerWidth, outerHeight,
      devicePixelRatio,
      visualScale: window.visualViewport?.scale ?? null
    },
    document: {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollHeight: document.documentElement.scrollHeight,
      dir: document.documentElement.dir,
      colorScheme: getComputedStyle(document.documentElement).colorScheme
    },
    elements
  };
  const json = JSON.stringify(report, null, 2);
  console.log('notGoogle Visual Metrics — locally generated, no upload:\n' + json);
  return json;
})();