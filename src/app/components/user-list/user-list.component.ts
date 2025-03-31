import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserData } from '../../models/userData';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { map, Observable, Subscription, takeUntil } from 'rxjs';
import { DeleteUserAction, FetchUserAction, SetSelectedUserAction, UpdateUserAction } from '../../store/userAction';
import { plainToInstance } from 'class-transformer';
import { UserState, UserStateModel } from '../../store/userState';
import { Select, Store } from '@ngxs/store';


@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatListModule,MatIconModule, MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  constructor(private userService: UserService, private _store:Store) { }
  userList:UserData[] = [];
  filteredList:UserData[] = [];
  searchText: string = '';
  private filterSubscription?: Subscription;
  userList$!: Observable<UserData[]>;
  selectedUser$!:Observable<UserData | undefined>
  selectedUser?: UserData;

   ngOnInit(){
    this.getUsersList();
    this.getSelectedUser();
    this.filteredUsersSubscription();
   }

  ngOnDestroy(){
    this.filterSubscription?.unsubscribe();
   }

  getUsersList() {
    this.userList$ = this._store.select(UserState.getUsers); 
    this.userList$.subscribe({
      next: (users: UserData[]) => {
        this.filteredList = plainToInstance(UserData, users).map(user => ({
          ...user,
          $isSelected: this.selectedUser?.id === user.id 
        }));
        this.userList = [...this.filteredList] // backup list 
       },
     });
  }

  getSelectedUser(){
    this.selectedUser$ = this._store.select(UserState.getSelectedUser);
    this._store.select(UserState.getSelectedUser).subscribe(user => {
      this.selectedUser = user; 
      if(this.selectedUser){
        this.updateSelectedUserInFilteredList();
      }
    });
  }

  updateSelectedUserInFilteredList() {
    if (!this.filteredList) return;
    this.filteredList = this.filteredList.map(user => ({
      ...user,
      $isSelected: this.selectedUser?.id === user.id 
    }));
  }

  filteredUsersSubscription(){
    this.filterSubscription = this.userService.filteredUser.subscribe(filter => {
      this.applyFilter(filter);
    });
   }

   applyFilter(department: string) {
    if (department === 'All') {
      this.filteredList = [...this.userList];
    } else if(department=== 'Starred'){
      this.filteredList = this.userList.filter(user => user.isFavorite);
    }else {
      this.filteredList = this.userList.filter(user => user.department === department);
    }
  }

  toggleFavorite(user: UserData,event:Event) {
    event.stopPropagation();
    if (!user.id) return;
    const payload = { id: user.id, record: { isFavorite: !user.isFavorite } };
    this._store.dispatch(new UpdateUserAction(payload));
  }

  deleteUser(userInfo: UserData,event:Event) {
    event.stopPropagation();
    if (userInfo?.id) {
      this._store.dispatch(new DeleteUserAction(userInfo.id));
    }
  }

  clickOnUser(user: UserData) {
    for (let i = 0; i < this.filteredList.length; i++) {
      const element = this.filteredList[i];
      element.$isSelected = false;
    }
     user.$isSelected =true;
    this._store.dispatch(new SetSelectedUserAction(user));
  }

  filterUsers() {
    const search = this.searchText.toLowerCase();
    this.filteredList = this.userList.filter(user =>
      user.firstName?.toLowerCase().includes(search) ||
      user.lastName?.toLowerCase().includes(search)
    );
  }

}
