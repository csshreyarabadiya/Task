import { userData } from "../models/userData";


export class FetchUserAction {
    static readonly type = '[User] Fetch all';
    constructor() { }
  }
  export class FetchUserActionSuccess {
    static readonly type = '[User] Fetch User Success';
  }
  export class FetchUserActionFailure {
    static readonly type = '[User] Fetch User Failure';
    constructor(public readonly error: any) { }
  }

export class AddUserAction {
    static readonly type = '[User] Add item';
    constructor(public payload: userData) { }
  }
  export class AddUserActionSuccess {
    static readonly type = '[User] Add User Success';
    constructor(public payload: string) { }
  }
  export class AddUserActionFailure {
    static readonly type = '[User] Add User Failure';
    constructor(public readonly error: any) { }
  }
  export class UpdateUserAction {
    static readonly type = '[User] Update item';
    constructor(public payload: { id: string, record: userData }) { }
  }
  export class UpdateUserActionSuccess {
    static readonly type = '[User] Update User Success';
    constructor(public payload: string, public oldRecord :userData, public newRecord :userData) { }
  }
  export class UpdateUserActionFailure {
    static readonly type = '[User] Update User Failure';
    constructor(public readonly error: any) { }
  }

  export class DeleteUserAction {
    static readonly type = '[User] Delete item';
    constructor(public id: string) { }
  }
  export class DeleteUserActionSuccess {
    static readonly type = '[User] Delete User Success';
    constructor(public payload: string) { }
  }
  export class DeleteUserActionFailure {
    static readonly type = '[User] Delete User Failure';
    constructor(public readonly error: any) { }
  }

  export class SetSelectedUserAction {
    static readonly type = '[User] Set Selected User';
    constructor(public user: userData | null) {}
  }