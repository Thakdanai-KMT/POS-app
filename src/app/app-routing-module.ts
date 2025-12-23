import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/logincomponent/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/Login.Guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // หน้า Login (ไม่มี sidebar)
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },

  // หลัง Login (มี sidebar)
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
    ],
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
