import { Component, inject, Input } from '@angular/core';
import { Products } from '../../../../interfaces/simulator';
import { SimulatorService } from '../../../../services/simulator.service';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-simulator-table',
  templateUrl: './simulator-table.component.html',
  styleUrl: './simulator-table.component.css',
})
export class SimulatorTableComponent {
  @Input({ required: true }) productItems: Products[] = [];
  public currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '$ ',
    placeholder: '0',
  });

  private _simulatorService = inject(SimulatorService);

  onItemSuggestedPriceChange(product: Products, event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const suggestedPrice = parseFloat(value);

    this._simulatorService.simulatorItemValues.set(
      this.productItems.map((productItem) => {
        if (productItem.idProduct === product.idProduct)
          return {
            ...productItem,
            suggestedPrice,
            suggestedPriceTotalAmount: suggestedPrice * productItem.unit,
          };

        return productItem;
      })
    );
  }

  onItemUnitChange(product: Products, event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const unit = parseInt(value);

    this._simulatorService.simulatorItemValues.set(
      this.productItems.map((productItem) => {
        if (productItem.idProduct === product.idProduct)
          return {
            ...productItem,
            unit,
            pmpTotalAmount: productItem.pmp * unit,
            suggestedPriceTotalAmount: productItem.suggestedPrice * unit,
          };

        return productItem;
      })
    );
  }

  onlynumber(event: KeyboardEvent): void {
    event.key.match(/[^0-9]*/g) && event.preventDefault();
  }
}
