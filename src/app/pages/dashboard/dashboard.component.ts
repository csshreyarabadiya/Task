import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserDetailComponent } from '../../components/user-detail/user-detail.component';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [ MatSidenavModule, SidebarComponent,UserListComponent,UserDetailComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  
})
export class DashboardComponent {

}
