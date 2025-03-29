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
  selectedUser?:userData ;
  private userDataSubscription?:Subscription; 

  constructor(private userService: UserService) {
   }

 ngOnInit(){
  this.displaySelectedUserInfo();
 }

 ngOnDestroy(){
  this.userDataSubscription?.unsubscribe();
 }

 displaySelectedUserInfo(){
  this.userDataSubscription = this.userService.selectedUser$.subscribe(userInfo => {
    if(userInfo){
      this.selectedUser = userInfo; 
    }else{
      this.loadDefaultUser();
    }
   });
 }

 loadDefaultUser() {
  this.userService.getUserDetails().pipe().subscribe({
    next: (data) => {
      
     },
    error: (err) => {
    }
   })
}
}
