import { Routes } from '@angular/router';
import { MainComponent } from './components/pages/main/main.component';
import { DetailComponent } from './components/pages/detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'detail/:slug',
    component: DetailComponent
  },
];
