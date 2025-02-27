import { boot } from 'quasar/wrappers';
import store from 'src/store/index';

export default boot(({ app }) => {
  app.use(store);
});

export { store };
