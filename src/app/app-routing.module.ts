import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: 'Quiz',
    component: MainPageComponent
  }, {
    path: 'Anasayfa',
    component: LandingPageComponent
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
