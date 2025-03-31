import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { UserDetailComponent } from '../../components/user-detail/user-detail.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { Store } from '@ngxs/store';
import { FetchUserAction } from '../../store/userAction';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [ MatSidenavModule, SidebarComponent,UserListComponent,UserDetailComponent,MatIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  
})
export class DashboardComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isMobile = false;

  constructor(private _store: Store,private breakpointObserver: BreakpointObserver) {  } 
  
   ngOnInit(){
    this.getUsers();
   }

  getUsers(){
    this._store.dispatch(new FetchUserAction());
   }

   ngAfterViewInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(({ matches }) => {
      this.isMobile = matches;
      this.sidenav.mode = matches ? 'over' : 'side';
      matches ? this.sidenav.close() : this.sidenav.open();
    });
  }
  
}
