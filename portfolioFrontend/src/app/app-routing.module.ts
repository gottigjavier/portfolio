import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/guard-services/auth-guard.service';
import { HomeComponent } from './views/home/home.component';
import { UserComponent } from './views/home/user/user.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardService],
    loadChildren: () => import('./views/home/user/user.module').then(m => m.UserModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
