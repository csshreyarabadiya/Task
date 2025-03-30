import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { userData } from '../../models/userData';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user-dialog',
  imports: [FormsModule,MatButtonModule,MatInputModule,MatFormFieldModule,MatOptionModule,MatSelectModule,ReactiveFormsModule],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.css'
})
export class AddUserDialogComponent{
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedImage?: string;
  userDetailForm!: FormGroup;
  userInfo?:userData;
  constructor(private dialogRef: MatDialogRef<AddUserDialogComponent>) {}

  ngOnInit(){
    this.createForm();
  }

  createForm(){
    this.userDetailForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl(''),
      notes: new FormControl(''),
      departmentName: new FormControl('', [Validators.required])
    });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click(); 
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = reader.result as string; 
      };
      reader.readAsDataURL(file);
    }
  }

  
  onAddUser(){
    if (this.userDetailForm.valid) {
      this.transferFormValueToModel();
    }
  }

  transferFormValueToModel(){
    this.userInfo = new userData();
   this.userInfo.firstName = this.userDetailForm.value.firstName;
   this.userInfo.lastName = this.userDetailForm.value.lastName;
   this.userInfo.address = this.userDetailForm.value.address;
   this.userInfo.company = this.userDetailForm.value.companyName;
   this.userInfo.email = this.userDetailForm.value.email;
   this.userInfo.notes = this.userDetailForm.value.notes;
   this.userInfo.department = this.userDetailForm.value.departmentName;
   this.userInfo.phone = this.userDetailForm.value.phoneNumber;
   this.userInfo.photo = this.selectedImage || 'assets/images/user1.jpg'

   this.dialogRef.close(this.userInfo);
   }

  onCancel(){
     this.dialogRef.close();
  }
}
