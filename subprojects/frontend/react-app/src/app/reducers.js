function index(state, action) {
  switch (action.type) {
    case 'INDEX_LOAD':
      console.log('index_load');
      state.index = {
        message: 'hello'
      };
      return state;
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    index: index(state, action)
  }
}