import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home-only/home.component';
import { LokalizacjeMainComponent } from './lokalizacje/lokalizacje-main/lokalizacje-main.component';
import { MagazynMainComponent } from './magazyn/magazyn-main/magazyn-main.component';
import { MainCompComponent } from './main-comp/main-comp.component';

export const routes: Routes = [
  {
    path: '',
    component: MainCompComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'inwentaryzacja/:data',
        component: LokalizacjeMainComponent,
      },
      { path: 'magazyn', component: MagazynMainComponent },
    ],
  },
];
