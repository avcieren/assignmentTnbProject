import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

// Dynamically imports all stores from components or pages folders.
// Note: it will fetch each store.js file from components/pages folder recursively.
function importAllStores (requireContext) {
  return requireContext.keys().reduce((stores, storePath) => {
    const storeFullPath = storePath.split('store.js')[0];
    const storeName = requireContext(storePath).NAME;

    if (!storeName || stores[storeName]) {
      console.error(
        `There is an existed store name or
               store name could not be found in:
               ${storeFullPath} and storeName: ${storeName}
       `);

      return stores;
    }

    stores[storeName] = requireContext(storePath).default;

    return stores;
  }, {});
}

const modules = importAllStores(require.context('client', true, /^(.*(?:pages|components)).*\/store.js$/));

/**
 * Registering all stores in the application to the Vuex.
 */
export default new Vuex.Store({
  // store modules
  modules,

  // if strict mode, it should be enabled
  strict: false,

  // plugins used in store
  plugins: [createLogger()]
});
