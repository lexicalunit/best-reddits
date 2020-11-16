import L from './common/logger';
import UsersService from './api/services/users.service';
import FavoritesService from './api/services/favorites.service';

async function send_newsletters() {
  const now = new Date();

  const users = await UsersService.all();
  users.forEach(async (user) => {
    if (user.alert === now.getHours()) {
      const favorites = await FavoritesService.byUser(user.id);
      const json = JSON.stringify({
        id: user.id,
        name: user.name,
        favorites: favorites.map((favorite) => {
          return {
            id: favorite.id,
            link: favorite.link,
          };
        }),
      });
      L.info(`email-service: ${json}`);
    }
  });
}

const loop = async function (): Promise<void> {
  L.info('Sending newsletters for the hour...');

  const t0 = performance.now();
  await send_newsletters();
  const t = performance.now();

  // In a real system I'd use something like cron or a NodeJS task
  // scheduling library. I'm not super familer with task scheduling
  // libraries within the NodeJS ecosystem so I'd have to do some more
  // research about what's available out there before picking one.
  // For now though we'll just use this timeout to make sure we
  // re-run send_newsletters() for every hour of the day. We make sure
  // to offset the interval of 1 hour by however long it took to
  // execute the send_newsletters() call.
  setTimeout(loop, 3.6e6 - (t - t0));
};

export default loop;
