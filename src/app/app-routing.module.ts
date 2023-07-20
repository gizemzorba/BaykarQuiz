import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: 'Anasayfa',
    component: MainPageComponent
  },
  {
    path: '**',
    redirectTo: 'Anasayfa'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
