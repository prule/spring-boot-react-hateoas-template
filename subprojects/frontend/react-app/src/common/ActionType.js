// @flow

import AlertMessage from "./domain/AlertMessage"

export default class ActionType {
  type: string;
  resource: Object;
  alert: AlertMessage;

  constructor(type: string) {
    this.type = type;
  }

  static INDEX: string = 'index';
  static ALERT: string = 'alert';
  static NOTIFICATION: string = 'notification';
  static USER: string = 'user';
  static LOADING: string = 'loading';
  static RELOAD: string = 'reload';

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

  static forNotification(notification: String) {
    const actionType = new ActionType(ActionType.NOTIFICATION);
    actionType.notification = notification;
    return actionType;
  }
}