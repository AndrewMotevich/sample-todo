import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './todo/pages/not-found-page/not-found-page.component';
import { IsLoggedInFunctionGuard, MainPageRedirect } from './auth/guards/login-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./todo/pages/main-page/main-page.module').then((m) => m.MainPageModule),
    canActivate: [MainPageRedirect],
  },
  {
    path: 'about',
    loadChildren: () => import('./todo/pages/about-page/about-page.module').then((m) => m.AboutPageModule),
  },
  {
    path: 'board',
    loadChildren: () => import('./todo/pages/board-page/board-page.module').then((m) => m.BoardPageModule),
    canActivate: [IsLoggedInFunctionGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
