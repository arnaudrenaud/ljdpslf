import Channels from 'pusher';

const pusherChannelsClient = new Channels({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
});

const sendData = (
  channel: string,
  event: string,
  data: object
): Promise<void> =>
  new Promise((resolve, reject) => {
    pusherChannelsClient.trigger(channel, event, data, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });

export { sendData };
