const context = require.context('../pages/',  true, /\model.js$/);
export default context
  .keys()
  .map(key => context(key));