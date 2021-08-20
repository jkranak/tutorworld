export interface IReduxBaseAction {
  payload: any;
  type: EReduxActionTypes;
}

export enum EReduxActionTypes {
  AUTHENTICATE = 'AUTHENTICATE',
  CURRENT_TUTOR_INFO = 'CURRENT_TUTOR_INFO'
}

