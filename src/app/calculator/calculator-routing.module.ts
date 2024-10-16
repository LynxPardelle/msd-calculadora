import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalLayoutComponent } from '../shared/layouts/principal-layout.component';

import { SimulatorComponent } from './pages/simulator/simulator.component';
import { TransfersComponent } from './pages/transfers/transfers.component';
import { TopCostumersComponent } from './pages/top-costumers/top-costumers.component';
import { PlanKeytrudaComponent } from './components/plan-keytruda/plan-keytruda/plan-keytruda.component';
import { FaqComponent } from './components/faq/faq/faq.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'simulator',
        pathMatch: 'full',
      },
      {
        path: 'simulator',
        component: SimulatorComponent,
      },
      {
        path: 'transfers',
        component: TransfersComponent,
      },
      {
        path: 'top-costumers',
        component: TopCostumersComponent,
      },
    ],
  },
  {
    path: 'keytruda',
    component: PlanKeytrudaComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculatorRoutingModule {}
