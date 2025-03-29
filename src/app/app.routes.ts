import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';


export const routes: Routes = [
    { 
      path: '', 
      component: DashboardComponent,
      children: [
        { path: '', component: UserListComponent },
        { path: 'user/:id', component: UserDetailComponent },
      ]
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
  ];
