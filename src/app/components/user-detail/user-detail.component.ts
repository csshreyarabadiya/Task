import { Component } from '@angular/core';
import { UserData } from '../../models/userData';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from '../../store/userState';
import { DeleteUserAction, UpdateUserAction } from '../../store/userAction';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-detail',
  imports: [CommonModule,MatDividerModule,MatIconModule,MatListModule,MatCardModule,ReactiveFormsModule,MatSelectModule,MatFormFieldModule,MatInputModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  selectedUser?:UserData;
  selectUsersubscription?: Subscription;
  isEditMode = false;
  userForm!: FormGroup;
  
  constructor(private _store : Store,private fb: FormBuilder) { }

  ngOnInit(){
     this.getSelctedUser();
     this.createForm();
  }
  ngOnDestroy(){
    this.selectUsersubscription?.unsubscribe();
  }
  getSelctedUser() {
  this.selectUsersubscription = this._store.select(UserState.getSelectedUser).subscribe({
    next: (user: UserData | undefined) => {
      this.selectedUser = user ; 
    }
   });
 }

 deleteCurrentUser(){
  if(this.selectedUser?.id){
     this._store.dispatch(new DeleteUserAction(this.selectedUser.id));
  }
}

toggleEditMode() {
  this.isEditMode = !this.isEditMode;
  if(this.isEditMode){
    this.serFormValues();
  }
}

toggleFavorite(user: UserData) {
  if (!user.id) return;
  const payload = { id: user.id, record: { isFavorite: !user.isFavorite } };
  this._store.dispatch(new UpdateUserAction(payload));
}

  createForm(){
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: [''],
      company: [''],
      notes:[''],
      department:['']
    });
  }

  serFormValues(){
    this.userForm.patchValue({
      firstName:this.selectedUser?.firstName,
      lastName:this.selectedUser?.lastName,
      email : this.selectedUser?.email,
      phone : this.selectedUser?.phone,
      address : this.selectedUser?.address,
      company : this.selectedUser?.company,
      notes : this.selectedUser?.notes,
      department : this.selectedUser?.department

    })
  }
 
  saveUserContact(){
    this.transferFormValuesToModel();
    if (this.selectedUser && this.selectedUser?.id) {
      const payload = {
        id: this.selectedUser.id,
        record: this.selectedUser,
      };
      this._store.dispatch(new UpdateUserAction(payload));
      this.isEditMode = false;
    }
  }

   transferFormValuesToModel() {
    if (!this.selectedUser) {
      this.selectedUser = new UserData(); 
    }

    this.selectedUser.firstName = this.userForm.value.firstName;
    this.selectedUser.lastName = this.userForm.value.lastName;
    this.selectedUser.address = this.userForm.value.address;
    this.selectedUser.company = this.userForm.value.companyName;
    this.selectedUser.email = this.userForm.value.email;
    this.selectedUser.notes = this.userForm.value.notes;
    this.selectedUser.department = this.userForm.value.departmentName;
    this.selectedUser.phone = this.userForm.value.phone;
  }

  onCancel(){
   this.isEditMode = false;
  }
}
