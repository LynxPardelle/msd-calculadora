import { Component, inject } from '@angular/core';
import { SimulatorService } from '../../../../services/simulator.service';

@Component({
    selector: 'app-transfers-quotation',
    templateUrl: './transfers-quotation.component.html',
    styleUrl: './transfers-quotation.component.css',
    standalone: false
})
export class TransfersQuotationComponent {
  private _SimulatorService = inject(SimulatorService);

  get computedQuotation() {
    return this._SimulatorService.computedQuotation2();
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
