import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { userData } from '../../models/userData';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { map, Observable, Subscription, takeUntil } from 'rxjs';
import { DeleteUserAction, FetchUserAction } from '../../store/userAction';
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
  userList:userData[] = [];
  filteredList:userData[] = [];
  searchText: string = '';
  private filterSubscription?: Subscription;
  userList$!: Observable<userData[]>;
 
   ngOnInit(){
    this.getUsersList();
    this.filteredUsersSubscription();
   }

  ngOnDestroy(){
    this.filterSubscription?.unsubscribe();
   }

  getUsersList() {
    this.userList$ = this._store.select(UserState.getUsers); 
    this.userList$.subscribe({
      next: (users: userData[]) => {
        this.filteredList = plainToInstance(userData, users);
        this.userList = plainToInstance(userData,users)
      },
     });
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

  toggleFavorite(user: any) {
    user.isFavorite = !user.isFavorite;
  }

  deleteUser(userInfo: userData,event:Event) {
    event.stopPropagation();
    if (userInfo?.id) {
      this._store.dispatch(new DeleteUserAction(userInfo.id));
    }
  }

  clickOnUser(user: userData) {
    this.userService.setUser(user);
  }

  filterUsers() {
    const search = this.searchText.toLowerCase();
    this.filteredList = this.userList.filter(user =>
      user.firstName?.toLowerCase().includes(search) ||
      user.lastName?.toLowerCase().includes(search)
    );
  }

}
