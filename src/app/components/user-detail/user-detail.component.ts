import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { userData } from '../../models/userData';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from '../../store/userState';
import { plainToInstance } from 'class-transformer';
import { DeleteUserAction } from '../../store/userAction';
@Component({
  selector: 'app-user-detail',
  imports: [CommonModule,MatDividerModule,MatIconModule,MatListModule,MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  selectedUser?:userData;
  private subscription?: Subscription;
  
 
  constructor(private _store : Store) { }

  ngOnInit(){
     this.getSelctedUser();
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

 getSelctedUser() {
  this.subscription = this._store.select(UserState.getSelectedUser).subscribe({
    next: (user: userData | undefined) => {
      this.selectedUser = user ; 
    }
  });
   }

deleteCurrentUser(){
  if(this.selectedUser?.id){
     this._store.dispatch(new DeleteUserAction(this.selectedUser.id));
  }
  
}

 
}
