import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserDetailComponent } from '../../components/user-detail/user-detail.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { Store } from '@ngxs/store';
import { FetchUserAction } from '../../store/userAction';


@Component({
  selector: 'app-dashboard',
  imports: [ MatSidenavModule, SidebarComponent,UserListComponent,UserDetailComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  
})
export class DashboardComponent {
  
  constructor(private _store: Store) {  } 
   ngOnInit(){
    this.getUsers();
   }

  getUsers(){
    this._store.dispatch(new FetchUserAction());
   }

}
