import { Component, inject, effect, OnInit, Input } from '@angular/core';
import { SimulatorService } from '../../../calculator/services/simulator.service';

@Component({
  selector: 'app-discount',
  template: `
    <div class="d-flex flex-row align-items-center gap-3 m-3">
      @if(enableDiscount) {
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
      } @if (enableInventarioYCaducidades) {
      <a
        href="{{ inventariosCaducidadesUrl }}"
        target="_blank"
        rel="noopener noreferrer"
        type="button"
        class="btn customDiscountBtn text-uppercase"
      >
        Inventarios<br />y caducidades
      </a>
      }
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

.customDiscountBtn {
  background: #56A39F;
  background: -moz-linear-gradient(
    90deg,
    #56A39F 0%,
    #499995 22%,
    #26807A 62%,
    #00635C 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    #56A39F 0%,
    #499995 22%,
    #26807A 62%,
    #00635C 100%
  );
  background: linear-gradient(
    90deg,
    #56A39F 0%,
    #499995 22%,
    #26807A 62%,
    #00635C 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00c2b6",endColorstr="#00827a",GradientType=1);

  border: none;
  border-radius: .5rem;
  color: #fff;
  font-size: 0.8rem; font-family:'customGothamBold';
  padding: .25rem 1rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25), 2px 2px 6px rgba(0, 0, 0, 0.125);
  font-family: "customGothamBook", sans-serif;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
  `,
})
export class DiscountComponent {
  private _simulatorService = inject(SimulatorService);
  get enableDiscount() {
    return this._simulatorService.enableDiscount;
  }
  get enableInventarioYCaducidades() {
    return this._simulatorService.enableInventarioYCaducidades;
  }
  get inventariosCaducidadesUrl() {
    return this._simulatorService.inventariosCaducidadesUrl;
  }

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
