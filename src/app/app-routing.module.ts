import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './calculator/pages/home-page/home-page.component';
import { NotFoundComponent } from './calculator/pages/not-found/not-found.component';
import { OfferPoolComponent } from './calculator/pages/offer-pool/offer-pool.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'calculator',
    loadChildren: () =>
      import('./calculator/calculator.module').then((m) => m.CalculatorModule),
  },
  {
    path: 'offer-pool',
    component: OfferPoolComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
