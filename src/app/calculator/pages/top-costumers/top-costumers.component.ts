import { Component, inject, Input, OnInit } from '@angular/core';
import { SimulatorService } from '../../services/simulator.service';

@Component({
    selector: 'app-top-costumers',
    templateUrl: './top-costumers.component.html',
    styleUrl: './top-costumers.component.css',
    standalone: false
})
export class TopCostumersComponent implements OnInit {
  private _simulatorService = inject(SimulatorService);

  @Input() topClientsValues = this._simulatorService.topClientsValues;

  get computedTopClients() {
    return this._simulatorService.computedTopClients();
  }

  onValuesChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    this.topClientsValues.set({
      ...this.topClientsValues(),
      [target.name]: Number(value.toFixed(2)),
    });
  }

  ngOnInit(): void {
    this._simulatorService.enableDiscount = false;
  }
}
