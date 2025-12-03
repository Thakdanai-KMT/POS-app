import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { Logincomponent } from './pages/logincomponent/logincomponent';
import { LoginGuard } from './guards/Login.Guard';

// import{ProductListComponent} from './';
// const routes: Routes = [];
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Logincomponent,canActivate: [LoginGuard] },

  // ป้องกันหน้าอื่นด้วย AuthGuard
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },

  // ถ้า path ไม่ตรง ให้กลับไป login
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
