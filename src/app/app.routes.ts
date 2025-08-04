import { Routes } from '@angular/router';
import { Header } from './components/header/header.component';


export const routes: Routes = [
    { path: '', redirectTo: 'header', pathMatch: 'full' },
    { path: 'header', component: Header },
];