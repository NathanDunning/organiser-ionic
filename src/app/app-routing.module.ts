import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterPageModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canLoad: [LoginGuard] // Protected route
  },
  {
    path: 'calendar',
    loadChildren: './calendar/calendar.module#CalendarPageModule',
    canLoad: [LoginGuard] // Protected route
  },
  {
    path: 'todo',
    loadChildren: './todo/todo.module#TodoPageModule',
    canLoad: [LoginGuard] // Protected route
  },
  {
    path: 'reminders',
    loadChildren: './reminders/reminders.module#RemindersPageModule',
    canLoad: [LoginGuard] // Protected route
  },
  {
    path: 'social',
    loadChildren: './social/social.module#SocialPageModule',
    canLoad: [LoginGuard] // Protected route
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
