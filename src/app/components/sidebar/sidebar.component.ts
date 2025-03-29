import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { userData } from '../../models/userData';

@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private userService: UserService,private dialog: MatDialog) {}

  applyFilter(department: string) {
    this.userService.filteredUser.next(department);
  }

  openAdduserDialogBox(){
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      height: '500px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: userData) => {
      if (result) {
        this.userService.addUser.next(result);
      }
    });
  }
}
