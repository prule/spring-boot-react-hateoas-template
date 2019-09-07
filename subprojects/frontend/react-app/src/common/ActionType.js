// @flow

import AlertMessage from "./AlertMessage"

export default class ActionType {
  type: string;
  resource: Object;
  alert: AlertMessage;

  constructor(type: string) {
    this.type = type;
  }

  static INDEX: string = 'index';
  static ALERT: string = 'alert';

  static handlerMap = {
    'index': (state, action: ActionType) => {
      return {
        ...state,
        index: action.resource
      }
    },

    'alert': (state, action: ActionType) => {
      return {
        ...state,
        alert: action.alert
      }
    }
  };

  static forResource(type: string, resource: Object) {
    const actionType = new ActionType(type);
    actionType.resource = resource;
    return actionType;
  }

  static forAlert(alert: AlertMessage) {
    const actionType = new ActionType(ActionType.ALERT);
    actionType.alert = alert;
    return actionType;
  }

}