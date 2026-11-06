const BASE = 'http://localhost:4322';
const EDGE_DEBUG = 'http://127.0.0.1:9222';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getBrowserWs() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`${EDGE_DEBUG}/json/version`);
      if (response.ok) {
        const json = await response.json();
        return json.webSocketDebuggerUrl;
      }
    } catch {
      // Edge is still starting.
    }
    await sleep(250);
  }
  throw new Error('Could not connect to Edge DevTools');
}

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.events = new Map();
    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const entry = this.pending.get(message.id);
        if (entry) {
          this.pending.delete(message.id);
          if (message.error) entry.reject(new Error(JSON.stringify(message.error)));
          else entry.resolve(message.result);
        }
        return;
      }
      const key = `${message.sessionId ?? ''}:${message.method}`;
      const listeners = this.events.get(key) ?? [];
      for (const listener of listeners) listener(message.params);
    });
  }

  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }

  once(method, sessionId, timeout = 15000) {
    return new Promise((resolve, reject) => {
      const key = `${sessionId ?? ''}:${method}`;
      const listeners = this.events.get(key) ?? [];
      const timer = setTimeout(() => {
        this.events.set(key, listeners.filter((item) => item !== handler));
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeout);
      const handler = (params) => {
        clearTimeout(timer);
        this.events.set(key, listeners.filter((item) => item !== handler));
        resolve(params);
      };
      listeners.push(handler);
      this.events.set(key, listeners);
    });
  }
}

const measureExpression = `(() => {
  const pick = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return {
      rect: { x: Math.round(r.x * 10) / 10, y: Math.round(r.y * 10) / 10, w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10 },
      display: s.display,
      height: s.height,
      width: s.width,
      objectFit: s.objectFit,
    };
  };
  const header = document.querySelector('[data-site-header]');
  const hero = document.querySelector('.header-bar');
  const images = [...document.querySelectorAll('.logo__image')];
  return {
    viewport: { w: innerWidth, h: innerHeight },
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    overflowX: document.documentElement.scrollWidth - innerWidth,
    header: pick(header),
    headerBar: pick(hero),
    logos: images.map((img) => {
      const link = img.closest('.logo');
      return {
        ...pick(img),
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        currentSrc: img.currentSrc.split('/').pop(),
        alt: img.alt,
        loading: img.loading,
        linkName: link?.getAttribute('aria-label') ?? link?.textContent?.trim() ?? null,
        linkHref: link?.getAttribute('href') ?? null,
        linkRect: pick(link),
        descriptor: pick(link?.querySelector('.logo__descriptor')),
        variant: [...(link?.classList ?? [])].filter((c) => c.startsWith('logo--')).join(',') || 'default',
        inMobilePanel: Boolean(img.closest('.mobile-nav')),
      };
    }),
    mobilePanelOpen: (() => {
      const panel = document.querySelector('#mobile-navigation');
      if (!panel) return null;
      return !panel.hasAttribute('inert');
    })(),
    bodyOverflow: getComputedStyle(document.body).overflow,
  };
})()`;

const clickExpression = `(() => {
  const button = document.querySelector('.header-bar__toggle');
  if (!button) return 'toggle-missing';
  button.click();
  return 'clicked';
})()`;

const escapeExpression = `(() => {
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true }));
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true }));
  return 'escaped';
})()`;

const browserWs = await getBrowserWs();
const ws = new WebSocket(browserWs);
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});
const cdp = new Cdp(ws);

const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
await cdp.send('Page.enable', {}, sessionId);
await cdp.send('Runtime.enable', {}, sessionId);

async function navigate(url) {
  const loaded = cdp.once('Page.loadEventFired', sessionId);
  await cdp.send('Page.navigate', { url }, sessionId);
  await loaded;
  await sleep(700);
}

async function evaluate(expression) {
  const result = await cdp.send(
    'Runtime.evaluate',
    { expression, returnByValue: true, awaitPromise: true },
    sessionId,
  );
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text ?? 'Evaluation failed');
  }
  return result.result.value;
}

const results = {};

await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
await navigate(`${BASE}/`);
results.desktopHome = await evaluate(measureExpression);

await navigate(`${BASE}/services/`);
results.desktopServices = await evaluate(measureExpression);

await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }, sessionId);
await navigate(`${BASE}/`);
results.mobileHome = await evaluate(measureExpression);

await evaluate(clickExpression);
await sleep(500);
results.mobileOpen = await evaluate(`(() => {
  const panel = document.querySelector('#mobile-navigation');
  const logo = panel?.querySelector('.logo__image');
  const r = logo?.getBoundingClientRect();
  return {
    inert: panel?.hasAttribute('inert') ?? null,
    expanded: document.querySelector('.header-bar__toggle')?.getAttribute('aria-expanded') ?? null,
    bodyOverflow: getComputedStyle(document.body).overflow,
    logo: r ? { w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10, naturalWidth: logo.naturalWidth, src: logo.currentSrc.split('/').pop(), alt: logo.alt } : null,
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: innerWidth,
  };
})()`);

await evaluate(escapeExpression);
await sleep(500);
results.mobileClosed = await evaluate(`(() => {
  const panel = document.querySelector('#mobile-navigation');
  return {
    inert: panel?.hasAttribute('inert') ?? null,
    expanded: document.querySelector('.header-bar__toggle')?.getAttribute('aria-expanded') ?? null,
    bodyOverflow: getComputedStyle(document.body).overflow,
  };
})()`);

await cdp.send('Emulation.setDeviceMetricsOverride', { width: 320, height: 720, deviceScaleFactor: 2, mobile: true }, sessionId);
await navigate(`${BASE}/`);
results.mobile320 = await evaluate(measureExpression);

await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
await navigate(`${BASE}/contact/`);
results.desktopFooter = await evaluate(`(() => {
  const footerLogo = document.querySelector('.site-footer .logo__image');
  const r = footerLogo?.getBoundingClientRect();
  const cs = footerLogo ? getComputedStyle(footerLogo) : null;
  return {
    footerLogo: r ? { w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10, naturalWidth: footerLogo.naturalWidth, naturalHeight: footerLogo.naturalHeight, loading: footerLogo.loading, src: footerLogo.currentSrc.split('/').pop(), alt: footerLogo.alt } : null,
    display: cs?.display,
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: innerWidth,
  };
})()`);

results.desktopFooterMobile = null;
await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }, sessionId);
await navigate(`${BASE}/contact/`);
results.desktopFooterMobile = await evaluate(`(() => {
  const footerLogo = document.querySelector('.site-footer .logo__image');
  const r = footerLogo?.getBoundingClientRect();
  return {
    footerLogo: r ? { w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10, naturalWidth: footerLogo.naturalWidth, loading: footerLogo.loading } : null,
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: innerWidth,
  };
})()`);

console.log(JSON.stringify(results, null, 2));
await cdp.send('Target.closeTarget', { targetId });
ws.close();
