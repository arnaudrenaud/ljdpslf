const getSessionIdFromCookies = (): string =>
  Object.fromEntries(document.cookie.split('; ').map((x) => x.split('=')))
    .sessionId;

const trackPageView = (url): void => {
  window['gtag']('config', process.env.googleAnalyticsTrackingId, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    page_location: url,
  });
};

export { getSessionIdFromCookies, trackPageView };
