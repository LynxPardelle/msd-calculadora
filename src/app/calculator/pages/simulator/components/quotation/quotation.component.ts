import { Component, inject } from '@angular/core';
import { SimulatorService } from '../../../../services/simulator.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.css',
})
export class QuotationComponent {
  private _SimulatorService = inject(SimulatorService);

  get computedQuotation() {
    return this._SimulatorService.computedQuotation();
  }

  get trimestralObjectiveValue() {
    return this._SimulatorService.simulatorObjectiveValue();
  }

  onChangeTrimestralObjetiveValue(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);

    this._SimulatorService.simulatorObjectiveValue.set(value);
  }
}
