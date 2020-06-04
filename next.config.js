const withSourceMaps = require('@zeit/next-source-maps');

module.exports = {
  ...withSourceMaps({
    webpack(config, _options) {
      return config;
    },
  }),
  env: {
    pusherAppKey: process.env.PUSHER_APP_KEY,
    pusherCluster: process.env.PUSHER_CLUSTER,
    sentryDsn: process.env.SENTRY_DSN,
  },
};
