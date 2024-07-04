import { Component, inject, OnInit, effect } from '@angular/core';
import { SimulatorService } from '../../services/simulator.service';

@Component({
  selector: 'app-simulator',
  template: `
    <div
      class="d-flex flex-column justify-content-between align-items-stretch align-content-between h-100"
    >
      <app-simulator-table
        [productItems]="products"
        class=""
      ></app-simulator-table>

      <app-quotation></app-quotation>
    </div>
  `,
})
export class SimulatorComponent implements OnInit {
  private _simulatorService = inject(SimulatorService);

  get products() {
    return this._simulatorService.simulatorItemValues();
  }

  ngOnInit(): void {
    this._simulatorService.enableDiscount = true;
  }
}
