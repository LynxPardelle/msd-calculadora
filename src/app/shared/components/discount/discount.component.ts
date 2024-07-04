import { Component, inject, effect, OnInit } from '@angular/core';
import { SimulatorService } from '../../../calculator/services/simulator.service';

@Component({
  selector: 'app-discount',
  template: `
    <div class="d-flex flex-row align-items-center gap-3 m-3 customText">
      <span class="text-grayMSD">Descuento</span>
      <div class="input-group">
        <input
          type="text"
          class="form-control customInput text-grayMSD bg-greenMSD"
          [value]="discountValue"
          (keyup)="onDiscountInputChange($event)"
          type="number"
          max="100"
        />
        <span class="input-group-text text-grayMSD">%</span>
      </div>
    </div>
  `,
  styles: `
  .customText { font-size: 1.3rem; font-family:'customGothamBold'; }
  .customInput, .input-group-text{
    border-radius: 1.5rem;
    background-color: rgb(225, 250, 244);
    border: none;
    max-width: 5rem;
    text-align: center;
    font-size: 1.3rem;
  }
  .text-grayMSD{
    color: #3E444C;
  }
  .bg-greenMSD{
    background-color: #EEF6F5;
  }
  `,
})
export class DiscountComponent {
  private _simulatorService = inject(SimulatorService);

  get discountValue() {
    return this._simulatorService.simulatorDiscountValue();
  }

  set discountValue(value) {
    this._simulatorService.simulatorDiscountValue.set(value);
  }

  onDiscountInputChange(event: any) {
    this.discountValue = event.target.value;
  }
}
