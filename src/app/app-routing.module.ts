import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterPageModule'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'todo', loadChildren: './todo/todo.module#TodoPageModule' },
  { path: 'reminders', loadChildren: './reminders/reminders.module#RemindersPageModule' },
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule' },
  { path: 'social', loadChildren: './social/social.module#SocialPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
