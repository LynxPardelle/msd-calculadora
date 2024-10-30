import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';

import { SimulatorComponent } from './pages/simulator/simulator.component';
import { OfferPoolComponent } from './pages/offer-pool/offer-pool.component';
import { TransfersComponent } from './pages/transfers/transfers.component';
import { TopCostumersComponent } from './pages/top-costumers/top-costumers.component';
import { SimulatorTableComponent } from './pages/simulator/components/simulator-table/simulator-table.component';
import { QuotationComponent } from './pages/simulator/components/quotation/quotation.component';
import { TransfersTableComponent } from './pages/transfers/components/transfers-table/transfers-table.component';
import { TransfersQuotationComponent } from './pages/transfers/components/transfers-quotation/transfers-quotation.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { PlanKeytrudaComponent } from './components/plan-keytruda/plan-keytruda/plan-keytruda.component';
import { FaqComponent } from './components/faq/faq/faq.component';
import { NgxBootstrapExpandedFeaturesService } from 'ngx-bootstrap-expanded-features';
import { ExistsDirective } from './directives/exists.directive';
import { LineBreakerSpecializedPipe } from '../shared/pipes/line-breaker-specialized.pipe';

@NgModule({
  declarations: [
    SimulatorComponent,
    OfferPoolComponent,
    TransfersComponent,
    TopCostumersComponent,
    SimulatorTableComponent,
    TransfersTableComponent,
    QuotationComponent,
    TransfersQuotationComponent,
    PlanKeytrudaComponent,
    FaqComponent,
    ExistsDirective,
    LineBreakerSpecializedPipe,
  ],
  imports: [
    CommonModule,
    CalculatorRoutingModule,
    InputMaskModule,
    DecimalPipe,
  ],
  providers: [NgxBootstrapExpandedFeaturesService],
})
export class CalculatorModule {}
