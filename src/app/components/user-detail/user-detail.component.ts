import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { userData } from '../../models/userData';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-detail',
  imports: [CommonModule,MatDividerModule,MatIconModule,MatListModule,MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  selectedUser?:userData;
  userList:userData[] = [];
  private userDataSubscription?:Subscription; 

  constructor(private userService: UserService) {
   }

 ngOnInit(){
  this.loadDefaultUser();
  this.displaySelectedUserInfo();
 }

 ngOnDestroy(){
  this.userDataSubscription?.unsubscribe();
 }

 displaySelectedUserInfo(){
  this.userDataSubscription = this.userService.selectedUser$.subscribe(userInfo => {
    if (userInfo) {
      this.selectedUser = userInfo;
    } else if (this.userList.length > 0) {
      this.selectedUser = this.userList[0]; 
      this.userService.setUser(this.selectedUser);
    } else {
      this.selectedUser = undefined;
    }
   });
 }

 loadDefaultUser() {
  this.userService.getUserDetails().pipe().subscribe({
    next: (data :userData[]) => {
    this.userList = data;
     },
    error: (err) => {
    }
   })
}
}
