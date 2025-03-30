import { Injectable } from "@angular/core";
import { userData } from "../models/userData";
import { UserService } from "../services/user.service";
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { AddUserAction, AddUserActionSuccess, DeleteUserAction, DeleteUserActionSuccess, FetchUserAction, FetchUserActionFailure, FetchUserActionSuccess } from "./userAction";
import { plainToInstance } from 'class-transformer'


export class UserStateModel {
  items: userData[] = [];
  selectedUser?: userData;
 }

const defaults: UserStateModel = {
  items: [],
 };

@State<UserStateModel>({
  name: 'user',
  defaults
})

@Injectable({ providedIn: 'root' })

export class UserState {
  constructor(private _store: Store, private userService: UserService) { }


  @Selector()
  static getUsers(state: UserStateModel): userData[] {
    return state.items;
  }

  @Selector()
  static getSelectedUser(state: UserStateModel): userData | undefined {
    return state.selectedUser ?? undefined;
  }

  @Action(FetchUserAction)
  fetch({ setState, dispatch, patchState }: StateContext<UserStateModel>) {
  this.userService.getUserDetails()
      .subscribe({
        next: (response) => {
          const list = plainToInstance(userData, response);
          setState({
            items: [...list],
            selectedUser: list.length > 0 ? list[0] : undefined,
            });
          dispatch(new FetchUserActionSuccess());
        },
        error: (error) => {
          setState({ items: [] });
          dispatch(new FetchUserActionFailure(error));
        }
      });
  }

  @Action(AddUserAction)
  add({ getState, setState, dispatch }: StateContext<UserStateModel>, { payload }: AddUserAction) {
    const state = getState();
    payload.id = Date.now().toString();
    const updatedUsers = [payload, ...state.items];
    setState({
      items: updatedUsers,
      selectedUser: payload,
    });
    dispatch(new AddUserActionSuccess(payload.id));
  }


  @Action(DeleteUserAction)
  deleteUser({ getState, setState, dispatch }: StateContext<UserStateModel>, { id }: DeleteUserAction) {
    const state = getState();
    const updatedUsers = state.items.filter(user => user.id !== id);
    let newSelectedUser = state.selectedUser;
    if (state.selectedUser?.id === id) {
      newSelectedUser = updatedUsers.length > 0 ? updatedUsers[0] : undefined;
    }
    setState({
      items: updatedUsers,
      selectedUser: newSelectedUser,
    });
    dispatch(new DeleteUserActionSuccess(id));
  }



}











