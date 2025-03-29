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
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatListModule,MatIconModule, MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userList:userData[] = [];
  filteredList:userData[] = [];
  searchText: string = '';
  private filterSubscription?: Subscription;
  private addUserSubscription?:Subscription;
  constructor(private userService: UserService) { }

  ngOnInit(){
    this.getUserList();
    this.filteredUsersSubscription();
    this.addNewUserSubscription();
  }

  ngOnDestroy(){
    this.filterSubscription?.unsubscribe();
    this.addUserSubscription?.unsubscribe();
  }

   getUserList(){
     this.userService.getUserDetails().pipe().subscribe({
      next: (data) => {
         this.userList = data;
         this.filteredList = data;
       },
      error: (err) => {
      }
     })
   }

   filteredUsersSubscription(){
    this.filterSubscription = this.userService.filteredUser.subscribe(filter => {
      this.applyFilter(filter);
    });
   }

   applyFilter(department: string) {
    if (department === 'All') {
      this.filteredList = this.userList;
    } else if(department=== 'Starred'){
      this.filteredList = this.userList.filter(user => user.isFavorite == true);
    }else {
      this.filteredList = this.userList.filter(user => user.department === department);
    }
  }


  addNewUserSubscription(){
    this.addUserSubscription = this.userService.addUser.subscribe(user =>{
      if(user){
        this.filteredList.unshift(user)
      }
   })
  }

  toggleFavorite(user: any) {
    user.isFavorite = !user.isFavorite;
  }

  deleteUser(userInfo:userData){
   this.userList = this.userList?.filter(user => user !== userInfo);
  }

  clickOnUser(user?: userData) {
    this.userService.setUser(user);
  }

  filterUsers() {
    this.filteredList = this.userList.filter(user =>
      user.firstName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
