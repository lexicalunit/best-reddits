import './common/env';
import Server from './common/server';
import routes from './routes';
import loop from './tasks';

loop();

const port = parseInt(process.env.PORT);
export default new Server().router(routes).listen(port);
