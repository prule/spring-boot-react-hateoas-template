// @flow

import ActionType from "./common/ActionType";

const reducer = (state: Object, action: ActionType) => {
  console.log('state', state);
  console.log('action', action);
  switch (action.type) {
    case 'changeTitle':
      return {
        ...state,
        title: action.title
      };
    case ActionType.INDEX:
      return {
        ...state,
        index: action.resource
      };
    case ActionType.USER:
      return {
        ...state,
        user: action.resource
      };
    case ActionType.ALERT:
      return {
        ...state,
        alert: action.alert
      };
    case ActionType.NOTIFICATION:
      return {
        ...state,
        notification: action.notification
      };

    default:
      return state;
  }
};

export default reducer;