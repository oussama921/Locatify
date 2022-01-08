import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponentComponent } from './pages/not-found-component/not-found-component.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';

const routes: Routes = [
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'add-user',
    component:AddUserComponent
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/user/user.module')
      .then(m => m.UserModule)
  },
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
