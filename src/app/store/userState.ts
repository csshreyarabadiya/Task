import { Injectable } from "@angular/core";
import { UserData } from "../models/userData";
import { UserService } from "../services/user.service";
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { AddUserAction, AddUserActionSuccess, DeleteUserAction, DeleteUserActionSuccess, FetchUserAction, FetchUserActionFailure, FetchUserActionSuccess, SetSelectedUserAction, UpdateUserAction, UpdateUserActionSuccess } from "./userAction";
import { plainToInstance } from 'class-transformer'


export class UserStateModel {
  items: UserData[] = [];
  selectedUser?: UserData;
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
  static getUsers(state: UserStateModel): UserData[] {
    return state.items;
  }

  @Selector()
  static getSelectedUser(state: UserStateModel): UserData | undefined {
    return state.selectedUser ?? undefined;
  }

  @Action(FetchUserAction)
  fetch({ setState, dispatch, patchState }: StateContext<UserStateModel>) {
  this.userService.getUserDetails()
      .subscribe({
        next: (response) => {
          const list = plainToInstance(UserData, response);
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

@Action(SetSelectedUserAction)
setSelectedUser({ patchState }: StateContext<UserStateModel>, { user }: SetSelectedUserAction) {
  patchState({ selectedUser: user ?? undefined });
}


@Action(UpdateUserAction)
editUser({ getState, setState, dispatch }: StateContext<UserStateModel>, { payload }: UpdateUserAction) {
  const state = getState();
  const updatedUser = state.items.find(u => u.id === payload.id);
   if (!updatedUser) return; 
   const newUpdatedUser = { ...updatedUser, ...payload.record };
   const updatedUsers = state.items.map(user => 
    user.id === payload.id ? newUpdatedUser : user
   );
   const newSelectedUser = state.selectedUser?.id === payload.id ? newUpdatedUser : state.selectedUser;
   setState({ items: updatedUsers, selectedUser: newSelectedUser});
   dispatch(new UpdateUserActionSuccess(payload.id, updatedUser, newUpdatedUser));
}






}











