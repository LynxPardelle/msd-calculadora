import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ],
  imports: [CommonModule, CalculatorRoutingModule, InputMaskModule],
})
export class CalculatorModule {}
