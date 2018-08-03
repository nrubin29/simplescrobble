import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrobbleComponent } from './views/scrobble/scrobble.component';
import { LoginComponent } from './views/login/login.component';
import { CallbackComponent } from './views/callback/callback.component';
import { SearchComponent } from './views/search/search.component';
import { RequireTokenGuard } from './guards/require-token/require-token.guard';
import { RequireNoTokenGuard } from './guards/require-no-token/require-no-token.guard';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [RequireNoTokenGuard]},
  {path: 'callback', component: CallbackComponent, canActivate: [RequireNoTokenGuard]},
  {path: 'home', component: HomeComponent, canActivate: [RequireTokenGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
