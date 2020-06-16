// eslint-disable-next-line @typescript-eslint/no-var-requires
const withSourceMaps = require('@zeit/next-source-maps');

module.exports = {
  ...withSourceMaps({
    webpack(config) {
      return config;
    },
  }),
  env: {
    pusherAppKey: process.env.PUSHER_APP_KEY,
    pusherCluster: process.env.PUSHER_CLUSTER,
    sentryDsn: process.env.SENTRY_DSN,
    googleAnalyticsTrackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
  },
};
