import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnquireComponent } from './enquire/enquire.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/serivces/basic/guard/auth-guard/auth.guard';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'enquire', canActivate: [AuthGuard], component: EnquireComponent },
//   { path: '**', redirectTo: 'login' },
// ];

const routes: Routes = [

  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'enquire',canActivate: [AuthGuard], loadChildren: () => import('./enquire/enquire.module').then(m => m.EnquireModule) },
  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
