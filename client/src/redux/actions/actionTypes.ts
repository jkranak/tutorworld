export interface IReduxBaseAction {
  payload: any;
  type: EReduxActionTypes;
}

export enum EReduxActionTypes {
  AUTHENTICATE = 'AUTHENTICATE'
}

