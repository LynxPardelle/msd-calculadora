import { Component, inject } from '@angular/core';
import { SimulatorService } from './calculator/services/simulator.service';

@Component({
  selector: 'app-root',
  template: ` @if(!payRelease){
    <div
      class="text-center w-100 z-3 position-fixed top-50"
      style="opacity: 0.5; text-shadow: 0 0 3px #fff; "
    >
      {{ textPayRelease }}
    </div>
    } <router-outlet></router-outlet>`,
})
export class AppComponent {
  private _simulatorService = inject(SimulatorService);

  get payRelease() {
    return this._simulatorService.payRelease;
  }

  get textPayRelease() {
    return this._simulatorService.textPayRelease;
  }
}
