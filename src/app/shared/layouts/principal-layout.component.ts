import { Component, inject } from '@angular/core';
import { SimulatorService } from '../../calculator/services/simulator.service';

@Component({
  selector: 'app-principal-layout',
  templateUrl: './principal-layout.component.html',
  styleUrl: './principal-layout.component.css',
})
export class PrincipalLayoutComponent {
  private simulatorService = inject(SimulatorService);
  constructor() {}
  get logoUrl() {
    return this.simulatorService.logoUrl;
  }
}
