import { Routes } from '@angular/router';
import { Dash } from './components/dash/dash.component';


export const routes: Routes = [
    { path: '', redirectTo: 'dash', pathMatch: 'full' },
    { path: 'dash', component: Dash },
];